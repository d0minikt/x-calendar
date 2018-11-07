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
import { Typography, IconButton } from "@material-ui/core";
import LeftIcon from "@material-ui/icons/KeyboardArrowLeftOutlined";
import RightIcon from "@material-ui/icons/KeyboardArrowRightOutlined";

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

interface WeeklyChartProps {
  calendars: Calendar[];
}

class WeeklyChart extends React.Component<WeeklyChartProps> {
  state = {
    week: moment().isoWeek()
  };

  previousWeek = () => {
    this.setState({ week: this.state.week - 1 });
  };

  nextWeek = () => {
    this.setState({ week: this.state.week + 1 });
  };

  getTotal = (week: number) =>
    this.props.calendars
      .map(c => totalLength(c, week))
      .reduce((a: number, b: number) => a + b, 0);

  render() {
    const { calendars } = this.props;
    const { week } = this.state;

    const total = this.getTotal(week);

    return (
      <div>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <IconButton
            disabled={this.getTotal(week - 1) === 0}
            onClick={this.previousWeek}
          >
            <LeftIcon />
          </IconButton>
          <div style={{ textAlign: "center", padding: "10px 0" }}>
            <Typography variant="h4">Weekly</Typography>
            <Typography variant="subtitle1">Week {week}</Typography>
          </div>
          <IconButton
            disabled={moment().isoWeek() === week}
            onClick={this.nextWeek}
          >
            <RightIcon />
          </IconButton>
        </div>
        <div className={styles.root}>
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
              colorScale={calendars
                .filter(c => totalLength(c, week) !== 0)
                .map(c => c.backgroundColor)}
              data={calendars.filter(c => totalLength(c, week) !== 0).map(c => {
                return {
                  y: totalLength(c, week),
                  label: formatMinutes(totalLength(c, week))
                };
              })}
            />
          </div>
          <div style={{ flex: "1 1 auto" }}>
            <ChartLegend calendars={calendars} total={total} week={week} />
          </div>
        </div>
      </div>
    );
  }
}
export default WeeklyChart;
