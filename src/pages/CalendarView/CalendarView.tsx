import React from "react";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ApiStore } from "../../services/api/api.store";
import { Calendar } from "../../services/api/calendar";
import { ChartItem } from "../../components/WeeklyChart/WeeklyChart";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import PieChartView from "../../components/WeeklyChart/PieChartView";
import { Typography } from "@material-ui/core";
import moment from "moment";

interface CalendarViewPageProps extends RouteComponentProps<any> {
  api?: ApiStore;
  router?: RouterStore;
}

const genColors = (length: number) => {
  const scalar = 255 / (length + 3);
  return Array.from({ length }, (x, i) => {
    const c = Math.floor((i + 2) * scalar);
    return `rgba(${c * 1.1},${c * 0.9},${c})`;
  });
};

@inject("api", "router")
@observer
class CalendarViewPage extends React.Component<
  CalendarViewPageProps,
  { calendar: Calendar }
> {
  state = {
    calendar: new Calendar("", "", "", [])
  };

  componentDidMount() {
    try {
      const calendar = this.getSelectedCalendar();
      this.setState({ calendar });
    } catch (err) {
      this.props.router!.history.push("/");
    }
  }

  getSelectedCalendar() {
    const { name } = this.props.match.params;
    const { calendars } = this.props.api!;

    for (let calendar of calendars) {
      if (calendar.summary === name) {
        return calendar;
      }
    }
    throw Error();
  }

  render() {
    const { calendar } = this.state;
    const { name } = this.props.match.params;

    const map: { [key: string]: ChartItem } = {};

    if (Object.keys(calendar.events).length === 0) return "";

    const week = moment().isoWeek();

    const events = calendar.events[week];

    for (let i in events) {
      const ev = events[i];

      const chartItem: ChartItem = {
        title: ev.summary,
        background: "#fff",
        length: ev.duration
      };

      if (chartItem.title in map) {
        map[chartItem.title]!.length += chartItem.length;
      } else {
        map[chartItem.title] = chartItem;
      }
    }

    const colors = genColors(Object.keys(map).length);
    const items: ChartItem[] = Object.keys(map).map((key, i) => ({
      ...map[key],
      background: colors[i]
    }));

    return (
      <DefaultLayout>
        <div style={{ padding: "10px", textAlign: "center" }}>
          <Typography variant="h3">{name}</Typography>
        </div>
        <Typography style={{ textAlign: "center", padding: 10 }} variant="h6">
          This Week
        </Typography>
        <PieChartView items={items} />
      </DefaultLayout>
    );
  }
}
export default withRouter(CalendarViewPage);
