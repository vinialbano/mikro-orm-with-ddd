import { IRepository } from '../../../common/domain/repository.interface';
import { Lecture } from '../entities/lecture.entity';

export interface ILectureRepository extends IRepository<Lecture> {}
