import { EntityProperty, Platform, Type } from '@mikro-orm/core';
import { ProfessorId } from '../../../domain/entities/professor.entity';

export class ProfessorIdSchemaType extends Type<ProfessorId, string> {
  convertToDatabaseValue(
    valueObject: ProfessorId | undefined | null,
    platform: Platform,
  ): string {
    return valueObject instanceof ProfessorId
      ? valueObject.id
      : (valueObject as unknown as string);
  }

  convertToJSValue(value: string, platform: Platform): ProfessorId {
    return new ProfessorId(value);
  }

  getColumnType(prop: EntityProperty, platform: Platform) {
    return `varchar(24)`;
  }
}
