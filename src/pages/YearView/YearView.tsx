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

    const sortedCalendars = calendars
      .slice()
      .sort((a, b) => b.totalLength - a.totalLength)
      .filter(c => c.totalLength > 0);

    return (
      <DefaultLayout>
        <Table className={classes.table}>
          <TableHead>
            <TableRow>
              <TableCell>Calendar Name</TableCell>
              <TableCell>Time Spent</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {sortedCalendars.map(c => {
              return (
                <TableRow key={c.id}>
                  <TableCell component="th" scope="row">
                    {c.summary}
                  </TableCell>
                  <TableCell>{formatMinutes(c.totalLength, true)}</TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </DefaultLayout>
    );
  }
}
export default withStyles(styles)(YearViewPage);
