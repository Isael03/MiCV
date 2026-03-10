// src/types/curriculum.ts
export interface CurriculumProject {
  id: string;
  name: string;           // "Mi CV para Google"
  createdAt: string;
  updatedAt: string;

  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    location: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    photo?: string;
    professionalTitle?: string;
  };

  summary?: string;

  experience: {
    id: string;
    company: string;
    role: string;
    startDate: string;
    endDate?: string;
    current: boolean;
    description: string;
  }[];

  education: {
    id: string;
    institution: string;
    degree: string;
    field?: string;
    startDate: string;
    endDate?: string;
  }[];

  skills: {
    id: string;
    name: string;
    type?: 'Blandas' | 'Tecnicas';
    level?: 'básico' | 'intermedio' | 'avanzado';
  }[];

  languages: {
    id: string;
    name: string;
    level: 'básico' | 'intermedio' | 'avanzado';
  }[];

  certifications?: {
    id: string;
    name: string;
    issuer: string;
    date: string;
    url?: string;
  }[];

  projects?: {
    id: string;
    name: string;
    description: string;
    url?: string;
    technologies?: string[];
  }[];
}
