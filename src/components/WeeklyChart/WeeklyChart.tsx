import React from "react";
import { VictoryTooltip, VictoryPie, VictoryTheme } from "victory";
import moment from "moment";
import {
  Calendar,
  formatMinutes,
  totalLength
} from "../../services/api/calendar";
import ChartLegend from "./ChartLegend";
import styles from "./WeeklyChart.module.css";

interface CustomLabelProps {
  datum?: any;
}

class CustomLabel extends React.Component<CustomLabelProps> {
  render() {
    return (
      <g>
        <VictoryTooltip
          {...this.props}
          text={`${this.props.datum.summary}`}
          orientation="top"
          pointerLength={0}
          flyoutStyle={{ fill: "white", stroke: "#ddd", strokeWidth: 1 }}
        />
      </g>
    );
  }
}

export interface ChartItem {
  background: string;
  length: number;
  title: string;
}

interface WeeklyChartProps {
  items: ChartItem[];
}

class WeeklyChart extends React.Component<WeeklyChartProps> {
  getTotal = () =>
    this.props.items
      .map(it => it.length)
      .reduce((a: number, b: number) => a + b, 0);

  render() {
    const { items } = this.props;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "2 1 auto"
        }}
      >
        <VictoryPie
          animate={{ duration: 500, easing: "circle" }}
          theme={VictoryTheme.material}
          style={{
            data: {
              fillOpacity: 1,
              stroke: "#fff",
              strokeWidth: 0.5
            },
            labels: {
              fontSize: 10
            }
          }}
          labels={d => d.summary}
          labelComponent={<CustomLabel />}
          colorScale={items.filter(c => c.length > 0).map(c => c.background)}
          data={items.filter(it => it.length > 0).map(it => {
            return {
              y: it.length,
              label: formatMinutes(it.length)
            };
          })}
        />
      </div>
    );
  }
}
export default WeeklyChart;
