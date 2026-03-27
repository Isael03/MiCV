import { create } from "zustand";
import {
  CVProject,
  createEmptyProject,
  CVData,
  Experience,
  Education,
  Project as PortfolioProject,
  Skill,
  Language,
  Certification,
  CVSectionKey,
  createEmptyExperience,
  createEmptyEducation,
  createEmptyProjectItem,
  createEmptySkill,
  createEmptyLanguage,
  createEmptyCertification,
} from "../shared/types/cv";

interface CVStore {
  projects: CVProject[];
  currentProjectId: string | null;

  createProject: (name: string) => void;
  deleteProject: (id: string) => void;
  setCurrentProject: (id: string) => void;
  updateProject: (id: string, data: Partial<CVProject>) => void;
  updateCurrentProjectData: (data: Partial<CVData>) => void;
  setProjects: (projects: CVProject[]) => void;

  // Personal Info
  updatePersonalInfo: (data: Partial<CVData["personalInfo"]>) => void;

  // Design
  updateDesign: (data: Partial<CVData["design"]>) => void;
  updateSectionOrder: (order: CVSectionKey[]) => void;
  updateHiddenSections: (hidden: CVSectionKey[]) => void;

  // Summary
  updateSummary: (summary: string) => void;

  // Experience
  addExperience: () => void;
  updateExperience: (id: string, data: Partial<Experience>) => void;
  removeExperience: (id: string) => void;

  // Education
  addEducation: () => void;
  updateEducation: (id: string, data: Partial<Education>) => void;
  removeEducation: (id: string) => void;

  // Projects
  addProject: () => void;
  updateProjectItem: (id: string, data: Partial<PortfolioProject>) => void;
  removeProject: (id: string) => void;

  // Skills
  addSkill: () => void;
  updateSkill: (id: string, data: Partial<Skill>) => void;
  removeSkill: (id: string) => void;

  // Languages
  addLanguage: () => void;
  updateLanguage: (id: string, data: Partial<Language>) => void;
  removeLanguage: (id: string) => void;

  // Certifications
  addCertification: () => void;
  updateCertification: (id: string, data: Partial<Certification>) => void;
  removeCertification: (id: string) => void;
}

export const useCVStore = create<CVStore>((set, get) => ({
  projects: [],
  currentProjectId: null,

  setProjects: (projects: CVProject[]) => {
    set({ projects });
  },

  createProject: (name: string) => {
    const newProject = createEmptyProject(name);
    set((state) => ({
      projects: [...state.projects, newProject],
      currentProjectId: newProject.id,
    }));
  },

  deleteProject: (id: string) => {
    set((state) => ({
      projects: state.projects.filter((p) => p.id !== id),
      currentProjectId:
        state.currentProjectId === id ? null : state.currentProjectId,
    }));
  },

  setCurrentProject: (id: string) => {
    set({ currentProjectId: id });
  },

  updateProject: (id: string, data: Partial<CVProject>) => {
    set((state) => ({
      projects: state.projects.map((p) =>
        p.id === id
          ? { ...p, ...data, updatedAt: new Date().toISOString() }
          : p,
      ),
    }));
  },

  updateCurrentProjectData: (data: Partial<CVData>) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: { ...p.data, ...data },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  // Personal Info
  updatePersonalInfo: (data) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                personalInfo: { ...p.data.personalInfo, ...data },
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  // Design
  updateDesign: (data) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                design: { ...p.data.design, ...data },
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },
  updateSectionOrder: (order) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: { ...p.data, sectionOrder: order },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },
  updateHiddenSections: (hidden) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: { ...p.data, hiddenSections: hidden },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  // Summary
  updateSummary: (summary: string) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: { ...p.data, summary },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  // Experience
  addExperience: () => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                experience: [...p.data.experience, createEmptyExperience()],
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  updateExperience: (id, data) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                experience: p.data.experience.map((exp) =>
                  exp.id === id ? { ...exp, ...data } : exp,
                ),
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  removeExperience: (id) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                experience: p.data.experience.filter((exp) => exp.id !== id),
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  // Education
  addEducation: () => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                education: [...p.data.education, createEmptyEducation()],
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  updateEducation: (id, data) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                education: p.data.education.map((edu) =>
                  edu.id === id ? { ...edu, ...data } : edu,
                ),
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  removeEducation: (id) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                education: p.data.education.filter((edu) => edu.id !== id),
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  // Projects
  addProject: () => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                projects: [...p.data.projects, createEmptyProjectItem()],
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  updateProjectItem: (id, data) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                projects: p.data.projects.map((proj) =>
                  proj.id === id ? { ...proj, ...data } : proj,
                ),
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  removeProject: (id) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                projects: p.data.projects.filter((proj) => proj.id !== id),
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  // Skills
  addSkill: () => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                skills: [...p.data.skills, createEmptySkill()],
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  updateSkill: (id, data) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                skills: p.data.skills.map((skill) =>
                  skill.id === id ? { ...skill, ...data } : skill,
                ),
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  removeSkill: (id) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                skills: p.data.skills.filter((skill) => skill.id !== id),
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  // Languages
  addLanguage: () => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                languages: [...p.data.languages, createEmptyLanguage()],
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  updateLanguage: (id, data) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                languages: p.data.languages.map((lang) =>
                  lang.id === id ? { ...lang, ...data } : lang,
                ),
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  removeLanguage: (id) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                languages: p.data.languages.filter((lang) => lang.id !== id),
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  // Certifications
  addCertification: () => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                certifications: [...(p.data.certifications || []), createEmptyCertification()],
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  updateCertification: (id, data) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                certifications: (p.data.certifications || []).map((cert) =>
                  cert.id === id ? { ...cert, ...data } : cert,
                ),
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },

  removeCertification: (id) => {
    const { currentProjectId, projects } = get();
    if (!currentProjectId) return;

    set({
      projects: projects.map((p) =>
        p.id === currentProjectId
          ? {
              ...p,
              data: {
                ...p.data,
                certifications: (p.data.certifications || []).filter((cert) => cert.id !== id),
              },
              updatedAt: new Date().toISOString(),
            }
          : p,
      ),
    });
  },
}));
