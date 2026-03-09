import { CurriculumVitae } from "../../domain/entities/CurriculumVitae.entity";
import { UpdateCVDTO } from "../dtos/UpdateCV.dto";
import { ICVBuilderService } from "../services/CVBuilder.service";
import { CVValidationService } from "../../domain/services/CVValidation.service";
import { ICVRepository } from "../../domain/repositories/cv.repository";

export interface IUpdateCVUseCase {
  execute(cv: CurriculumVitae, dto: UpdateCVDTO): Promise<CurriculumVitae>;
}

export class UpdateCVUseCase implements IUpdateCVUseCase {
  constructor(
    private readonly cvBuilder: ICVBuilderService,
    private readonly validator: CVValidationService,
    private readonly cvRepository: ICVRepository,
  ) {}

  async execute(cv: CurriculumVitae, dto: UpdateCVDTO): Promise<CurriculumVitae> {
    // Validate the CV before updating
    this.validator.validate(cv);

    // Update the CV
    const updatedCV = this.cvBuilder.update(cv, dto);

    // Validate after updating
    this.validator.validate(updatedCV);

    return this.cvRepository.update(updatedCV);
  }
}
