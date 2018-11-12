import React from "react";
import { inject, observer } from "mobx-react";
import { RouterStore } from "mobx-react-router";
import { withRouter, RouteComponentProps } from "react-router-dom";
import { ApiStore } from "../../services/api/api.store";
import { Calendar } from "../../services/api/calendar";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import PieChartView from "../../components/WeeklyChart/PieChartView";
import { Typography, IconButton } from "@material-ui/core";
import moment, { Moment } from "moment";
import { ChartItem, toChartItem } from "../../services/ChartItem";
import { DateUtils } from "../../services/DateUtils";
import WeekReport from "../../components/WeekReport";
import ArrowBackIcon from "@material-ui/icons/ArrowBack";

interface CalendarViewPageProps extends RouteComponentProps<any> {
  api?: ApiStore;
  router?: RouterStore;
}

const genColors = (length: number) => {
  const scalar = 255 / (length + 3);
  return Array.from({ length }, (x, i) => {
    const c = Math.floor((i + 2) * scalar);
    return `rgb(${c},${c},${c})`;
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

  updateUrl = (date: Moment) => {
    const { name } = this.props.match.params;
    this.props.history.replace(
      `/calendar/${name}/?date=${date.format("YYYY[W]WW")}`
    );
  };

  getParamDate = (): Moment => {
    const { search } = this.props.location;
    const parsedSearch = new URLSearchParams(search);
    return moment(parsedSearch.get("date")!);
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

  switchToAllWeekView = () => {
    this.props.history.push(
      `/week?date=${this.getParamDate().format("YYYY[W]WW")}`
    );
  };

  render() {
    const { calendar } = this.state;
    const { name } = this.props.match.params;

    const date = this.getParamDate();
    const week = date.isoWeek();

    const map: { [key: string]: ChartItem } = {};

    if (Object.keys(calendar.events).length === 0) return "";

    const events = calendar.events
      .filter(DateUtils.weekFilter(week))
      .map(toChartItem);

    for (let i in events) {
      const ev = events[i];

      if (ev.title in map) {
        map[ev.title]!.length += ev.length;
      } else {
        map[ev.title] = ev;
      }
    }

    const colors = genColors(Object.keys(map).length);
    const items: ChartItem[] = Object.keys(map).map((key, i) => ({
      ...map[key],
      background: colors[i]
    }));

    return (
      <DefaultLayout>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between"
          }}
        >
          <IconButton onClick={this.switchToAllWeekView}>
            <ArrowBackIcon />
          </IconButton>
          <div style={{ padding: "10px 0 0", textAlign: "center" }}>
            <Typography variant="h3">{name}</Typography>
            <Typography variant="subtitle1">
              {DateUtils.displayWeek(week)}
            </Typography>
          </div>
          <div />
        </div>
        <PieChartView items={items} />
        <Typography style={{ textAlign: "center", padding: 10 }} variant="h6">
          Week Report
        </Typography>
        <WeekReport
          events={calendar.events.filter(DateUtils.weekFilter(week))}
        />
      </DefaultLayout>
    );
  }
}
export default withRouter(CalendarViewPage);
