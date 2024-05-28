export type PeriodProps = {
  start: Date;
  end?: Date;
};

export class Period {
  readonly start: Date;
  readonly end: Date | null;

  constructor(props: PeriodProps) {
    console.log('PROPS:', props);
    this.validate(props);
    this.start = props.start;
    this.end = props.end ?? null;
  }

  private validate(props: PeriodProps) {
    if (!props.start) {
      throw new Error('The start date is required');
    }
    if (props.end && props.start > props.end!) {
      throw new Error('The start date must be before the end date');
    }
  }

  setEndDate(newEndDate: Date): Period {
    return new Period({ start: this.start, end: newEndDate });
  }

  toJSON() {
    return {
      start: this.start,
      end: this.end,
    };
  }
}
