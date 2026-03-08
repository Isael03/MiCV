import { useState } from 'react'
import { useCVStore } from '../../../store/cvStore'
import { Header } from '../../../shared/layouts/Header'
import { Footer } from '../../../shared/layouts/Footer'
import { ProjectList } from '../components/ProjectList'
import { NewProjectDialog } from '../components/NewProjectDialog'
import { Field, FieldDescription, FieldLabel } from "@/components/ui/field"
import { Input } from "@/components/ui/input"

function Home() {
  const { projects, createProject, deleteProject } = useCVStore()
  const [isDialogOpen, setIsDialogOpen] = useState(false)

  const handleCreateProject = (name: string) => {
    createProject(name)
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      <Header />
      
      <main className="flex-1 max-w-6xl mx-auto px-4 py-8 w-full">
        <Field>
      <FieldLabel htmlFor="input-demo-api-key">API Key</FieldLabel>
      <Input id="input-demo-api-key" type="password" placeholder="sk-..." />
      <FieldDescription>
        Your API key is encrypted and stored securely.
      </FieldDescription>
    </Field>
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Mis Currículums</h1>
            <p className="text-gray-500 mt-1">Gestiona tus proyectos de CV</p>
          </div>
          <button
            onClick={() => setIsDialogOpen(true)}
            className="flex items-center gap-2 px-5 py-2.5 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium shadow-sm"
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
            </svg>
            Nuevo Proyecto
          </button>
        </div>

        <ProjectList projects={projects} onDelete={deleteProject} />
      </main>

      <Footer />

      <NewProjectDialog
        isOpen={isDialogOpen}
        onClose={() => setIsDialogOpen(false)}
        onCreate={handleCreateProject}
      />
    </div>
  )
}

export default Home
