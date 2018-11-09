import React from "react";
import { formatMinutes } from "../../services/api/calendar";
import {
  List,
  ListSubheader,
  ListItem,
  ListItemIcon,
  ListItemText
} from "@material-ui/core";
import ColorDot from "../ColorDot";
import { ChartItem } from "../../services/ChartItem";

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
        {items.filter(it => it.length > 0).map((c, i) => (
          <ListItem
            key={c.title}
            button={selectable}
            onClick={() => selectable && onItemSelected!(c.title)}
          >
            <ListItemIcon>
              <ColorDot color={c.background} />
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
