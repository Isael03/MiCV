import { useEffect } from 'react'
import { Controller } from 'react-hook-form'
import { useCVStore } from '../../../store/cvStore'
import { useSearchParams, Link } from 'react-router-dom'
import { Header } from '../../../shared/layouts/Header'
import { Input } from '../../../components/ui/input'
import { Label } from '../../../components/ui/label'
import { Button, buttonVariants } from '../../../components/ui/button'
import { Textarea } from '../../../components/ui/textarea'
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '../../../components/ui/select'
import { Card, CardContent } from '../../../components/ui/card'
import { Separator } from '../../../components/ui/separator'
import { Tabs, TabsContent, TabsList, TabsTrigger } from '../../../components/ui/tabs'
import { Plus, Trash2, Upload, Eye, ArrowLeft } from 'lucide-react'
import { useBuilderForms } from '../hooks/useBuilderForms'
import { 
  createEmptyExperience,
  createEmptyEducation,
  createEmptyProjectItem,
  createEmptySkill,
  createEmptyLanguage
} from '../../../shared/types/cv'

function Builder() {
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('id')
  
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
          <Link
            to={`/preview?id=${currentProject.id}`}
            className={buttonVariants({ variant: 'default', size: 'sm' })}
          >
            <Eye className="w-4 h-4 mr-2" />
            Ver Preview
          </Link>
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
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Información Personal</h3>
                </div>
                <div className="flex items-center gap-6 mb-6">
                  <div 
                    className="w-24 h-24 rounded-full bg-muted flex items-center justify-center overflow-hidden cursor-pointer border-2 border-dashed border-muted-foreground"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    {cv.personalInfo.photo ? (
                      <img src={cv.personalInfo.photo} alt="Foto" className="w-full h-full object-cover" />
                    ) : (
                      <Upload className="w-8 h-8 text-muted-foreground" />
                    )}
                  </div>
                  <input
                    ref={fileInputRef}
                    type="file"
                    accept="image/*"
                    onChange={handlePhotoUpload}
                    className="hidden"
                  />
                  <div>
                    <Label className="text-sm text-muted-foreground">Foto de perfil</Label>
                    <p className="text-xs text-muted-foreground mt-1">Haz clic para subir una imagen</p>
                  </div>
                </div>
                <div className="grid gap-4">
                  <div className="grid gap-2">
                    <Label htmlFor="name">Nombre completo</Label>
                    <Input
                      id="name"
                      {...personalForm.register('name')}
                      placeholder="Juan Pérez"
                    />
                    {personalForm.formState.errors.name && (
                      <p className="text-sm text-destructive">{personalForm.formState.errors.name.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      {...personalForm.register('email')}
                      placeholder="juan@email.com"
                    />
                    {personalForm.formState.errors.email && (
                      <p className="text-sm text-destructive">{personalForm.formState.errors.email.message}</p>
                    )}
                  </div>
                  <div className="grid gap-2">
                    <Label htmlFor="phone">Teléfono</Label>
                    <Input
                      id="phone"
                      type="tel"
                      {...personalForm.register('phone')}
                      placeholder="+34 612 345 678"
                    />
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="summary" className="mt-6">
            <Card>
              <CardContent className="pt-6 space-y-4">
                <div>
                  <h3 className="text-lg font-semibold text-foreground mb-4">Sobre mí</h3>
                </div>
                <div className="grid gap-2">
                  <Label htmlFor="summary">Resumen profesional</Label>
                  <Textarea
                    id="summary"
                    {...summaryForm.register('summary')}
                    placeholder="Breve descripción de tu perfil profesional, habilidades y objetivos..."
                    className="min-h-[150px]"
                  />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="experience" className="mt-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-foreground">Experiencia laboral</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      const newExp = createEmptyExperience()
                      experienceArray.append(newExp)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Añadir
                  </Button>
                </div>
                {experienceArray.fields.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No hay experiencia agregada. Haz clic en "Añadir" para comenzar.</p>
                ) : (
                  <div className="space-y-4">
                    {experienceArray.fields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <Label>Empresa</Label>
                            <Input
                              {...experienceForm.register(`experiences.${index}.company`)}
                              placeholder="Nombre de la empresa"
                            />
                            {experienceForm.formState.errors.experiences?.[index]?.company && (
                              <p className="text-sm text-destructive">{experienceForm.formState.errors.experiences[index]?.company?.message}</p>
                            )}
                          </div>
                          <div className="grid gap-2">
                            <Label>Cargo</Label>
                            <Input
                              {...experienceForm.register(`experiences.${index}.position`)}
                              placeholder="Tu puesto"
                            />
                            {experienceForm.formState.errors.experiences?.[index]?.position && (
                              <p className="text-sm text-destructive">{experienceForm.formState.errors.experiences[index]?.position?.message}</p>
                            )}
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="grid gap-2">
                            <Label>Fecha inicio</Label>
                            <Input
                              {...experienceForm.register(`experiences.${index}.startDate`)}
                              placeholder="Enero 2020"
                            />
                          </div>
                          <div className="grid gap-2">
                            <Label>Fecha fin</Label>
                            <Input
                              {...experienceForm.register(`experiences.${index}.endDate`)}
                              placeholder="Actual"
                            />
                          </div>
                        </div>
                        <div className="grid gap-2">
                          <Label>Descripción</Label>
                          <Textarea
                            {...experienceForm.register(`experiences.${index}.description`)}
                            placeholder="Describe tus responsabilidades y logros..."
                            className="min-h-[80px]"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              experienceArray.remove(index)
                              removeExperience(field.id)
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="education" className="mt-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-foreground">Educación</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      const newEdu = createEmptyEducation()
                      educationArray.append(newEdu)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Añadir
                  </Button>
                </div>
                {educationArray.fields.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No hay educación agregada. Haz clic en "Añadir" para comenzar.</p>
                ) : (
                  <div className="space-y-4">
                    {educationArray.fields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg space-y-4">
                        <div className="grid gap-2">
                          <Label>Centro educativo</Label>
                          <Input
                            {...educationForm.register(`education.${index}.school`)}
                            placeholder="Nombre del centro"
                          />
                          {educationForm.formState.errors.education?.[index]?.school && (
                            <p className="text-sm text-destructive">{educationForm.formState.errors.education[index]?.school?.message}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label>Titulación</Label>
                          <Input
                            {...educationForm.register(`education.${index}.degree`)}
                            placeholder="Título obtenido"
                          />
                          {educationForm.formState.errors.education?.[index]?.degree && (
                            <p className="text-sm text-destructive">{educationForm.formState.errors.education[index]?.degree?.message}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label>Año</Label>
                          <Input
                            {...educationForm.register(`education.${index}.year`)}
                            placeholder="2020"
                          />
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              educationArray.remove(index)
                              removeEducation(field.id)
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="projects" className="mt-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-foreground">Proyectos</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      const newProj = createEmptyProjectItem()
                      projectsArray.append(newProj)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Añadir
                  </Button>
                </div>
                {projectsArray.fields.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No hay proyectos agregados. Haz clic en "Añadir" para comenzar.</p>
                ) : (
                  <div className="space-y-4">
                    {projectsArray.fields.map((field, index) => (
                      <div key={field.id} className="p-4 border rounded-lg space-y-4">
                        <div className="grid gap-2">
                          <Label>Nombre del proyecto</Label>
                          <Input
                            {...projectsForm.register(`projects.${index}.name`)}
                            placeholder="Nombre del proyecto"
                          />
                          {projectsForm.formState.errors.projects?.[index]?.name && (
                            <p className="text-sm text-destructive">{projectsForm.formState.errors.projects[index]?.name?.message}</p>
                          )}
                        </div>
                        <div className="grid gap-2">
                          <Label>Descripción</Label>
                          <Textarea
                            {...projectsForm.register(`projects.${index}.description`)}
                            placeholder="Describe el proyecto..."
                            className="min-h-[80px]"
                          />
                        </div>
                        <div className="grid gap-2">
                          <Label>Enlace (opcional)</Label>
                          <Input
                            {...projectsForm.register(`projects.${index}.link`)}
                            placeholder="https://..."
                          />
                          {projectsForm.formState.errors.projects?.[index]?.link && (
                            <p className="text-sm text-destructive">{projectsForm.formState.errors.projects[index]?.link?.message}</p>
                          )}
                        </div>
                        <div className="flex justify-end gap-2">
                          <Button 
                            type="button"
                            variant="ghost" 
                            size="sm" 
                            className="text-destructive hover:text-destructive"
                            onClick={() => {
                              projectsArray.remove(index)
                              removeProject(field.id)
                            }}
                          >
                            <Trash2 className="w-4 h-4 mr-1" />
                            Eliminar
                          </Button>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="skills" className="mt-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-foreground">Habilidades</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      const newSkill = createEmptySkill()
                      skillsArray.append(newSkill)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Añadir
                  </Button>
                </div>
                {skillsArray.fields.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No hay habilidades agregadas. Haz clic en "Añadir" para comenzar.</p>
                ) : (
                  <div className="space-y-3">
                    {skillsArray.fields.map((field, index) => (
                      <div key={field.id} className="flex gap-3">
                        <div className="flex-1 grid gap-2">
                          <Label className="sr-only">Habilidad</Label>
                          <Input
                            {...skillsForm.register(`skills.${index}.name`)}
                            placeholder="Habilidad"
                          />
                          {skillsForm.formState.errors.skills?.[index]?.name && (
                            <p className="text-sm text-destructive">{skillsForm.formState.errors.skills[index]?.name?.message}</p>
                          )}
                        </div>
                        <div className="w-40">
                          <Controller
                            name={`skills.${index}.level`}
                            control={skillsForm.control}
                            render={({ field: { onChange, value } }) => (
                              <Select value={value || 'intermediate'} onValueChange={onChange}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Nivel" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="basic">Básico</SelectItem>
                                  <SelectItem value="intermediate">Intermedio</SelectItem>
                                  <SelectItem value="advanced">Avanzado</SelectItem>
                                  <SelectItem value="native">Nativo</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive shrink-0"
                          onClick={() => {
                            skillsArray.remove(index)
                            removeSkill(field.id)
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="languages" className="mt-6">
            <Card>
              <CardContent className="pt-6 space-y-6">
                <div className="flex justify-between items-center">
                  <h3 className="text-lg font-semibold text-foreground">Idiomas</h3>
                  <Button 
                    variant="outline" 
                    size="sm" 
                    onClick={() => {
                      const newLang = createEmptyLanguage()
                      languagesArray.append(newLang)
                    }}
                  >
                    <Plus className="w-4 h-4 mr-1" />
                    Añadir
                  </Button>
                </div>
                {languagesArray.fields.length === 0 ? (
                  <p className="text-muted-foreground text-sm">No hay idiomas agregados. Haz clic en "Añadir" para comenzar.</p>
                ) : (
                  <div className="space-y-3">
                    {languagesArray.fields.map((field, index) => (
                      <div key={field.id} className="flex gap-3">
                        <div className="flex-1 grid gap-2">
                          <Label className="sr-only">Idioma</Label>
                          <Input
                            {...languagesForm.register(`languages.${index}.name`)}
                            placeholder="Idioma"
                          />
                          {languagesForm.formState.errors.languages?.[index]?.name && (
                            <p className="text-sm text-destructive">{languagesForm.formState.errors.languages[index]?.name?.message}</p>
                          )}
                        </div>
                        <div className="w-40">
                          <Controller
                            name={`languages.${index}.level`}
                            control={languagesForm.control}
                            render={({ field: { onChange, value } }) => (
                              <Select value={value} onValueChange={onChange}>
                                <SelectTrigger>
                                  <SelectValue placeholder="Nivel" />
                                </SelectTrigger>
                                <SelectContent>
                                  <SelectItem value="basic">Básico</SelectItem>
                                  <SelectItem value="intermediate">Intermedio</SelectItem>
                                  <SelectItem value="advanced">Avanzado</SelectItem>
                                  <SelectItem value="native">Nativo</SelectItem>
                                </SelectContent>
                              </Select>
                            )}
                          />
                        </div>
                        <Button 
                          type="button"
                          variant="ghost" 
                          size="icon" 
                          className="text-destructive hover:text-destructive shrink-0"
                          onClick={() => {
                            languagesArray.remove(index)
                            removeLanguage(field.id)
                          }}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
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
