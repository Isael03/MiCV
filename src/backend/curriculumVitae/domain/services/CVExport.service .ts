import { CurriculumVitae } from "../entities/CurriculumVitae.entity";

export interface ICVExportService {
  exportToPDF(cv: CurriculumVitae): Buffer
  exportToDocx(cv: CurriculumVitae): Buffer
}
