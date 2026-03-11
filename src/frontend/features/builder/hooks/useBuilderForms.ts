import { useEffect, useRef, useCallback } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCVStore } from '../../../store/cvStore'
import type { CVData } from '../../../shared/types/cv'

export const personalInfoSchema = z.object({
  fullName: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido').or(z.literal('')),
  phone: z.string().optional(),
  photo: z.string().optional(),
  linkedin: z.string().url('URL inválida').or(z.literal('')).optional(),
  github: z.string().url('URL inválida').or(z.literal('')).optional(),
  portfolio: z.string().url('URL inválida').or(z.literal('')).optional(),
  professionalTitle: z.string().optional(),
})

export const summarySchema = z.object({
  summary: z.string().optional(),
})

export const experienceSchema = z.object({
  experiences: z.array(z.object({
    id: z.string(),
    company: z.string().min(1, 'La empresa es requerida'),
    position: z.string().min(1, 'El cargo es requerido'),
    startDate: z.string().optional(),
    endDate: z.string().optional(),
    description: z.string().optional(),
  })).default([]),
})

export const educationSchema = z.object({
  education: z.array(z.object({
    id: z.string(),
    school: z.string().min(1, 'El centro educativo es requerido'),
    degree: z.string().min(1, 'La titulación es requerida'),
    year: z.string().optional(),
  })).default([]),
})

export const projectsSchema = z.object({
  projects: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'El nombre del proyecto es requerido'),
    description: z.string().optional(),
    link: z.string().optional(),
  })).default([]),
})

export const skillsSchema = z.object({
  skills: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'La habilidad es requerida'),
    type: z.enum(['Blanda', 'Técnica']),
  })).default([]),
})

export const languagesSchema = z.object({
  languages: z.array(z.object({
    id: z.string(),
    name: z.string().min(1, 'El idioma es requerido'),
    level: z.enum(['basic', 'intermediate', 'advanced', 'native']),
  })).default([]),
})

export function useBuilderForms(cvData: CVData | undefined) {
  const store = useCVStore()
  
  const fileInputRef = useRef<HTMLInputElement>(null)
  const isInitializedRef = useRef(false)

  const personalForm = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: cvData?.personalInfo || { 
      fullName: '', 
      email: '', 
      phone: '', 
      photo: '',
      linkedin: '',
      github: '',
      portfolio: '',
      professionalTitle: '',
    },
  })

  const summaryForm = useForm({
    resolver: zodResolver(summarySchema),
    defaultValues: { summary: cvData?.summary || '' },
  })

  const experienceForm = useForm({
    resolver: zodResolver(experienceSchema),
    defaultValues: { experiences: cvData?.experience || [] },
  })

  const educationForm = useForm({
    resolver: zodResolver(educationSchema),
    defaultValues: { education: cvData?.education || [] },
  })

  const projectsForm = useForm({
    resolver: zodResolver(projectsSchema),
    defaultValues: { projects: cvData?.projects || [] },
  })

  const skillsForm = useForm({
    resolver: zodResolver(skillsSchema),
    defaultValues: { skills: cvData?.skills || [] },
  })

  const languagesForm = useForm({
    resolver: zodResolver(languagesSchema),
    defaultValues: { languages: cvData?.languages || [] },
  })

  const experienceArray = useFieldArray({
    control: experienceForm.control,
    name: 'experiences',
  })

  const educationArray = useFieldArray({
    control: educationForm.control,
    name: 'education',
  })

  const projectsArray = useFieldArray({
    control: projectsForm.control,
    name: 'projects',
  })

  const skillsArray = useFieldArray({
    control: skillsForm.control,
    name: 'skills',
  })

  const languagesArray = useFieldArray({
    control: languagesForm.control,
    name: 'languages',
  })

  useEffect(() => {
    if (cvData && !isInitializedRef.current) {
      personalForm.reset(cvData.personalInfo)
      summaryForm.reset({ summary: cvData.summary })
      experienceForm.reset({ experiences: cvData.experience })
      educationForm.reset({ education: cvData.education })
      projectsForm.reset({ projects: cvData.projects })
      skillsForm.reset({ skills: cvData.skills })
      languagesForm.reset({ languages: cvData.languages })
      isInitializedRef.current = true
    }
  }, [cvData])

  useEffect(() => {
    const subscription = personalForm.watch((data) => {
      if (isInitializedRef.current) {
        const d = data as { 
          fullName?: string; 
          email?: string; 
          phone?: string; 
          photo?: string;
          linkedin?: string;
          github?: string;
          portfolio?: string;
          professionalTitle?: string;
        }
        store.updatePersonalInfo({
          fullName: d.fullName || '',
          email: d.email || '',
          phone: d.phone || '',
          photo: d.photo || '',
          linkedin: d.linkedin || '',
          github: d.github || '',
          portfolio: d.portfolio || '',
          professionalTitle: d.professionalTitle || '',
        })
      }
    })
    return () => { subscription.unsubscribe() }
  }, [personalForm.watch])

  useEffect(() => {
    const subscription = summaryForm.watch((data) => {
      if (isInitializedRef.current) {
        const d = data as { summary?: string }
        store.updateSummary(d.summary || '')
      }
    })
    return () => subscription.unsubscribe()
  }, [summaryForm.watch])

  useEffect(() => {
    const subscription = experienceForm.watch((data) => {
      if (isInitializedRef.current && data.experiences) {
        data.experiences.forEach((exp) => {
          const expData = exp as { id: string; company?: string; position?: string; startDate?: string; endDate?: string; description?: string }
          store.updateExperience(expData.id, {
            company: expData.company ?? '',
            position: expData.position ?? '',
            startDate: expData.startDate ?? '',
            endDate: expData.endDate ?? '',
            description: expData.description ?? '',
          })
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [experienceForm.watch])

  useEffect(() => {
    const subscription = educationForm.watch((data) => {
      if (isInitializedRef.current && data.education) {
        data.education.forEach((edu) => {
          const eduData = edu as { id: string; school?: string; degree?: string; year?: string }
          store.updateEducation(eduData.id, {
            school: eduData.school ?? '',
            degree: eduData.degree ?? '',
            year: eduData.year ?? '',
          })
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [educationForm.watch])

  useEffect(() => {
    const subscription = projectsForm.watch((data) => {
      if (isInitializedRef.current && data.projects) {
        data.projects.forEach((proj) => {
          const projData = proj as { id: string; name?: string; description?: string; link?: string }
          store.updateProjectItem(projData.id, {
            name: projData.name ?? '',
            description: projData.description ?? '',
            link: projData.link,
          })
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [projectsForm.watch])

  useEffect(() => {
    const subscription = skillsForm.watch((data) => {
      if (isInitializedRef.current && data.skills) {
        data.skills.forEach((skill) => {
          const skillData = skill as { id: string; name?: string; type?: 'Blanda' | 'Técnica' }
          store.updateSkill(skillData.id, {
            name: skillData.name ?? '',
            type: skillData.type ?? 'Técnica',
          })
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [skillsForm.watch])

  useEffect(() => {
    const subscription = languagesForm.watch((data) => {
      if (isInitializedRef.current && data.languages) {
        data.languages.forEach((lang) => {
          const langData = lang as { id: string; name?: string; level: 'basic' | 'intermediate' | 'advanced' | 'native' }
          store.updateLanguage(langData.id, {
            name: langData.name ?? '',
            level: langData.level,
          })
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [languagesForm.watch])

  const handlePhotoUpload = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        store.updatePersonalInfo({ photo: reader.result as string })
        personalForm.setValue('photo', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }, [store, personalForm])

  return {
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
  }
}
