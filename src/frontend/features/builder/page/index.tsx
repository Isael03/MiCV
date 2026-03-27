import { useEffect, useState } from 'react'
import { useCVStore } from '../../../store/cvStore'
import { useSearchParams, Link } from 'react-router-dom'
import { Header } from '../../../shared/layouts/Header'
import { buttonVariants } from '../../../components/ui/button'
import { Separator } from '../../../components/ui/separator'
import { Input } from '../../../components/ui/input'
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
import { CertificatesForm } from '../components/CertificatesForm'
import { DesignForm } from '../components/DesignForm'
import { DEFAULT_SECTION_ORDER, mapCVProjectToBackendProject } from '../../../shared/types/cv'

function Builder() {
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('id')
  const [isSaving, setIsSaving] = useState(false)
  const [projectTitle, setProjectTitle] = useState('')
  
  const {
    projects,
    currentProjectId,
    setCurrentProject,
    removeExperience,
    removeEducation,
    removeProject,
    removeSkill,
    removeLanguage,
    removeCertification,
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
    certificationsForm,
    experienceArray,
    educationArray,
    projectsArray,
    skillsArray,
    languagesArray,
    certificationsArray,
    handlePhotoUpload,
  } = useBuilderForms(cv)

  useEffect(() => {
    if (currentProject) {
      setProjectTitle(currentProject.name)
    }
  }, [currentProject])

  const handleSave = async () => {
    if (!currentProject) return
    
    setIsSaving(true)
    try {
      const personalInfo = personalForm.getValues()
      const formData = {
        personalInfo: {
          fullName: personalInfo.fullName || '',
          email: personalInfo.email || '',
          phone: personalInfo.phone || '',
          address: personalInfo.address || '',
          photo: personalInfo.photo,
          linkedin: personalInfo.linkedin,
          github: personalInfo.github,
          portfolio: personalInfo.portfolio,
          professionalTitle: personalInfo.professionalTitle,
        },
        summary: summaryForm.getValues().summary || '',
        experience: (experienceForm.getValues().experiences || []).map(exp => ({
          id: exp.id,
          company: exp.company || '',
          position: exp.position || '',
          startDate: exp.startDate || '',
          endDate: exp.endDate || '',
          description: exp.description || '',
        })),
        education: (educationForm.getValues().education || []).map(edu => ({
          id: edu.id,
          institution: edu.institution || '',
          degree: edu.degree || '',
          startDate: edu.startDate || '',
          endDate: edu.endDate || '',
        })),
        projects: (projectsForm.getValues().projects || []).map(proj => ({
          id: proj.id,
          name: proj.name || '',
          description: proj.description || '',
          url: proj.url,
        })),
        skills: (skillsForm.getValues().skills || []).map(skill => ({
          id: skill.id,
          name: skill.name || '',
          type: skill.type || 'Técnica',
        })),
        languages: (languagesForm.getValues().languages || []).map(lang => ({
          id: lang.id,
          name: lang.name || '',
          level: lang.level || 'basic',
        })),
        certifications: (certificationsForm.getValues().certifications || []).map(cert => ({
          id: cert.id,
          name: cert.name || '',
          date: cert.date || '',
          issuer: cert.issuer || '',
          url: cert.url || '',
        })),
        sectionOrder: currentProject.data.sectionOrder || DEFAULT_SECTION_ORDER,
        hiddenSections: currentProject.data.hiddenSections || [],
        design: currentProject.data.design,
      }
      
      const updatedProject = {
        ...currentProject,
        name: projectTitle || currentProject.name,
        data: formData,
        updatedAt: new Date().toISOString(),
      }
      
      const backendProject = mapCVProjectToBackendProject(updatedProject)
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
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between mb-6">
          <div className="flex-1">
            <Input
              value={projectTitle}
              onChange={(e) => setProjectTitle(e.target.value)}
              className="text-2xl font-bold h-auto py-1 px-0 border-0 border-b border-transparent hover:border-gray-300 focus:border-gray-400 focus:ring-0 bg-transparent"
              placeholder="Nombre del proyecto"
            />
            <p className="text-muted-foreground text-sm mt-1">Completa la información de tu CV</p>
          </div>
          <div className="flex flex-wrap gap-2">
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
          <TabsList className="!h-auto w-full flex flex-wrap items-start gap-2 justify-start py-2 [&_[data-slot=tabs-trigger]]:flex-none">
            <TabsTrigger value="personal">Personal</TabsTrigger>
            <TabsTrigger value="summary">Sobre mí</TabsTrigger>
            <TabsTrigger value="experience">Experiencia</TabsTrigger>
            <TabsTrigger value="education">Educación</TabsTrigger>
            <TabsTrigger value="projects">Proyectos</TabsTrigger>
            <TabsTrigger value="skills">Habilidades</TabsTrigger>
            <TabsTrigger value="languages">Idiomas</TabsTrigger>
            <TabsTrigger value="certificates">Certificados</TabsTrigger>
            <TabsTrigger value="design">Diseño</TabsTrigger>
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

          <TabsContent value="certificates" className="mt-6">
            <CertificatesForm
              form={certificationsForm}
              fieldArray={certificationsArray}
              onRemove={removeCertification}
            />
          </TabsContent>

          <TabsContent value="design" className="mt-6">
            <DesignForm />
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
