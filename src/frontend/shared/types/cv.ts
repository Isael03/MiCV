export interface Experience {
  id: string;
  company: string;
  position: string;
  startDate: string;
  endDate: string;
  description: string;
}

export interface Education {
  id: string;
  institution: string;
  startDate: string;
  endDate: string;
  degree?: string;
  // Legacy properties for backwards compatibility
  school?: string;
  year?: string;
}

export interface Project {
  id: string;
  name: string;
  description: string;
  url?: string;
  technologies?: string[];
  // Legacy property for backwards compatibility
  link?: string;
}

export interface Skill {
  id: string;
  name: string;
  type: "Blanda" | "Técnica";
}

export interface Language {
  id: string;
  name: string;
  level: "basic" | "intermediate" | "advanced" | "native";
}

export interface PersonalInformation {
  id: string;
  name: string;
  lastName: string;
  email: string;
  phone: string;
  address: string;
  photo?: string;
  linkedin?: string;
  github?: string;
  website?: string;
  professionalTitle?: string;
}

export interface CurriculumVitae {
  id: string;
  title: string;
  createdAt: string;
  updatedAt: string;
  personalInformation?: PersonalInformation;
  workExperiences?: Experience[];
  educations?: Education[];
  languages?: Language[];
  projects?: Project[];
  skills?: Skill[];
}

export interface DesignSettings {
  fontFamily: string;
}

export interface CVData {
  personalInfo: {
    fullName: string;
    email: string;
    phone: string;
    address?: string;
    photo?: string;
    linkedin?: string;
    github?: string;
    portfolio?: string;
    professionalTitle?: string;
  };
  summary: string;
  experience: Experience[];
  education: Education[];
  projects: Project[];
  skills: Skill[];
  languages: Language[];
  certifications?: Certification[];
  design: DesignSettings;
}

export interface Certification {
  id: string;
  name: string;
  date: string;
  issuer?: string;
  url?: string;
}

export interface CVProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  data: CVData;
}

interface BackendPersonalInfo {
  fullName: string;
  email: string;
  phone: string;
  location: string;
  linkedin?: string;
  github?: string;
  portfolio?: string;
  photo?: string;
  professionalTitle?: string;
}

interface BackendExperience {
  id: string;
  company: string;
  role: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description: string;
}

interface BackendEducation {
  id: string;
  institution: string;
  degree: string;
  field?: string;
  startDate: string;
  endDate?: string;
}

interface BackendSkill {
  id: string;
  name: string;
  type?: "Blanda" | "Técnica";
  level?: "básico" | "intermedio" | "avanzado";
}

interface BackendLanguage {
  id: string;
  name: string;
  level: "básico" | "intermedio" | "avanzado";
}

interface BackendCertification {
  id: string;
  name: string;
  date: string;
  issuer?: string;
  url?: string;
}

interface BackendProjectItem {
  id: string;
  name: string;
  description: string;
  url?: string;
  technologies?: string[];
}

export interface BackendProject {
  id: string;
  name: string;
  createdAt: string;
  updatedAt: string;
  personalInfo: BackendPersonalInfo;
  summary?: string;
  experience: BackendExperience[];
  education: BackendEducation[];
  skills: BackendSkill[];
  languages: BackendLanguage[];
  certifications?: BackendCertification[];
  projects?: BackendProjectItem[];
  design?: {
    fontFamily?: string;
  };
}

const mapLevel = (
  level?: string,
): "basic" | "intermediate" | "advanced" | "native" => {
  if (level === "básico") return "basic";
  if (level === "intermedio") return "intermediate";
  if (level === "avanzado") return "advanced";
  return "intermediate";
};

export const mapBackendProjectToCVProject = (
  backend: BackendProject,
): CVProject => ({
  id: backend.id,
  name: backend.name,
  createdAt: backend.createdAt,
  updatedAt: backend.updatedAt,
  data: {
    personalInfo: {
      fullName: backend.personalInfo.fullName || "",
      email: backend.personalInfo.email,
      phone: backend.personalInfo.phone,
      address: backend.personalInfo.location,
      photo: backend.personalInfo.photo,
      linkedin: backend.personalInfo.linkedin,
      github: backend.personalInfo.github,
      portfolio: backend.personalInfo.portfolio,
      professionalTitle: backend.personalInfo.professionalTitle,
    },
    summary: backend.summary || "",
    experience: backend.experience.map((exp) => ({
      id: exp.id,
      company: exp.company,
      position: exp.role,
      startDate: exp.startDate,
      endDate: exp.endDate || "",
      description: exp.description,
    })),
    education: backend.education.map((edu) => ({
      id: edu.id,
      institution: edu.institution,
      startDate: edu.startDate,
      endDate: edu.endDate || "",
      degree: edu.degree,
    })),
    projects:
      backend.projects?.map((p) => ({
        id: p.id,
        name: p.name,
        description: p.description,
        url: p.url,
        technologies: p.technologies,
      })) || [],
    skills: backend.skills.map((s) => ({
      id: s.id,
      name: s.name,
      type: s.type === "Blanda" ? "Blanda" : "Técnica",
    })),
    languages: backend.languages.map((l) => ({
      id: l.id,
      name: l.name,
      level: mapLevel(l.level),
    })),
    certifications: backend.certifications?.map((c) => ({
      id: c.id,
      name: c.name,
      date: c.date,
      issuer: c.issuer,
      url: c.url,
    })) || [],
    design: {
      fontFamily: backend.design?.fontFamily || "Inter",
    },
  },
});

