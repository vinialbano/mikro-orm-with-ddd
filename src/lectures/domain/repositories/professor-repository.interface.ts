import { IRepository } from '../../../common/domain/repository.interface';
import { Professor } from '../entities/professor.entity';

export interface IProfessorRepository extends IRepository<Professor> {}
