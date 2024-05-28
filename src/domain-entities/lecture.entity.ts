import { LectureId } from './lecture-id.vo';
import { Period } from './period.vo';

export class Lecture {
  id: LectureId;
  title: string;
  period?: Period;
  interval?: Period;

  constructor(props: {
    id: LectureId | string;
    title: string;
    period?: Period;
    interval?: Period;
  }) {
    this.id = typeof props.id === 'string' ? new LectureId(props.id) : props.id;
    this.title = props.title;
    this.period = props.period;
    this.interval = props.interval;
  }

  static create(command: { title: string }) {
    const id = new LectureId();
    return new Lecture({
      id,
      ...command,
    });
  }

  start() {
    this.period = new Period({
      start: new Date(),
    });
  }

  end() {
    this.period = this.period?.setEndDate(new Date());
  }

  setInterval(interval: { start: Date; end: Date }) {
    this.interval = new Period(interval);
  }

  toJSON() {
    return {
      id: this.id.id,
      title: this.title,
      period: this.period?.toJSON(),
      interval: this.interval?.toJSON(),
    };
  }
}
