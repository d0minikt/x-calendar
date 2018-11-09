import { ChartItem } from "./ChartItem";
import { CalendarEvent, Calendar } from "./api/calendar";
export interface ChartItem {
  background: string;
  length: number;
  title: string;
}

export const sortChartItems = (a: ChartItem, b: ChartItem) =>
  b.length - a.length;

export const toChartItem = (ev: CalendarEvent): ChartItem => ({
  title: ev.summary,
  background: "#fff",
  length: ev.duration
});
