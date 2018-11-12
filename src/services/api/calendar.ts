import moment, { Moment } from "moment";

export const formatMinutes = (
  mins: number,
  includeDays: boolean = false
): string => {
  const d = Math.floor(mins / 60 / 24);
  const h = Math.floor(includeDays ? (mins / 60) % 24 : mins / 60);
  const m = mins % 60;
  return `${d === 0 || !includeDays ? "" : `${d}d`} ${h === 0 ? "" : `${h}h`} ${
    m === 0 ? "" : `${m}m`
  }`;
};

export const toHours = (mins: number): string => {
  if (mins < 60) return `${mins}m`;
  return `${Math.floor(mins / 60)}h`;
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
  moment(event.start).isBefore(moment());

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
