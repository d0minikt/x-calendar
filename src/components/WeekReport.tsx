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
import { formatMinutes, CalendarEvent } from "../services/api/calendar";
import moment from "moment";

const styles = () => createStyles({});

interface WeekReportProps extends WithStyles<typeof styles> {
  events: CalendarEvent[];
}

class WeekReport extends React.Component<WeekReportProps> {
  getTotal = () => this.props.events.reduce((a, b) => a + b.duration, 0);

  render() {
    const { events } = this.props;
    const processedItems = events;

    return (
      <div>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>Calendar Name</TableCell>
              <TableCell padding="checkbox">Weekday</TableCell>
              <TableCell padding="checkbox">Duration</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {processedItems.map(it => {
              return (
                <TableRow key={it.id}>
                  <TableCell component="th" scope="row">
                    {it.summary}
                  </TableCell>
                  <TableCell padding="checkbox">
                    {moment(it.start).format("dddd")}
                  </TableCell>
                  <TableCell padding="checkbox">
                    {formatMinutes(it.duration)}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    );
  }
}
export default withStyles(styles)(WeekReport);
