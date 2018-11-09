import React from "react";
import { createStyles, withStyles, WithStyles, Theme } from "@material-ui/core";
import WeeklyChart from "./WeeklyChart";
import ChartLegend from "./ChartLegend";
import { sortChartItems, ChartItem } from "../../services/ChartItem";

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: "flex",
      padding: "0 30px"
    },
    [theme.breakpoints.down("sm")]: {
      root: {
        flexDirection: "column"
      }
    }
  });

interface PieChartViewProps extends WithStyles<typeof styles> {
  items: ChartItem[];
  onItemChange?: (id: string) => void;
}

class PieChartView extends React.Component<PieChartViewProps> {
  render() {
    const { classes, items, onItemChange } = this.props;

    return (
      <div className={classes.root}>
        <WeeklyChart items={items} onItemSelected={onItemChange} />
        <ChartLegend
          onItemSelected={onItemChange}
          items={items.slice().sort(sortChartItems)}
        />
      </div>
    );
  }
}
export default withStyles(styles)(PieChartView);
