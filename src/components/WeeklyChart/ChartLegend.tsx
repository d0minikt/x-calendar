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

interface ChartLegendProps {
  calendars: Calendar[];
  total: number;
  week: number;
}

class ChartLegend extends React.Component<ChartLegendProps> {
  render() {
    const { total, calendars, week } = this.props;

    const getPercentage = (v: number) => Math.round((v / total) * 100);

    return (
      <List
        dense={true}
        style={{ marginTop: 20 }}
        subheader={<ListSubheader>Total: {formatMinutes(total)}</ListSubheader>}
      >
        <Trail
          items={calendars
            .filter(c => totalLength(c, week) > 0)
            .sort((a, b) => totalLength(b, week) - totalLength(a, week))}
          keys={(item: any) => item.id}
          from={{ transform: "translate(0,-40px) scale(0)", opacity: 0 }}
          to={{ transform: "translate(0,0px) scale(1)", opacity: 1 }}
        >
          {(c: any) => (style: any) => {
            return (
              <ListItem style={style}>
                <ListItemIcon>
                  <div
                    style={{
                      width: 20,
                      height: 20,
                      borderRadius: "50%",
                      background: c.backgroundColor
                    }}
                  />
                </ListItemIcon>
                <ListItemText
                  primary={c.summary}
                  secondary={
                    getPercentage(totalLength(c, week)) +
                    "% - " +
                    formatMinutes(totalLength(c, week))
                  }
                />
              </ListItem>
            );
          }}
        </Trail>
      </List>
    );
  }
}
export default ChartLegend;
