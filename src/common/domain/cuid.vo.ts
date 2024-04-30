import { createId } from '@paralleldrive/cuid2';
import { ValueObject } from './value-object';

export class Cuid extends ValueObject<string> {
  constructor(id?: string) {
    super(id || createId());
  }
}

export default Cuid;
