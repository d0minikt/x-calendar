import React, { Component } from "react";

// routing
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router";
import { syncHistoryWithStore, RouterStore } from "mobx-react-router";

// pages
import HomePage from "./pages/Home/Home";
import CounterPage from "./pages/Counter/Counter";
import YearViewPage from "./pages/YearView/YearView";
import LoginPage from "./pages/Login/Login";
import NotFoundPage from "./pages/NotFound/NotFound";
import CalendarViewPage from "./pages/CalendarView/CalendarView";

import { inject, observer } from "mobx-react";
import {
  WithStyles,
  Theme,
  createStyles,
  withStyles,
  Button
} from "@material-ui/core";
import { ApiStore } from "./services/api/api.store";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      width: "100%",
      height: "100%",
      minHeight: "100vh",
      background: theme.palette.background.default,
      color: theme.palette.text.primary
    }
  });

interface AppProps extends WithStyles<typeof styles> {
  router?: RouterStore;
  api?: ApiStore;
}

@inject("router", "api")
@observer
class App extends Component<AppProps> {
  private browserHistory = createBrowserHistory();
  private history = syncHistoryWithStore(
    this.browserHistory,
    this.props.router!
  );

  componentWillMount() {
    const url = new URL(window.location.href);
    if (url.protocol === "http:" && url.host === "x-calendar.surge.sh")
      window.location.replace("https://x-calendar.surge.sh");

    this.props.api!.fetchApi().then(() => this.forceUpdate());
  }

  render() {
    const { classes } = this.props;
    const { isSignedIn, calendars, gapi } = this.props.api!;

    if (calendars.length === 0 && isSignedIn) return "Loading";
    if (!isSignedIn) {
      if (Object.keys(gapi).length === 0) return "loading";
      return (
        <div className={classes.root}>
          <LoginPage />
        </div>
      );
    }

    return (
      <div className={classes.root}>
        <Router history={this.history}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/calendar/:name" component={CalendarViewPage} />
            <Route path="/counter" exact component={CounterPage} />
            <Route path="/year" exact component={YearViewPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(App);
