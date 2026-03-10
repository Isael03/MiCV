import { CurriculumVitae } from "../../domain/entities/CurriculumVitae.entity";
import { Projects } from "../../domain/entities/Projects.entity";
import { ICVRepository } from "../../domain/repositories/cv.repository";
import { AddProjectsDTO } from "../dtos/AddProjects.dto";

export interface IAddProjectToCVUseCase {
  execute(cvId: string, projectData: AddProjectsDTO): Promise<CurriculumVitae>;
}

export class AddProjectToCVUseCase implements IAddProjectToCVUseCase {
  constructor(private readonly cvRepository: ICVRepository) {}

  async execute(cvId: string, projectData: AddProjectsDTO): Promise<CurriculumVitae> {
    const cv = await this.cvRepository.findById(cvId);
    
    if (!cv) {
      throw new Error("CurriculumVitae not found");
    }

    const project = new Projects(
      crypto.randomUUID(),
      projectData.name,
      projectData.description,
      projectData.url,
      projectData.technologies ? projectData.technologies.split(",").map(t => t.trim()) : undefined,
    );

    if (!cv.projects) {
      cv.projects = [];
    }
    cv.projects.push(project);
    cv.updatedAt = new Date();

    return this.cvRepository.update(cv);
  }
}