export const mapCVProjectToBackendProject = (
  cvProject: CVProject,
): BackendProject => {
  return {
    id: cvProject.id,
    name: cvProject.name,
    createdAt: cvProject.createdAt,
    updatedAt: cvProject.updatedAt,
    personalInfo: {
      fullName: cvProject.data.personalInfo.fullName,
      email: cvProject.data.personalInfo.email,
      phone: cvProject.data.personalInfo.phone,
      location: cvProject.data.personalInfo.address || "",
      linkedin: cvProject.data.personalInfo.linkedin,
      github: cvProject.data.personalInfo.github,
      portfolio: cvProject.data.personalInfo.portfolio,
      photo: cvProject.data.personalInfo.photo,
      professionalTitle: cvProject.data.personalInfo.professionalTitle,
    },
    summary: cvProject.data.summary,
    experience: cvProject.data.experience.map((exp) => ({
      id: exp.id,
      company: exp.company,
      role: exp.position,
      startDate: exp.startDate,
      endDate: exp.endDate || undefined,
      current: false,
      description: exp.description,
    })),
    education: cvProject.data.education.map((edu) => ({
      id: edu.id,
      institution: edu.institution,
      degree: edu.degree || "",
      startDate: edu.startDate,
      endDate: edu.endDate || undefined,
    })),
    skills: cvProject.data.skills.map((s) => ({
      id: s.id,
      name: s.name,
      type: s.type,
    })),
    languages: cvProject.data.languages.map((l) => ({
      id: l.id,
      name: l.name,
      level:
        l.level === "basic"
          ? "básico"
          : l.level === "intermediate"
            ? "intermedio"
            : "avanzado",
    })),
    projects: cvProject.data.projects?.map((p) => ({
      id: p.id,
      name: p.name,
      description: p.description,
      url: p.url,
      technologies: p.technologies,
    })),
    certifications: cvProject.data.certifications?.map((c) => ({
      id: c.id,
      name: c.name,
      date: c.date,
      issuer: c.issuer,
      url: c.url,
    })),
    design: {
      fontFamily: cvProject.data.design.fontFamily,
    },
  };
};

export const AVAILABLE_FONTS = [
  {
    name: "Sistema (Original)",
    value: "'Segoe UI', 'Helvetica Neue', Arial, sans-serif",
  },
  { name: "Inter", value: "Inter, sans-serif" },
  { name: "Roboto", value: "Roboto, sans-serif" },
  { name: "Open Sans", value: '"Open Sans", sans-serif' },
  { name: "Montserrat", value: "Montserrat, sans-serif" },
  { name: "Playfair Display", value: '"Playfair Display", serif' },
  { name: "Merriweather", value: "Merriweather, serif" },
  { name: "Lora", value: "Lora, serif" },
];

// IPC Response types
export interface IPCSuccessResponse<T> {
  success: true;
  data: T;
}

export interface IPCErrorResponse {
  success: false;
  error: string;
}

export interface IPCSuccessMessage {
  success: true;
  message: string;
}

export type IPCResponse<T> = IPCSuccessResponse<T> | IPCErrorResponse;
export type IPCMessageResponse = IPCSuccessMessage | IPCErrorResponse;

export const createEmptyCV = (): CVData => ({
  personalInfo: {
    fullName: "",
    email: "",
    phone: "",
    address: "",
    linkedin: "",
    github: "",
    portfolio: "",
    professionalTitle: "",
  },
  summary: "",
  experience: [],
  education: [],
  projects: [],
  skills: [],
  languages: [],
  certifications: [],
  design: {
    fontFamily: "Inter",
  },
});

export const createEmptyProject = (name: string): CVProject => ({
  id: crypto.randomUUID(),
  name,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  data: createEmptyCV(),
});

export const createEmptyExperience = (): Experience => ({
  id: crypto.randomUUID(),
  company: "",
  position: "",
  startDate: "",
  endDate: "",
  description: "",
});

export const createEmptyEducation = (): Education => ({
  id: crypto.randomUUID(),
  institution: "",
  startDate: "",
  endDate: "",
  degree: "",
  school: "",
  year: "",
});

export const createEmptyProjectItem = (): Project => ({
  id: crypto.randomUUID(),
  name: "",
  description: "",
  url: "",
  link: "",
  technologies: [],
});

export const createEmptySkill = (): Skill => ({
  id: crypto.randomUUID(),
  name: "",
  type: "Técnica",
});

export const createEmptyLanguage = (): Language => ({
  id: crypto.randomUUID(),
  name: "",
  level: "intermediate",
});

export const createEmptyCertification = (): Certification => ({
  id: crypto.randomUUID(),
  name: "",
  date: "",
  issuer: "",
  url: "",
});

export const createEmptyPersonalInformation = (): PersonalInformation => ({
  id: crypto.randomUUID(),
  name: "",
  lastName: "",
  email: "",
  phone: "",
  address: "",
});

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
  skills: [],
});
