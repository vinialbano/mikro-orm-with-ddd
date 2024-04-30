import Cuid from '../../../common/domain/cuid.vo';
import { Entity } from '../../../common/domain/entity';

export class ProfessorId extends Cuid {}

export type ProfessorConstructorProps = {
  id?: ProfessorId | string;
  name: string;
};

export type CreateProfessorCommand = {
  name: string;
};

export class Professor extends Entity {
  id: ProfessorId;
  name: string;

  constructor(props: ProfessorConstructorProps) {
    super();
    this.id =
      typeof props.id === 'string'
        ? new ProfessorId(props.id)
        : props.id ?? new ProfessorId();
    this.name = props.name;
  }

  static create(command: CreateProfessorCommand) {
    return new Professor(command);
  }

  toJSON() {
    return {
      id: this.id.value,
      name: this.name,
    };
  }
}
