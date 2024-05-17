import { EntitySchema } from '@mikro-orm/core';
import { Lecture } from '../../domain/entities/lecture.entity';
import { Period } from '../../domain/entities/period.vo';
import { Professor } from '../../domain/entities/professor.entity';
import { LectureIdSchemaType } from './schema-types/lecture-id.schema-type';
import { ProfessorIdSchemaType } from './schema-types/professor-id.schema-type';

export const PeriodSchema = new EntitySchema<Period>({
  class: Period,
  embeddable: true,
  properties: {
    start: {
      type: Date,
    },
    end: {
      type: Date,
      nullable: true,
    },
  },
  forceConstructor: true,
});

export const LectureSchema = new EntitySchema<Lecture>({
  class: Lecture,
  properties: {
    id: {
      type: new LectureIdSchemaType(),
      primary: true,
    },
    title: { type: 'varchar(255)' },
    period: {
      kind: 'embedded',
      entity: 'Period',
      nullable: true,
      prefix: 'period_',
    },
    professorId: {
      kind: 'm:1',
      name: 'professor_id',
      entity: () => Professor,
      mapToPk: true,
      type: new ProfessorIdSchemaType(),
    },
  },
});

export const ProfessorSchema = new EntitySchema<Professor>({
  class: Professor as any,
  properties: {
    id: {
      type: new ProfessorIdSchemaType(),
      primary: true,
    },
    name: { type: 'varchar(255)' },
  },
});
