import { EntityManager } from '@mikro-orm/sqlite';
import { Lecture, LectureId } from '../../../domain/entities/lecture.entity';
import { ILectureRepository } from '../../../domain/repositories/lecture-repository.interface';

export class SqliteLectureRepository implements ILectureRepository {
  constructor(private entityManager: EntityManager) {}

  async add(entity: Lecture): Promise<void> {
    this.entityManager.persist(entity);
  }

  async findById(id: string | LectureId): Promise<Lecture | null> {
    return this.entityManager.findOneOrFail(Lecture, {
      id: typeof id === 'string' ? new LectureId(id) : id,
    });
  }

  async findAll(): Promise<Lecture[]> {
    return this.entityManager.find(Lecture, {});
  }

  async delete(entity: Lecture): Promise<void> {
    this.entityManager.remove(entity);
  }
}
