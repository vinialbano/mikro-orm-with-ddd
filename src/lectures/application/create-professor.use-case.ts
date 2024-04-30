import { IUnitOfWork } from '../../common/application/unit-of-work.interface';
import { IUseCase } from '../../common/application/use-case.interface';
import { Professor } from '../domain/entities/professor.entity';
import { IProfessorRepository } from '../domain/repositories/professor-repository.interface';

export class CreateProfessorUseCase
  implements IUseCase<CreateProfessorInput, CreateProfessorOutput>
{
  constructor(
    private readonly professorRepository: IProfessorRepository,
    private uow: IUnitOfWork,
  ) {}

  async execute(input: CreateProfessorInput): Promise<CreateProfessorOutput> {
    const professor = Professor.create(input);
    await this.professorRepository.add(professor);
    await this.uow.commit();
    return professor.toJSON();
  }
}

export type CreateProfessorInput = {
  name: string;
};

export type CreateProfessorOutput = {
  id: string;
  name: string;
};
