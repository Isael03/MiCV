import { ICVRepository } from "../../domain/repositories/cv.repository";

export interface IDeleteCVUseCase {
  execute(id: string): Promise<void>;
}

export class DeleteCVUseCase implements IDeleteCVUseCase {
  constructor(private readonly cvRepository: ICVRepository) {}

  async execute(id: string): Promise<void> {
    await this.cvRepository.delete(id);
  }
}
