import { IUseCase } from '../../common/application/use-case.interface';
import { ILectureRepository } from '../domain/repositories/lecture-repository.interface';

export class ListLecturesUseCase
  implements IUseCase<ListLecturesInput, ListLecturesOutput>
{
  constructor(private readonly lectureRepository: ILectureRepository) {}

  async execute(): Promise<ListLecturesOutput> {
    const lectures = await this.lectureRepository.findAll();
    const formattedLectures = lectures.map((lecture) => lecture.toJSON());
    return formattedLectures;
  }
}

export type ListLecturesInput = void;
export type ListLecturesOutput = Array<{
  id: string;
  professorId: string;
  title: string;
  period?: {
    start: Date;
    end?: Date;
  };
}>;
