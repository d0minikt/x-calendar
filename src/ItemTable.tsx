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
import { ChartItem } from "./components/WeeklyChart/WeeklyChart";
import ColorDot from "./components/ColorDot";
import { formatMinutes } from "./services/api/calendar";

const styles = () => createStyles({});

interface ItemTableProps extends WithStyles<typeof styles> {
  items: ChartItem[];
}

class ItemTable extends React.Component<ItemTableProps> {
  getTotal = () => this.props.items.reduce((a, b) => a + b.length, 0);

  render() {
    const { items } = this.props;

    const processedItems = items
      .sort((a, b) => b.length - a.length)
      .filter(it => it.length > 0);

    return (
      <Table>
        <TableHead>
          <TableRow>
            <TableCell padding="checkbox">Color</TableCell>
            <TableCell>Calendar Name</TableCell>
            <TableCell padding="checkbox">Time</TableCell>
            <TableCell padding="checkbox">%</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {processedItems.map(it => {
            return (
              <TableRow key={it.title}>
                <TableCell padding="checkbox">
                  <ColorDot color={it.background} />
                </TableCell>
                <TableCell component="th" scope="row">
                  {it.title}
                </TableCell>
                <TableCell padding="checkbox">
                  {formatMinutes(it.length, true)}
                </TableCell>
                <TableCell padding="checkbox">
                  {Math.round((it.length / this.getTotal()) * 100)}%
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
    );
  }
}
export default withStyles(styles)(ItemTable);
