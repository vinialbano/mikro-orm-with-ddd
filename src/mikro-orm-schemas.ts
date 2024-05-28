import { EntityProperty, EntitySchema, Type } from '@mikro-orm/core';
import { LectureId } from './domain-entities/lecture-id.vo';
import { Lecture } from './domain-entities/lecture.entity';
import { Period } from './domain-entities/period.vo';

export class LectureIdSchemaType extends Type<LectureId, string> {
  convertToDatabaseValue(valueObject: LectureId | undefined | null): string {
    return valueObject instanceof LectureId
      ? valueObject.id
      : (valueObject as unknown as string);
  }
  convertToJSValue(value: string): LectureId {
    return new LectureId(value);
  }
  getColumnType(prop: EntityProperty) {
    return `varchar(24)`;
  }
}

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
    },
    interval: {
      kind: 'embedded',
      entity: 'Period',
      nullable: true,
      prefix: 'interval_',
    },
  },
});
