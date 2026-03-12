import { useRef, useState } from 'react'
import html2canvas from 'html2canvas'
import jsPDF from 'jspdf'

export function usePdfExport() {
  const cvRef = useRef<HTMLDivElement>(null)
  const [isExporting, setIsExporting] = useState(false)

  const exportToPdf = async (fileName: string = 'curriculum') => {
    if (!cvRef.current) return

    setIsExporting(true)
    try {
      // Give React time to re-render with isExporting = true
      // so the icons get their extra padding before we capture the canvas.
      await new Promise(resolve => setTimeout(resolve, 100));

      // html2canvas doesn't support oklch() colors (used by Tailwind v4).
      // We temporarily remove oklch CSS custom properties from the element
      // and force a white background to avoid parsing errors.
      const el = cvRef.current
      const savedStyles = el.getAttribute('style') || ''
      el.style.backgroundColor = '#ffffff'

      // Remove oklch properties from :root so html2canvas doesn't choke
      const root = document.documentElement
      const rootStyle = root.style.cssText
      const computedVars = getComputedStyle(root)
      const propsToClean: string[] = []
      for (let i = 0; i < computedVars.length; i++) {
        const prop = computedVars[i]
        if (prop.startsWith('--')) {
          const val = computedVars.getPropertyValue(prop)
          if (val.includes('oklch')) {
            propsToClean.push(prop)
            root.style.setProperty(prop, 'transparent')
          }
        }
      }

      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
      })

      // Restore original styles
      root.style.cssText = rootStyle
      el.setAttribute('style', savedStyles)

      const imgData = canvas.toDataURL('image/png')

      // A4 dimensions in mm
      const pdfWidth = 210
      const pdfHeight = 297

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
      })

      // Calculate how many pages we need
      const imgWidth = pdfWidth
      const imgHeight = (canvas.height * pdfWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      // First page
      pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
      heightLeft -= pdfHeight

      // Additional pages if content overflows
      while (heightLeft > 0) {
        position -= pdfHeight
        pdf.addPage()
        pdf.addImage(imgData, 'PNG', 0, position, imgWidth, imgHeight)
        heightLeft -= pdfHeight
      }

      pdf.save(`${fileName}.pdf`)
    } catch (error) {
      console.error('Error exporting PDF:', error)
    } finally {
      setIsExporting(false)
    }
  }

  return { cvRef, isExporting, exportToPdf }
}
