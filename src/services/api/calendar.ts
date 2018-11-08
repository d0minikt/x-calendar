import moment, { Moment } from "moment";

export const formatMinutes = (
  mins: number,
  includeDays: boolean = false
): string => {
  if (includeDays) {
    let d = Math.floor(mins / 60 / 24);
    let h = Math.floor((mins / 60) % 24);
    let m = mins % 60;
    return `${d === 0 ? "" : `${d}d`} ${h === 0 ? "" : `${h}h`} ${
      m === 0 ? "" : `${m}m`
    }`;
  } else {
    let h = Math.floor(mins / 60);
    let m = mins % 60;
    if (h === 0) return m + "m";
    if (m === 0) return h + "h";
    return `${h}h ${m}m`;
  }
};

export class Calendar {
  static fromObject(calendar: any, events: CalendarEvent[]): Calendar {
    return new Calendar(
      calendar.id,
      calendar.summary,
      calendar.backgroundColor,
      events
    );
  }

  totalLength: number = 0;

  constructor(
    public id: string,
    public summary: string,
    public backgroundColor: string,
    public events: CalendarEvent[]
  ) {
    for (let ev of events) {
      this.totalLength += ev.duration;
    }
  }
}

export const totalLength = (events: CalendarEvent[]): number => {
  return events.reduce((a: number, b: CalendarEvent) => a + b.duration, 0);
};

export const isBetween = (min: Moment, max: Moment) => (event: CalendarEvent) =>
  moment(event.start).isAfter(min) &&
  moment(event.end).isBefore(max) &&
  moment(event.end).isBefore(moment());

export class CalendarEvent {
  static fromObject(ev: any): CalendarEvent {
    return new CalendarEvent(
      ev.id,
      ev.summary,
      ev.start.dateTime,
      ev.end.dateTime
    );
  }

  duration: number = 0;

  constructor(
    public id: string,
    public summary: string,
    public start: string,
    public end: string
  ) {
    this.duration = moment(this.end).diff(moment(this.start), "minutes");
  }
}
