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
import ColorDot from "./components/ColorDot";
import { formatMinutes, toHours } from "./services/api/calendar";
import { sortChartItems, ChartItem } from "./services/ChartItem";

const styles = () => createStyles({});

interface ItemTableProps extends WithStyles<typeof styles> {
  items: ChartItem[];
}

class ItemTable extends React.Component<ItemTableProps> {
  getTotal = () => this.props.items.reduce((a, b) => a + b.length, 0);

  render() {
    const { items } = this.props;

    const processedItems = items
      .sort(sortChartItems)
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
                <TableCell padding="checkbox">{toHours(it.length)}</TableCell>
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
