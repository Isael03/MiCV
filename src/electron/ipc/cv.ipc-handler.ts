import { createRequire } from "module";
const require = createRequire(import.meta.url);
const electron = require("electron");
const { ipcMain } = electron;

import { FindAllCVsUseCase } from "../../backend/curriculumVitae/application/use-cases/FindAllCVs.use-case";
import { FindCVByIdUseCase } from "../../backend/curriculumVitae/application/use-cases/FindCVById.use-case";
import { UpdateCVUseCase } from "../../backend/curriculumVitae/application/use-cases/UpdateCV.use-case";
import { DeleteCVUseCase } from "../../backend/curriculumVitae/application/use-cases/DeleteCV.use-case";
import { CVTypeOrmRepository } from "../../backend/curriculumVitae/infrastructure/repositories/cv-typeorm.repository";
import { CVBuilderService } from "../../backend/curriculumVitae/application/services/CVBuilder.service";
import { CVValidationService } from "../../backend/curriculumVitae/domain/services/CVValidation.service";
import type { CurriculumVitae } from "../../backend/curriculumVitae/domain/entities/CurriculumVitae.entity";
import type { UpdateCVDTO } from "../../backend/curriculumVitae/application/dtos/UpdateCV.dto";
import { CreateCVProjectUseCase } from "../../backend/curriculumVitae/application/use-cases/CreateCVProject.use-case";

const cvRepository = new CVTypeOrmRepository();

export const registerCVIpc = () => {
  ipcMain.handle("cv:findAll", async () => {
    try {
      const useCase = new FindAllCVsUseCase(cvRepository);
      const cvs = await useCase.execute();
      return { success: true, data: cvs };
    } catch (error) {
      console.error("Error in cv:findAll:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  });

  ipcMain.handle("cv:createProject", async (_event: any, data: { title: string }) => {
    console.log("Desde el ipc createProject", data);
    try {
      const useCase = new CreateCVProjectUseCase(cvRepository);
      const cv = await useCase.execute(data);
      console.log("Desde el ipc createProject", cv);
      return { success: true, data: cv };
    } catch (error) {
      console.error("Error in cv:createProject:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  });

  ipcMain.handle("cv:findById", async (_event:any, id: string) => {
    try {
      const useCase = new FindCVByIdUseCase(cvRepository);
      const cv = await useCase.execute(id);

      if (!cv) {
        return { success: false, error: "CV not found" };
      }

      return { success: true, data: cv };
    } catch (error) {
      console.error("Error in cv:findById:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  });

  ipcMain.handle("cv:update", async (_event:any, data: { cv: CurriculumVitae; dto: UpdateCVDTO }) => {
    try {
      const cvBuilder = new CVBuilderService();
      const validator = new CVValidationService();
      const useCase = new UpdateCVUseCase(cvBuilder, validator, cvRepository);
      const cv = await useCase.execute(data.cv, data.dto);
      return { success: true, data: cv };
    } catch (error) {
      console.error("Error in cv:update:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  });

  ipcMain.handle("cv:delete", async (_event:any, id: string) => {
    try {
      const useCase = new DeleteCVUseCase(cvRepository);
      await useCase.execute(id);
      return { success: true, message: "CV deleted successfully" };
    } catch (error) {
      console.error("Error in cv:delete:", error);
      return {
        success: false,
        error: error instanceof Error ? error.message : "Unknown error"
      };
    }
  });
};
