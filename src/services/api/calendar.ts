import moment, { Moment } from "moment";

export const formatMinutes = (
  mins: number,
  includeDays: boolean = false
): string => {
  if (includeDays) {
    let d = Math.floor(mins / 60 / 24);
    let h = Math.floor((mins / 60) % 24);
    let m = (mins % 60) % 24;
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

  events: { [key: number]: CalendarEvent[] } = {};
  totalLength: number = 0;

  constructor(
    public id: string,
    public summary: string,
    public backgroundColor: string,
    events: CalendarEvent[]
  ) {
    for (let ev of events) {
      this.totalLength += ev.duration;
      const weekOfTheYear = moment(ev.start).isoWeek();
      if (!(weekOfTheYear in this.events)) {
        this.events[weekOfTheYear] = [];
      }
      this.events[weekOfTheYear].push(ev);
    }
  }
}

export const totalLength = (calendar: Calendar, week: number): number => {
  if (!(week in calendar.events)) return 0;
  return calendar.events[week]
    .filter(ev => moment(ev.start).isBefore(moment()))
    .map((ev: CalendarEvent) => ev.duration)
    .reduce((a: number, b: number) => a + b, 0);
};

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
