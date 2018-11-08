import React from "react";
import {
  Calendar,
  formatMinutes,
  totalLength
} from "../../services/api/calendar";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import { Trail } from "react-spring";
import { ChartItem } from "./WeeklyChart";

interface ChartLegendProps {
  items: ChartItem[];
  onItemSelected?: (id: string) => void;
}

class ChartLegend extends React.Component<ChartLegendProps> {
  getTotal = () =>
    this.props.items
      .map(it => it.length)
      .reduce((a: number, b: number) => a + b, 0);

  render() {
    const { items, onItemSelected } = this.props;
    const selectable = onItemSelected !== null && onItemSelected !== undefined;

    const total = this.getTotal();

    const getPercentage = (v: number) => Math.round((v / total) * 100);

    return (
      <List
        dense={true}
        style={{ marginTop: 20 }}
        subheader={<ListSubheader>Total: {formatMinutes(total)}</ListSubheader>}
      >
        {items
          .filter(it => it.length > 0)
          .sort((a, b) => b.length - a.length)
          .map((c, i) => (
            <ListItem
              key={c.title}
              button={selectable}
              onClick={() => selectable && onItemSelected!(c.title)}
            >
              <ListItemIcon>
                <div
                  style={{
                    width: 20,
                    height: 20,
                    borderRadius: "50%",
                    background: c.background
                  }}
                />
              </ListItemIcon>
              <ListItemText
                primary={c.title}
                secondary={
                  getPercentage(c.length) + "% - " + formatMinutes(c.length)
                }
              />
            </ListItem>
          ))}
      </List>
    );
  }
}
export default ChartLegend;
