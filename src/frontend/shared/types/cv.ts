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
  school: string
  degree: string
  year: string
}

export interface Project {
  id: string
  name: string
  description: string
  link?: string
}

export interface Skill {
  id: string
  name: string
  level?: 'basic' | 'intermediate' | 'advanced' | 'native'
}

export interface Language {
  id: string
  name: string
  level: 'basic' | 'intermediate' | 'advanced' | 'native'
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
  school: '',
  degree: '',
  year: ''
})

export const createEmptyProjectItem = (): Project => ({
  id: crypto.randomUUID(),
  name: '',
  description: '',
  link: ''
})

export const createEmptySkill = (): Skill => ({
  id: crypto.randomUUID(),
  name: ''
})

export const createEmptyLanguage = (): Language => ({
  id: crypto.randomUUID(),
  name: '',
  level: 'intermediate'
})
