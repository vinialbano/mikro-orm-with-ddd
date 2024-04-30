import { EntityManager } from '@mikro-orm/sqlite';
import {
  Professor,
  ProfessorId,
} from '../../../domain/entities/professor.entity';
import { IProfessorRepository } from '../../../domain/repositories/professor-repository.interface';

export class SqliteProfessorRepository implements IProfessorRepository {
  constructor(private entityManager: EntityManager) {}

  async add(entity: Professor): Promise<void> {
    this.entityManager.persist(entity);
  }

  async findById(id: string | ProfessorId): Promise<Professor | null> {
    return this.entityManager.findOneOrFail(Professor, {
      id: typeof id === 'string' ? new ProfessorId(id) : id,
    });
  }

  async findAll(): Promise<Professor[]> {
    return this.entityManager.find(Professor, {});
  }

  async delete(entity: Professor): Promise<void> {
    this.entityManager.remove(entity);
  }
}
