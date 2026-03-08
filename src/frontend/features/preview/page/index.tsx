import { useEffect } from 'react'
import { useCVStore } from '../../../store/cvStore'
import { useSearchParams, Link } from 'react-router-dom'
import { Header } from '../../../shared/layouts/Header'

function Preview() {
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('id')
  
  const { projects, currentProjectId, setCurrentProject } = useCVStore()
  
  const currentProject = projects.find(p => p.id === (projectId || currentProjectId))
  const cv = currentProject?.data

  useEffect(() => {
    if (projectId) {
      setCurrentProject(projectId)
    }
  }, [projectId, setCurrentProject])

  if (!currentProject || !cv) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="max-w-2xl mx-auto p-8 text-center">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Proyecto no encontrado</h2>
          <Link to="/" className="text-blue-500 hover:underline">
            Volver al inicio
          </Link>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-2xl font-bold text-gray-800">Preview: {currentProject.name}</h1>
          <div className="flex gap-3">
            <Link
              to={`/builder?id=${currentProject.id}`}
              className="px-4 py-2 bg-gray-500 text-white rounded-lg hover:bg-gray-600 transition-colors text-sm font-medium"
            >
              Editar
            </Link>
            <button className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
              Descargar PDF
            </button>
          </div>
        </div>

        <div className="bg-white shadow-lg p-8 min-h-[800px]">
          <div className="border-b pb-4 mb-4">
            <h2 className="text-3xl font-bold text-gray-800">{cv.personalInfo.name || 'Nombre'}</h2>
            <div className="text-gray-600 mt-2 space-y-1">
              {cv.personalInfo.email && <p>{cv.personalInfo.email}</p>}
              {cv.personalInfo.phone && <p>{cv.personalInfo.phone}</p>}
            </div>
          </div>

          {cv.personalInfo.summary && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Resumen</h3>
              <p className="text-gray-600">{cv.personalInfo.summary}</p>
            </div>
          )}

          {cv.experience.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Experiencia</h3>
              {cv.experience.map((exp) => (
                <div key={exp.id} className="mb-3">
                  <p className="font-medium text-gray-800">{exp.position}</p>
                  <p className="text-gray-600">{exp.company}</p>
                  <p className="text-sm text-gray-500">{exp.startDate} - {exp.endDate}</p>
                  <p className="text-gray-600 mt-1">{exp.description}</p>
                </div>
              ))}
            </div>
          )}

          {cv.education.length > 0 && (
            <div className="mb-6">
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Educación</h3>
              {cv.education.map((edu) => (
                <div key={edu.id} className="mb-3">
                  <p className="font-medium text-gray-800">{edu.degree}</p>
                  <p className="text-gray-600">{edu.school}</p>
                  <p className="text-sm text-gray-500">{edu.year}</p>
                </div>
              ))}
            </div>
          )}

          {cv.skills.length > 0 && (
            <div>
              <h3 className="text-lg font-semibold text-gray-700 mb-2">Habilidades</h3>
              <div className="flex flex-wrap gap-2">
                {cv.skills.map((skill, index) => (
                  <span key={index} className="px-3 py-1 bg-gray-100 text-gray-700 rounded-full text-sm">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6">
          <Link to="/" className="text-gray-600 hover:text-gray-800 transition-colors">
            ← Volver al inicio
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Preview
