import { sanitizeText } from "../../../shared/utils/sanitization.utils";
import { CurriculumVitae } from "../../domain/entities/CurriculumVitae.entity";
import { ICVRepository } from "../../domain/repositories/cv.repository";
import crypto from "crypto";

export interface ICreateCVUseCase {
  execute(data: { title: string }): Promise<CurriculumVitae>;
}

export class CreateCVProjectUseCase implements ICreateCVUseCase {
  constructor(private readonly cvRepository: ICVRepository) {}

  async execute(data: { title: string }): Promise<CurriculumVitae> {
    const curriculumVitae = new CurriculumVitae(
      crypto.randomUUID(),
      sanitizeText(data.title, true),
    );

    return this.cvRepository.create(curriculumVitae);
  }
}
