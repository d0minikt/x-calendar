import React from "react";
import {
  createStyles,
  withStyles,
  WithStyles,
  Table,
  TableHead,
  TableRow,
  TableCell,
  TableBody
} from "@material-ui/core";
import DefaultLayout from "../../components/DefaultLayout/DefaultLayout";
import { inject, observer } from "mobx-react";
import { ApiStore } from "../../services/api/api.store";
import { formatMinutes } from "../../services/api/calendar";
import ColorDot from "../../components/ColorDot";
import ItemTable from "../../ItemTable";

const styles = () =>
  createStyles({
    table: {}
  });

interface YearViewPageProps extends WithStyles<typeof styles> {
  api?: ApiStore;
}

@inject("api")
@observer
class YearViewPage extends React.Component<YearViewPageProps> {
  render() {
    const { classes } = this.props;
    const { calendars } = this.props.api!;

    const items = calendars.map(c => ({
      length: c.totalLength,
      title: c.summary,
      background: c.backgroundColor
    }));

    return (
      <DefaultLayout>
        <ItemTable items={items} />
      </DefaultLayout>
    );
  }
}
export default withStyles(styles)(YearViewPage);
