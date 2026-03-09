import { CurriculumVitae } from "../../domain/entities/CurriculumVitae.entity";
import { ICVRepository } from "../../domain/repositories/cv.repository";
import { CVValidationService } from "../../domain/services/CVValidation.service";
import { CreateCVDTO } from "../dtos/CreateCV.dto";
import { ICVBuilderService } from "../services/CVBuilder.service";

export interface ICreateCVUseCase {
  execute(dto: CreateCVDTO): Promise<CurriculumVitae>;
}

export class CreateCVUseCase implements ICreateCVUseCase {
  constructor(
    private readonly cvBuilder: ICVBuilderService,
    private readonly cvRepository: ICVRepository,
    private readonly validator: CVValidationService,
  ) {}

  async execute(dto: CreateCVDTO): Promise<CurriculumVitae> {

    const cv = this.cvBuilder.build(dto);
    this.validator.validate(cv);
    return this.cvRepository.create(cv);
  }
}
