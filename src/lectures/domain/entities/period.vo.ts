import { ValueObject } from '../../../common/domain/value-object';

export type PeriodProps = {
  start: Date;
  end?: Date;
};

export class Period extends ValueObject {

  readonly start: Date;
  readonly end: Date | null;


  constructor(props: PeriodProps) {
    super();
    this.start = props.start;
    this.end = props.end ?? null;
  }

  setEndDate(newEndDate: Date): Period {
    return new Period({ start: this.start, end: newEndDate });
  }
}
