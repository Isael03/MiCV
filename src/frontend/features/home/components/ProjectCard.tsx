import { CVProject } from '../../../shared/types/cv'
import { Link } from 'react-router-dom'

interface ProjectCardProps {
  project: CVProject
  onDelete: (id: string) => void
}

export function ProjectCard({ project, onDelete }: ProjectCardProps) {
  const formattedDate = new Date(project.createdAt).toLocaleDateString('es-ES', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  })

  return (
    <div className="bg-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 p-4 border border-gray-200">
      <div className="flex items-start justify-between mb-2">
        <h3 className="font-bold text-base text-gray-800 truncate flex-1">{project.name}</h3>
        <button
          onClick={() => onDelete(project.id)}
          className="text-red-500 hover:text-red-700 transition-colors p-1"
          title="Eliminar"
        >
          <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
      
      <div className="text-xs text-gray-500 mb-3">
        <p>Creado: {formattedDate}</p>
      </div>

      <div className="flex gap-2">
        <Link
          to={`/builder?id=${project.id}`}
          className="flex-1 px-3 py-1.5 bg-blue-500 text-white text-center rounded hover:bg-blue-600 transition-colors text-xs font-medium"
        >
          Editar
        </Link>
        <Link
          to={`/preview?id=${project.id}`}
          className="flex-1 px-3 py-1.5 bg-green-500 text-white text-center rounded hover:bg-green-600 transition-colors text-xs font-medium"
        >
          PDF
        </Link>
      </div>
    </div>
  )
}
