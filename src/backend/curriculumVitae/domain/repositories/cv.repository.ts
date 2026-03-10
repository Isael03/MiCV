import { CurriculumVitae } from "../entities/CurriculumVitae.entity";

export interface ICVRepository {
  findById(id: string): Promise<CurriculumVitae | null>;
  findAll(): Promise<CurriculumVitae[]>;
  create(cv: CurriculumVitae): Promise<CurriculumVitae>;
  update(cv: CurriculumVitae): Promise<CurriculumVitae>;
  delete(id: string): Promise<void>;
  createProjectCV(project: CurriculumVitae): Promise<CurriculumVitae>; //Solo creación inicial
}
