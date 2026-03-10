export interface Experience {
  id: string
  company: string
  position: string
  startDate: string
  endDate: string
  description: string
}

export interface Education {
  id: string
  institution: string
  startDate: string
  endDate: string
  degree?: string
  // Legacy properties for backwards compatibility
  school?: string
  year?: string
}

export interface Project {
  id: string
  name: string
  description: string
  url?: string
  technologies?: string[]
  // Legacy property for backwards compatibility
  link?: string
}

export interface Skill {
  id: string
  name: string
  // Backend property for hard/soft skill type
  type?: 'hard' | 'soft'
  // Frontend property for skill level (used in forms)
  level?: 'basic' | 'intermediate' | 'advanced' | 'native' | 'soft' | 'hard'
}

export interface Language {
  id: string
  name: string
  level: 'basic' | 'intermediate' | 'advanced' | 'native'
}

export interface PersonalInformation {
  id: string
  name: string
  lastName: string
  email: string
  phone: string
  address: string
  photo?: string
  linkedin?: string
  github?: string
  website?: string
  professionalTitle?: string
}

export interface CurriculumVitae {
  id: string
  title: string
  createdAt: string
  updatedAt: string
  personalInformation?: PersonalInformation
  workExperiences?: Experience[]
  educations?: Education[]
  languages?: Language[]
  projects?: Project[]
  skills?: Skill[]
}

export interface CVData {
  personalInfo: {
    name: string
    email: string
    phone: string
    photo?: string
  }
  summary: string
  experience: Experience[]
  education: Education[]
  projects: Project[]
  skills: Skill[]
  languages: Language[]
}

export interface CVProject {
  id: string
  name: string
  createdAt: string
  updatedAt: string
  data: CVData
  fontFamily: string
}

// IPC Response types
export interface IPCSuccessResponse<T> {
  success: true
  data: T
}

export interface IPCErrorResponse {
  success: false
  error: string
}

export interface IPCSuccessMessage {
  success: true
  message: string
}

export type IPCResponse<T> = IPCSuccessResponse<T> | IPCErrorResponse
export type IPCMessageResponse = IPCSuccessMessage | IPCErrorResponse

export const createEmptyCV = (): CVData => ({
  personalInfo: {
    name: '',
    email: '',
    phone: ''
  },
  summary: '',
  experience: [],
  education: [],
  projects: [],
  skills: [],
  languages: []
})

export const createEmptyProject = (name: string): CVProject => ({
  id: crypto.randomUUID(),
  name,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  data: createEmptyCV(),
  fontFamily: 'Arial'
})

export const createEmptyExperience = (): Experience => ({
  id: crypto.randomUUID(),
  company: '',
  position: '',
  startDate: '',
  endDate: '',
  description: ''
})

export const createEmptyEducation = (): Education => ({
  id: crypto.randomUUID(),
  institution: '',
  startDate: '',
  endDate: '',
  degree: '',
  school: '',
  year: ''
})

export const createEmptyProjectItem = (): Project => ({
  id: crypto.randomUUID(),
  name: '',
  description: '',
  url: '',
  link: '',
  technologies: []
})

export const createEmptySkill = (): Skill => ({
  id: crypto.randomUUID(),
  name: '',
  level: 'intermediate'
})

export const createEmptyLanguage = (): Language => ({
  id: crypto.randomUUID(),
  name: '',
  level: 'intermediate'
})

export const createEmptyPersonalInformation = (): PersonalInformation => ({
  id: crypto.randomUUID(),
  name: '',
  lastName: '',
  email: '',
  phone: '',
  address: ''
})

export const createEmptyCurriculumVitae = (title: string): CurriculumVitae => ({
  id: crypto.randomUUID(),
  title,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  personalInformation: createEmptyPersonalInformation(),
  workExperiences: [],
  educations: [],
  languages: [],
  projects: [],
  skills: []
})
