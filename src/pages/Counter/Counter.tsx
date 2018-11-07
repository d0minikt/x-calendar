import * as React from "react";
import styles from "./Counter.module.css";
import { Paper, Button } from "@material-ui/core";
import { inject, observer } from "mobx-react";
import { AppStore } from "../../services/app.store";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import RemoveIcon from "@material-ui/icons/Remove";
import AddIcon from "@material-ui/icons/Add";

interface CounterPageProps {
  app: AppStore;
}

@inject("app")
@observer
export default class CounterPage extends React.Component<
  CounterPageProps,
  any
> {
  render() {
    return (
      <DefaultLayout>
        <Paper>
          <div className={styles["vertical-container"]}>
            <Button mini variant="fab" onClick={this.props.app.decrement}>
              <RemoveIcon />
            </Button>
            <div className={styles.counter}>{this.props.app.counter}</div>
            <Button mini variant="fab" onClick={this.props.app.increment}>
              <AddIcon />
            </Button>
          </div>
        </Paper>
      </DefaultLayout>
    );
  }
}
