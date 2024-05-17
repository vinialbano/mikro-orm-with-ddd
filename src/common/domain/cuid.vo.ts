import { createId } from '@paralleldrive/cuid2';
import { ValueObject } from './value-object';

export class Cuid extends ValueObject {
  readonly id: string;
  constructor(id?: string) {
    super();
    this.id = id ?? createId();
  }
}

export default Cuid;
