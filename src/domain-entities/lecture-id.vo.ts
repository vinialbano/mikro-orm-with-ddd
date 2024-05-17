import { createId } from '@paralleldrive/cuid2';

export class LectureId {
  readonly id: string;
  constructor(id?: string) {
    this.id = id ?? createId();
  }
}
