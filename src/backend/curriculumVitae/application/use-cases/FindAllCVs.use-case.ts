import { CurriculumVitae } from "../../domain/entities/CurriculumVitae.entity";
import { ICVRepository } from "../../domain/repositories/cv.repository";

export interface IFindAllCVsUseCase {
  execute(): Promise<CurriculumVitae[]>;
}

export class FindAllCVsUseCase implements IFindAllCVsUseCase {
  constructor(private readonly cvRepository: ICVRepository) {}

  async execute(): Promise<CurriculumVitae[]> {
    return await this.cvRepository.findAll();
  }
}
