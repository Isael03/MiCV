import { useEffect, useState } from 'react'
import { useCVStore } from '../../../store/cvStore'
import { useSearchParams, Link } from 'react-router-dom'
import { Header } from '../../../shared/layouts/Header'

type TabId = 'personal' | 'summary' | 'experience' | 'education' | 'projects' | 'skills' | 'languages'

function Builder() {
  const [searchParams] = useSearchParams()
  const projectId = searchParams.get('id')
  const [activeTab, setActiveTab] = useState<TabId>('personal')
  
  const { 
    projects, 
    currentProjectId, 
    setCurrentProject, 
    updatePersonalInfo,
    updateSummary,
    addExperience,
    addEducation,
    addProject,
    addSkill,
    addLanguage
  } = useCVStore()
  
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

  const tabs: { id: TabId; label: string }[] = [
    { id: 'personal', label: 'Información Personal' },
    { id: 'summary', label: 'Sobre mí' },
    { id: 'experience', label: 'Experiencia' },
    { id: 'education', label: 'Educación' },
    { id: 'projects', label: 'Proyectos' },
    { id: 'skills', label: 'Habilidades' },
    { id: 'languages', label: 'Idiomas' },
  ]

  const renderTabContent = () => {
    switch (activeTab) {
      case 'personal':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Información Personal</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Nombre completo</label>
              <input
                type="text"
                value={cv.personalInfo.name}
                onChange={(e) => updatePersonalInfo({ name: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Juan Pérez"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Email</label>
              <input
                type="email"
                value={cv.personalInfo.email}
                onChange={(e) => updatePersonalInfo({ email: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="juan@email.com"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Teléfono</label>
              <input
                type="tel"
                value={cv.personalInfo.phone}
                onChange={(e) => updatePersonalInfo({ phone: e.target.value })}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="+34 612 345 678"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Foto</label>
              <input
                type="file"
                accept="image/*"
                className="w-full px-3 py-2 border border-gray-300 rounded-lg"
              />
            </div>
          </div>
        )

      case 'summary':
        return (
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-gray-800">Sobre mí</h3>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Resumen profesional</label>
              <textarea
                value={cv.summary}
                onChange={(e) => updateSummary(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent min-h-[150px] resize-y"
                placeholder="Breve descripción de tu perfil profesional, habilidades y objetivos..."
              />
            </div>
          </div>
        )

      case 'experience':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Experiencia laboral</h3>
              <button
                onClick={addExperience}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                + Añadir
              </button>
            </div>
            {cv.experience.length === 0 ? (
              <p className="text-gray-500 text-sm">No hay experiencia agregada</p>
            ) : (
              <div className="space-y-4">
                {cv.experience.map((exp) => (
                  <div key={exp.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <input
                      type="text"
                      placeholder="Empresa"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Cargo"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="text"
                        placeholder="Fecha inicio"
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                      />
                      <input
                        type="text"
                        placeholder="Fecha fin"
                        className="px-3 py-2 border border-gray-300 rounded-lg"
                      />
                    </div>
                    <textarea
                      placeholder="Descripción"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg min-h-[80px]"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'education':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Educación</h3>
              <button
                onClick={addEducation}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                + Añadir
              </button>
            </div>
            {cv.education.length === 0 ? (
              <p className="text-gray-500 text-sm">No hay educación agregada</p>
            ) : (
              <div className="space-y-4">
                {cv.education.map((edu) => (
                  <div key={edu.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <input
                      type="text"
                      placeholder="Centro educativo"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Titulación"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <input
                      type="text"
                      placeholder="Año"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'projects':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Proyectos</h3>
              <button
                onClick={addProject}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                + Añadir
              </button>
            </div>
            {cv.projects.length === 0 ? (
              <p className="text-gray-500 text-sm">No hay proyectos agregados</p>
            ) : (
              <div className="space-y-4">
                {cv.projects.map((proj) => (
                  <div key={proj.id} className="p-4 border border-gray-200 rounded-lg space-y-3">
                    <input
                      type="text"
                      placeholder="Nombre del proyecto"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <textarea
                      placeholder="Descripción"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg min-h-[80px]"
                    />
                    <input
                      type="text"
                      placeholder="Enlace (opcional)"
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg"
                    />
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'skills':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Habilidades</h3>
              <button
                onClick={addSkill}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                + Añadir
              </button>
            </div>
            {cv.skills.length === 0 ? (
              <p className="text-gray-500 text-sm">No hay habilidades agregadas</p>
            ) : (
              <div className="space-y-2">
                {cv.skills.map((skill) => (
                  <div key={skill.id} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Habilidad"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <select className="px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="basic">Básico</option>
                      <option value="intermediate">Intermedio</option>
                      <option value="advanced">Avanzado</option>
                      <option value="native">Nativo</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
        )

      case 'languages':
        return (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-semibold text-gray-800">Idiomas</h3>
              <button
                onClick={addLanguage}
                className="px-3 py-1 text-sm border border-gray-300 rounded-lg hover:bg-gray-50"
              >
                + Añadir
              </button>
            </div>
            {cv.languages.length === 0 ? (
              <p className="text-gray-500 text-sm">No hay idiomas agregados</p>
            ) : (
              <div className="space-y-2">
                {cv.languages.map((lang) => (
                  <div key={lang.id} className="flex gap-2">
                    <input
                      type="text"
                      placeholder="Idioma"
                      className="flex-1 px-3 py-2 border border-gray-300 rounded-lg"
                    />
                    <select className="px-3 py-2 border border-gray-300 rounded-lg">
                      <option value="basic">Básico</option>
                      <option value="intermediate">Intermedio</option>
                      <option value="advanced">Avanzado</option>
                      <option value="native">Nativo</option>
                    </select>
                  </div>
                ))}
              </div>
            )}
          </div>
        )
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      <main className="max-w-4xl mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-gray-800">Editar: {currentProject.name}</h1>
            <p className="text-gray-500 text-sm mt-1">Completa la información de tu CV</p>
          </div>
          <Link
            to={`/preview?id=${currentProject.id}`}
            className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition-colors text-sm font-medium"
          >
            Ver Preview
          </Link>
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 mb-6 overflow-x-auto">
          <nav className="flex gap-1 min-w-max">
            {tabs.map((tab) => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id)}
                className={`px-4 py-3 text-sm font-medium transition-colors border-b-2 whitespace-nowrap ${
                  activeTab === tab.id
                    ? 'text-blue-600 border-blue-600'
                    : 'text-gray-600 border-transparent hover:text-gray-800 hover:border-gray-300'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </nav>
        </div>

        {/* Content */}
        <div className="bg-white rounded-xl shadow-sm p-6">
          {renderTabContent()}
        </div>

        {/* Actions */}
        <div className="mt-6 flex gap-4">
          <Link to="/" className="px-4 py-2 text-gray-600 hover:text-gray-800 transition-colors">
            ← Volver
          </Link>
        </div>
      </main>
    </div>
  )
}

export default Builder
