export interface ChartItem {
  background: string;
  length: number;
  title: string;
}

export const sortChartItems = (a: ChartItem, b: ChartItem) =>
  b.length - a.length;
