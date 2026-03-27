// src/electron/ipc/cv.ipc-handler.ts
import { createRequire } from "module";
const require = createRequire(import.meta.url);
const electron = require("electron");
const { ipcMain } = electron;

import { projectStore } from "../../backend/store/projectStore";
import { CurriculumProject } from "../../types/curriculum";
import crypto from "crypto";

export const registerCVIpc = () => {
  ipcMain.handle("cv:findAll", async () => {
    try {
      const projects = await projectStore.findAll();
      return { success: true, data: projects };
    } catch (error) {
      console.error("Error in cv:findAll:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  });

  ipcMain.handle(
    "cv:createProject",
    async (_event: any, data: { title: string }) => {
      try {
        const id = crypto.randomUUID();
        const now = new Date().toISOString();
        const newProject: CurriculumProject = {
          id,
          name: data.title,
          createdAt: now,
          updatedAt: now,
          personalInfo: {
            fullName: "",
            email: "",
            phone: "",
            location: "",
          },
          experience: [],
          education: [],
          skills: [],
          languages: [],
        };

        await projectStore.save(newProject);
        return { success: true, data: newProject };
      } catch (error) {
        console.error("Error in cv:createProject:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
  );

  ipcMain.handle("cv:findById", async (_event: any, id: string) => {
    try {
      const project = await projectStore.findById(id);
      if (!project) {
        return { success: false, error: "Project not found" };
      }
      return { success: true, data: project };
    } catch (error) {
      console.error("Error in cv:findById:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  });

  ipcMain.handle(
    "cv:update",
    async (_event: any, data: { project: CurriculumProject }) => {
      try {
        const project = {
          ...data.project,
          updatedAt: new Date().toISOString(),
        };
        await projectStore.save(project);
        return { success: true, data: project };
      } catch (error) {
        console.error("Error in cv:update:", error);
        return {
          success: false,
          error: error instanceof Error ? error.message : "Unknown error",
        };
      }
    },
  );

  ipcMain.handle("cv:delete", async (_event: any, id: string) => {
    try {
      await projectStore.delete(id);
      return { success: true, message: "Project deleted successfully" };
    } catch (error) {
      console.error("Error in cv:delete:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  });

  ipcMain.handle("cv:duplicateProject", async (_event: any, id: string) => {
    try {
      const originalProject = await projectStore.findById(id);
      if (!originalProject) {
        return { success: false, error: "Project not found" };
      }

      const newId = crypto.randomUUID();
      const now = new Date().toISOString();
      const duplicatedProject: CurriculumProject = {
        ...originalProject,
        id: newId,
        name: `${originalProject.name} (copia)`,
        createdAt: now,
        updatedAt: now,
      };

      await projectStore.save(duplicatedProject);
      return { success: true, data: duplicatedProject };
    } catch (error) {
      console.error("Error in cv:duplicateProject:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error",
      };
    }
  });
};
