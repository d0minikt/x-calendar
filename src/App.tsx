import React, { Component } from "react";

// routing
import { createBrowserHistory } from "history";
import { Router, Switch, Route } from "react-router";
import { syncHistoryWithStore, RouterStore } from "mobx-react-router";

// pages
import HomePage from "./pages/Home/Home";
import CounterPage from "./pages/Counter/Counter";
import NotFoundPage from "./pages/NotFound/NotFound";
import { inject, observer } from "mobx-react";
import { WithStyles, Theme, createStyles, withStyles } from "@material-ui/core";

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
}

@inject("router")
@observer
class App extends Component<AppProps> {
  private browserHistory = createBrowserHistory();
  private history = syncHistoryWithStore(
    this.browserHistory,
    this.props.router!
  );

  render() {
    const { classes } = this.props;
    return (
      <div className={classes.root}>
        <Router history={this.history}>
          <Switch>
            <Route path="/" exact component={HomePage} />
            <Route path="/counter" exact component={CounterPage} />
            <Route component={NotFoundPage} />
          </Switch>
        </Router>
      </div>
    );
  }
}

export default withStyles(styles)(App);
