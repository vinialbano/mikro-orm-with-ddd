import Cuid from '../../../common/domain/cuid.vo';
import { Entity } from '../../../common/domain/entity';
import { Period } from './period.vo';
import { ProfessorId } from './professor.entity';

export class LectureId extends Cuid {}

export type LectureConstructorProps = {
  id?: LectureId | string;
  professorId: ProfessorId | string;
  title: string;
  period?: Period;
};

export type CreateLectureCommand = {
  professorId: ProfessorId | string;
  title: string;
};

export class Lecture extends Entity {
  id: LectureId;
  professorId: ProfessorId;
  title: string;
  period?: Period;

  constructor(props: LectureConstructorProps) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new LectureId(props.id)
        : props.id ?? new LectureId();
    this.professorId =
      typeof props.professorId === 'string'
        ? new ProfessorId(props.professorId)
        : props.professorId;
    this.title = props.title;
    this.period = props.period;
  }

  static create(command: CreateLectureCommand) {
    return new Lecture(command);
  }

  start() {
    this.period = new Period({
      start: new Date(),
    });
  }

  end() {
    this.period = this.period?.setEndDate(new Date());
  }

  toJSON() {
    return {
      id: this.id.value,
      professorId: this.professorId.value,
      title: this.title,
      period: this.period?.value,
    };
  }
}
