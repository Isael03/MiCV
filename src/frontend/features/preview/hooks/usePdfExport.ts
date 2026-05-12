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
      await new Promise(resolve => setTimeout(resolve, 300));

      const el = cvRef.current!
      const originalStyle = el.getAttribute('style') || ''
      
      const measure = document.createElement('div')
      measure.style.width = '100mm'
      measure.style.position = 'absolute'
      measure.style.left = '-9999px'
      document.body.appendChild(measure)
      const pxPer100mm = measure.offsetWidth
      document.body.removeChild(measure)

      const paddingTop = parseFloat(getComputedStyle(el).paddingTop) || 40
      const pxPerMm = pxPer100mm / 100
      const pxPerPage = 297 * pxPerMm
      
      const spacers: HTMLDivElement[] = []
      
      let hasAddedSpacer = true
      let iterations = 0
      const maxIterations = 50 
      
      while (hasAddedSpacer && iterations < maxIterations) {
        iterations++
        hasAddedSpacer = false
        const currentElements = el.querySelectorAll('.section-header, .experience-entry, .education-entry, .project-entry, .certification-entry, .ListItem, .salary-section')
        
        for (let i = 0; i < currentElements.length; i++) {
          const child = currentElements[i] as HTMLElement
          const rect = child.getBoundingClientRect()
          const parentRect = el.getBoundingClientRect()
          
          const relativeTop = rect.top - parentRect.top
          const relativeBottom = rect.bottom - parentRect.top
          
          const pageNumTop = Math.floor((relativeTop + 1) / pxPerPage)
          const pageNumBottom = Math.floor((relativeBottom - 1) / pxPerPage)
          
          // Check if it crosses a boundary OR if it lands in the "top margin zone" of any page > 0
          const topInPage = relativeTop % pxPerPage
          const isInTopMarginZone = pageNumTop > 0 && topInPage < paddingTop
          
          if ((pageNumTop !== pageNumBottom || isInTopMarginZone) && rect.height < (pxPerPage - paddingTop)) {
            // Calculate where it SHOULD start (beginning of next page + padding)
            // or just push it down if it's in the margin zone of the current page
            const targetTop = isInTopMarginZone 
              ? (pageNumTop * pxPerPage) + paddingTop
              : (pageNumBottom * pxPerPage) + paddingTop
              
            const spacerHeight = targetTop - relativeTop
            
            if (spacerHeight > 0 && spacerHeight < pxPerPage) {
              const spacer = document.createElement('div')
              spacer.className = 'pdf-spacer'
              spacer.style.height = `${spacerHeight}px`
              spacer.style.width = '100%'
              spacer.style.pointerEvents = 'none'
              child.parentNode?.insertBefore(spacer, child)
              spacers.push(spacer)
              hasAddedSpacer = true
              break; 
            }
          }
        }
      }

      // Temporarily remove oklch CSS custom properties
      const root = document.documentElement
      const rootStyle = root.style.cssText
      const computedVars = getComputedStyle(root)
      for (let i = 0; i < computedVars.length; i++) {
        const prop = computedVars[i]
        if (prop.startsWith('--') && computedVars.getPropertyValue(prop).includes('oklch')) {
          root.style.setProperty(prop, 'transparent')
        }
      }

      // Capture the canvas
      const canvas = await html2canvas(el, {
        scale: 2,
        useCORS: true,
        backgroundColor: '#ffffff',
        logging: false,
        height: el.scrollHeight,
        windowHeight: el.scrollHeight,
      })

      // Clean up
      spacers.forEach(s => s.remove())
      root.style.cssText = rootStyle
      el.setAttribute('style', originalStyle)

      const imgData = canvas.toDataURL('image/jpeg', 0.8)
      const pdfWidth = 210
      const pdfHeight = 297

      const pdf = new jsPDF({
        orientation: 'portrait',
        unit: 'mm',
        format: 'a4',
        compress: true,
      })

      const imgWidth = pdfWidth
      const imgHeight = (canvas.height * pdfWidth) / canvas.width
      let heightLeft = imgHeight
      let position = 0

      pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
      heightLeft -= pdfHeight

      while (heightLeft > 0) {
        position -= pdfHeight
        pdf.addPage()
        pdf.addImage(imgData, 'JPEG', 0, position, imgWidth, imgHeight, undefined, 'FAST')
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
