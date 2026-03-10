// src/backend/store/projectStore.ts
import fs from "fs/promises";
import path from "path";
import { app } from "electron";
import { CurriculumProject } from "../../types/curriculum";

export class ProjectStore {
  private storageDir: string;

  constructor() {
    // We store the CVs in the user data directory
    this.storageDir = path.join(app.getPath("userData"), "projectsCV");
    this.ensureDirectory();
  }

  private async ensureDirectory() {
    try {
      await fs.mkdir(this.storageDir, { recursive: true });
    } catch (error) {
      console.error("Error creating storage directory:", error);
    }
  }

  async findAll(): Promise<CurriculumProject[]> {
    console.log("findAll called");
    await this.ensureDirectory();
    try {
      const files = await fs.readdir(this.storageDir);
      const jsonFiles = files.filter((f) => f.endsWith(".json"));

      const projects = await Promise.all(
        jsonFiles.map(async (file) => {
          const content = await fs.readFile(
            path.join(this.storageDir, file),
            "utf-8",
          );
          return JSON.parse(content) as CurriculumProject;
        }),
      );

      return projects.sort(
        (a, b) =>
          new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
      );
    } catch (error) {
      console.error("Error reading projects:", error);
      return [];
    }
  }

  async findById(id: string): Promise<CurriculumProject | null> {
    try {
      const filePath = path.join(this.storageDir, `${id}.json`);
      const content = await fs.readFile(filePath, "utf-8");
      return JSON.parse(content) as CurriculumProject;
    } catch (error) {
      return null;
    }
  }

  async save(project: CurriculumProject): Promise<void> {
    await this.ensureDirectory();
    const filePath = path.join(this.storageDir, `${project.id}.json`);
    await fs.writeFile(filePath, JSON.stringify(project, null, 2), "utf-8");
  }

  async delete(id: string): Promise<void> {
    try {
      const filePath = path.join(this.storageDir, `${id}.json`);
      await fs.unlink(filePath);
    } catch (error) {
      console.error(`Error deleting project ${id}:`, error);
    }
  }
}

export const projectStore = new ProjectStore();
