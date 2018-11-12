import * as React from "react";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import {
  IconButton,
  Typography,
  WithStyles,
  createStyles,
  withStyles
} from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { ApiStore } from "../../services/api/api.store";
import moment, { Moment } from "moment";

import LeftIcon from "@material-ui/icons/KeyboardArrowLeftOutlined";
import RightIcon from "@material-ui/icons/KeyboardArrowRightOutlined";
import { totalLength, CalendarEvent } from "../../services/api/calendar";
import { RouterStore } from "mobx-react-router";
import PieChartView from "../../components/WeeklyChart/PieChartView";
import { DateUtils } from "../../services/DateUtils";
import { withRouter, RouteComponentProps } from "react-router";

const styles = () => createStyles({});

interface HomePageProps extends WithStyles<typeof styles> {
  api?: ApiStore;
  router?: RouterStore;
}

@inject("api", "router")
@observer
class HomePage extends React.Component<
  HomePageProps & RouteComponentProps<any>
> {
  state = {
    week: moment().isoWeek()
  };

  previousWeek = () => {
    this.updateUrl(this.getParamDate().subtract(1, "week"));
  };

  nextWeek = () => {
    this.updateUrl(this.getParamDate().add(1, "week"));
  };

  lengthInWeek = (events: CalendarEvent[], week: number): number => {
    return totalLength(events.filter(DateUtils.weekFilter(week)));
  };

  getTotal = (week: number) => {
    return this.props
      .api!.calendars.map(c => this.lengthInWeek(c.events, week))
      .reduce((a: number, b: number) => a + b, 0);
  };

  handleItemChange = (name: string) => {
    const date = this.getParamDate();
    this.props.router!.history.push(
      `/calendar/${name}/?date=${date.format("YYYY[W]WW")}`
    );
  };

  updateUrl = (date: Moment) => {
    this.props.history.replace(`/week?date=${date.format("YYYY[W]WW")}`);
  };

  getParamDate = (): Moment => {
    const { search } = this.props.location;
    const parsedSearch = new URLSearchParams(search);
    return moment(parsedSearch.get("date")!);
  };

  ensureDateSpecified = () => {
    const { search } = this.props.location;
    const parsedSearch = new URLSearchParams(search);

    let date: Moment = moment();
    if (parsedSearch.has("date")) {
      date = moment(parsedSearch.get("date")!);
      this.setState({ week: date.isoWeek() });
    } else {
      this.updateUrl(date);
    }
  };

  componentWillMount() {
    this.ensureDateSpecified();
  }

  componentDidUpdate(prevProps: HomePageProps & RouteComponentProps<any>) {
    if (prevProps.location.search !== this.props.location.search) {
      this.ensureDateSpecified();
      const date = this.getParamDate();
      this.setState({ week: date.isoWeek() });
    }
  }

  render() {
    const { week } = this.state;
    const { classes } = this.props;
    const { calendars } = this.props.api!;

    const calendarItems = calendars.map(c => ({
      title: c.summary,
      background: c.backgroundColor,
      length: this.lengthInWeek(c.events, week)
    }));
    const weekRangeString = DateUtils.displayWeek(week);

    return (
      <DefaultLayout>
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
            <Typography variant="h3">Weekly</Typography>
            <Typography variant="subtitle1">{weekRangeString}</Typography>
          </div>
          <IconButton
            disabled={moment().isoWeek() === week}
            onClick={this.nextWeek}
          >
            <RightIcon />
          </IconButton>
        </div>
        <PieChartView
          items={calendarItems}
          onItemChange={this.handleItemChange}
        />
      </DefaultLayout>
    );
  }
}

export default withRouter(withStyles(styles)(HomePage));
