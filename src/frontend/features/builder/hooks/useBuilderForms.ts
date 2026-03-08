import { useEffect, useRef } from 'react'
import { useForm, useFieldArray } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { useCVStore } from '../../../store/cvStore'
import type { CVData } from '../../../shared/types/cv'

export const personalInfoSchema = z.object({
  name: z.string().min(1, 'El nombre es requerido'),
  email: z.string().email('Email inválido').or(z.literal('')),
  phone: z.string().optional(),
  photo: z.string().optional(),
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
    level: z.enum(['basic', 'intermediate', 'advanced', 'native']).optional(),
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
  const { 
    updatePersonalInfo,
    updateSummary,
    updateExperience,
    updateEducation,
    updateProjectItem,
    updateSkill,
    updateLanguage,
  } = useCVStore()

  const fileInputRef = useRef<HTMLInputElement>(null)

  const personalForm = useForm({
    resolver: zodResolver(personalInfoSchema),
    defaultValues: cvData?.personalInfo || { name: '', email: '', phone: '', photo: '' },
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
    if (cvData) {
      personalForm.reset(cvData.personalInfo)
      summaryForm.reset({ summary: cvData.summary })
      experienceForm.reset({ experiences: cvData.experience })
      educationForm.reset({ education: cvData.education })
      projectsForm.reset({ projects: cvData.projects })
      skillsForm.reset({ skills: cvData.skills })
      languagesForm.reset({ languages: cvData.languages })
    }
  }, [cvData])

  useEffect(() => {
    const subscription = personalForm.watch((data) => {
      const d = data as { name?: string; email?: string; phone?: string; photo?: string }
      updatePersonalInfo({
        name: d.name || '',
        email: d.email || '',
        phone: d.phone || '',
        photo: d.photo || '',
      })
    })
    return () => { subscription.unsubscribe() }
  }, [personalForm.watch, updatePersonalInfo])

  useEffect(() => {
    const subscription = summaryForm.watch((data) => {
      const d = data as { summary?: string }
      updateSummary(d.summary || '')
    })
    return () => subscription.unsubscribe()
  }, [summaryForm.watch, updateSummary])

  useEffect(() => {
    const subscription = experienceForm.watch((data) => {
      if (data.experiences) {
        data.experiences.forEach((exp) => {
          const expData = exp as { id: string; company?: string; position?: string; startDate?: string; endDate?: string; description?: string }
          updateExperience(expData.id, {
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
  }, [experienceForm.watch, updateExperience])

  useEffect(() => {
    const subscription = educationForm.watch((data) => {
      if (data.education) {
        data.education.forEach((edu) => {
          const eduData = edu as { id: string; school?: string; degree?: string; year?: string }
          updateEducation(eduData.id, {
            school: eduData.school ?? '',
            degree: eduData.degree ?? '',
            year: eduData.year ?? '',
          })
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [educationForm.watch, updateEducation])

  useEffect(() => {
    const subscription = projectsForm.watch((data) => {
      if (data.projects) {
        data.projects.forEach((proj) => {
          const projData = proj as { id: string; name?: string; description?: string; link?: string }
          updateProjectItem(projData.id, {
            name: projData.name ?? '',
            description: projData.description ?? '',
            link: projData.link,
          })
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [projectsForm.watch, updateProjectItem])

  useEffect(() => {
    const subscription = skillsForm.watch((data) => {
      if (data.skills) {
        data.skills.forEach((skill) => {
          const skillData = skill as { id: string; name?: string; level?: 'basic' | 'intermediate' | 'advanced' | 'native' }
          updateSkill(skillData.id, {
            name: skillData.name ?? '',
            level: skillData.level,
          })
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [skillsForm.watch, updateSkill])

  useEffect(() => {
    const subscription = languagesForm.watch((data) => {
      if (data.languages) {
        data.languages.forEach((lang) => {
          const langData = lang as { id: string; name?: string; level: 'basic' | 'intermediate' | 'advanced' | 'native' }
          updateLanguage(langData.id, {
            name: langData.name ?? '',
            level: langData.level,
          })
        })
      }
    })
    return () => subscription.unsubscribe()
  }, [languagesForm.watch, updateLanguage])

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        updatePersonalInfo({ photo: reader.result as string })
        personalForm.setValue('photo', reader.result as string)
      }
      reader.readAsDataURL(file)
    }
  }

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
