import { EntityProperty, Platform, Type } from '@mikro-orm/core';
import { LectureId } from '../../../domain/entities/lecture.entity';

export class LectureIdSchemaType extends Type<LectureId, string> {
  convertToDatabaseValue(
    valueObject: LectureId | undefined | null,
    platform: Platform,
  ): string {
    return valueObject instanceof LectureId
      ? valueObject.id
      : (valueObject as unknown as string);
  }

  convertToJSValue(value: string, platform: Platform): LectureId {
    return new LectureId(value);
  }

  getColumnType(prop: EntityProperty, platform: Platform) {
    return `varchar(24)`;
  }
}
