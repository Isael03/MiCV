import { useEffect } from 'react'
import { useCVStore } from '../../../store/cvStore'
import { useSearchParams, Link } from 'react-router-dom'
import { Header } from '../../../shared/layouts/Header'
import { buttonVariants } from '../../../components/ui/button'
import { ArrowLeft, Download, Pencil } from 'lucide-react'
import CVDocument from '../components/CVDocument'
import { usePdfExport } from '../hooks/usePdfExport'
import type { CVProject } from '../../../shared/types/cv'

function Preview() {
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('id')

  const { projects, currentProjectId, setCurrentProject } = useCVStore()

  const currentProject = projects.find((p: CVProject) => p.id === (projectId || currentProjectId))
  const cv = currentProject?.data

  const { cvRef, isExporting, exportToPdf } = usePdfExport()

  useEffect(() => {
    if (projectId) {
      setCurrentProject(projectId)
    }
  }, [projectId, setCurrentProject])

  const handleExportPdf = () => {
    const fileName = currentProject
      ? currentProject.name.replace(/\s+/g, '_').toLowerCase()
      : 'curriculum'
    exportToPdf(fileName)
  }

  if (!currentProject || !cv) {
    return (
      <div className="min-h-screen bg-background">
        <Header />
        <div className="max-w-2xl mx-auto p-8 text-center">
          <h2 className="text-xl font-semibold text-foreground mb-4">Proyecto no encontrado</h2>
          <Link to="/" className="text-primary hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <Header />

      <main className="max-w-5xl mx-auto px-4 py-8">
        {/* ── Toolbar ── */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">
              {currentProject.name}
            </h1>
            <p className="text-muted-foreground text-sm">
              Vista previa de tu currículum
            </p>
          </div>
          <div className="flex gap-3">
            <Link
              to={`/builder?id=${currentProject.id}`}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              <Pencil className="w-4 h-4 mr-2" />
              Editar
            </Link>
            <button
              onClick={handleExportPdf}
              disabled={isExporting}
              className={buttonVariants({ variant: 'default', size: 'sm' })}
            >
              <Download className="w-4 h-4 mr-2" />
              {isExporting ? 'Generando...' : 'Descargar PDF'}
            </button>
          </div>
        </div>

        {/* ── CV Paper ── */}
        <div className="shadow-2xl mx-auto" style={{ width: 'fit-content' }}>
          <CVDocument ref={cvRef} cv={cv} isExporting={isExporting} />
        </div>

        {/* ── Back link ── */}
        <div className="mt-8">
          <Link to="/" className={buttonVariants({ variant: 'ghost' })}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Preview
