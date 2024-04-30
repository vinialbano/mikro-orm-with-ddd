import { IUnitOfWork } from '../../common/application/unit-of-work.interface';
import { IUseCase } from '../../common/application/use-case.interface';
import { Lecture } from '../domain/entities/lecture.entity';
import { Period } from '../domain/entities/period.vo';
import { ILectureRepository } from '../domain/repositories/lecture-repository.interface';
import { IProfessorRepository } from '../domain/repositories/professor-repository.interface';

export class CreateLectureUseCase
  implements IUseCase<CreateLectureInput, CreateLectureOutput>
{
  constructor(
    private readonly lectureRepository: ILectureRepository,
    private readonly professorRepository: IProfessorRepository,
    private uow: IUnitOfWork,
  ) {}

  async execute(input: CreateLectureInput): Promise<CreateLectureOutput> {
    const professor = await this.professorRepository.findById(
      input.professorId,
    );
    if (!professor) {
      throw new Error('Professor not found');
    }

    const lecturePeriod = new Period({
      start: input.startDate,
      end: input.endDate,
    });
    const lecture = Lecture.create({
      professorId: input.professorId,
      title: input.title,
    });
    await this.lectureRepository.add(lecture);
    await this.uow.commit();
    return lecture.toJSON();
  }
}

export type CreateLectureInput = {
  professorId: string;
  title: string;
  startDate: Date;
  endDate?: Date;
};

export type CreateLectureOutput = {
  id: string;
  professorId: string;
  title: string;
  period?: {
    start: Date;
    end?: Date;
  };
};
