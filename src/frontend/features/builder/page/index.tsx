import { useEffect, useState } from 'react'
import { useCVStore } from '../../../store/cvStore'
import { useSearchParams, Link } from 'react-router-dom'
import { Header } from '../../../shared/layouts/Header'
import { buttonVariants } from '../../../components/ui/button'
import { Separator } from '../../../components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Eye, ArrowLeft, Save } from 'lucide-react'
import { useBuilderForms } from '../hooks/useBuilderForms'
import { PersonalInfoForm } from '../components/PersonalInfoForm'
import { SummaryForm } from '../components/SummaryForm'
import { ExperienceForm } from '../components/ExperienceForm'
import { EducationForm } from '../components/EducationForm'
import { ProjectsForm } from '../components/ProjectsForm'
import { SkillsForm } from '../components/SkillsForm'
import { LanguagesForm } from '../components/LanguagesForm'
import { mapCVProjectToBackendProject } from '../../../shared/types/cv'

function Builder() {
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('id')
  const [isSaving, setIsSaving] = useState(false)
  
  const { 
    projects, 
    currentProjectId, 
    setCurrentProject, 
    removeExperience,
    removeEducation,
    removeProject,
    removeSkill,
    removeLanguage,
  } = useCVStore()
  
  const currentProject = projects.find(p => p.id === (projectId || currentProjectId))
  const cv = currentProject?.data

  useEffect(() => {
    if (projectId) {
      setCurrentProject(projectId)
    }
  }, [projectId, setCurrentProject])

  const {
    fileInputRef,
    personalForm,
    summaryForm,
    experienceForm,
    educationForm,
    projectsForm,
    skillsForm,
    languagesForm,
    experienceArray,
    educationArray,
    projectsArray,
    skillsArray,
    languagesArray,
    handlePhotoUpload,
  } = useBuilderForms(cv)

  const handleSave = async () => {
    if (!currentProject) return
    
    setIsSaving(true)
    try {
      const backendProject = mapCVProjectToBackendProject(currentProject)
      await window.cv.update({ project: backendProject })
    } catch (error) {
      console.error('Error al guardar:', error)
    } finally {
      setIsSaving(false)
    }
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
    <div className="min-h-screen bg-background">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground">Editar: {currentProject.name}</h1>
            <p className="text-muted-foreground text-sm mt-1">Completa la información de tu CV</p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={handleSave}
              disabled={isSaving}
              className={buttonVariants({ variant: 'default', size: 'sm' })}
            >
              <Save className="w-4 h-4 mr-2" />
              {isSaving ? 'Guardando...' : 'Guardar'}
            </button>
            <Link
              to={`/preview?id=${currentProject.id}`}
              className={buttonVariants({ variant: 'outline', size: 'sm' })}
            >
              <Eye className="w-4 h-4 mr-2" />
              Ver Preview
            </Link>
          </div>
        </div>

        <Separator className="mb-6" />

        <Tabs defaultValue="personal" className="w-full">
          <TabsList className="grid w-full grid-cols-7">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="summary">Sobre mí</TabsTrigger>
            <TabsTrigger value="experience">Experiencia</TabsTrigger>
            <TabsTrigger value="education">Educación</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="languages">Idiomas</TabsTrigger>
          </TabsList>

          <TabsContent value="personal" className="mt-6">
            <PersonalInfoForm 
              form={personalForm as any} 
              photo={cv.personalInfo.photo} 
              fileInputRef={fileInputRef} 
              onPhotoUpload={handlePhotoUpload} 
            />
          </TabsContent>

          <TabsContent value="summary" className="mt-6">
            <SummaryForm form={summaryForm as any} />
          </TabsContent>

          <TabsContent value="experience" className="mt-6">
            <ExperienceForm 
              form={experienceForm} 
              fieldArray={experienceArray} 
              onRemove={removeExperience} 
            />
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <EducationForm 
              form={educationForm} 
              fieldArray={educationArray} 
              onRemove={removeEducation} 
            />
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <ProjectsForm 
              form={projectsForm} 
              fieldArray={projectsArray} 
              onRemove={removeProject} 
            />
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <SkillsForm 
              form={skillsForm} 
              fieldArray={skillsArray} 
              onRemove={removeSkill} 
            />
          </TabsContent>

          <TabsContent value="languages" className="mt-6">
            <LanguagesForm 
              form={languagesForm} 
              fieldArray={languagesArray} 
              onRemove={removeLanguage} 
            />
          </TabsContent>
        </Tabs>

        <Separator className="my-6" />

        <div className="flex gap-4">
          <Link to="/" className={buttonVariants({ variant: 'ghost' })}>
            <ArrowLeft className="w-4 h-4 mr-2" />
            Volver
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Builder
