import * as React from "react";
import styles from "./Home.module.css";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { Paper } from "@material-ui/core";
import WeeklyChart from "../../components/WeeklyChart/WeeklyChart";
import { inject, observer } from "mobx-react";
import { ApiStore } from "../../services/api/api.store";

interface HomePageProps {
  api?: ApiStore;
}

@inject("api")
@observer
export default class HomePage extends React.Component<HomePageProps> {
  render() {
    return (
      <DefaultLayout>
        <Paper className={styles.paper} style={{ borderRadius: 10 }}>
          <WeeklyChart calendars={this.props.api!.calendars} />
        </Paper>
      </DefaultLayout>
    );
  }
}
