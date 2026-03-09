import { CurriculumVitae } from "../../domain/entities/CurriculumVitae.entity";
import { ICVRepository } from "../../domain/repositories/cv.repository";

export interface IFindCVByIdUseCase {
  execute(id: string): Promise<CurriculumVitae>;
}

export class FindCVByIdUseCase implements IFindCVByIdUseCase {
  constructor(private readonly cvRepository: ICVRepository) {}

  async execute(id: string): Promise<CurriculumVitae> {
    const cv = await this.cvRepository.findById(id);
    
    if (!cv) {
      throw new Error(`CV con id ${id} no encontrado`);
    }

    return cv;
  }
}
