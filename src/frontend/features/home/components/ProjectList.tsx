import { CVProject } from '../../../shared/types/cv'
import { ProjectCard } from './ProjectCard'

interface ProjectListProps {
  projects: CVProject[]
  onDelete: (project: CVProject) => void
  onDuplicate: (id: string) => void
}

export function ProjectList({ projects, onDelete, onDuplicate }: ProjectListProps) {
  if (projects.length === 0) {
    return (
      <div className="text-center py-16">
        <div className="bg-gray-100 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-4">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
        </div>
        <h3 className="text-lg font-medium text-gray-700 mb-2">No hay proyectos</h3>
        <p className="text-gray-500">Crea tu primer CV haciendo clic en el botón de arriba</p>
      </div>
    )
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {projects.map((project) => (
        <ProjectCard key={project.id} project={project} onDelete={onDelete} onDuplicate={onDuplicate} />
      ))}
    </div>
  )
}
