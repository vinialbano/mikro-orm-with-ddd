import { ValueObject } from '../../../common/domain/value-object';

export type PeriodProps = {
  start: Date;
  end?: Date;
};

export class Period extends ValueObject<PeriodProps> {
  constructor(props: PeriodProps) {
    super(props);
  }

  get start(): Date {
    return this.value.start;
  }

  get end(): Date | undefined {
    return this.value.end;
  }

  setEndDate(newEndDate: Date): Period {
    return new Period({ ...this.value, end: newEndDate });
  }
}
