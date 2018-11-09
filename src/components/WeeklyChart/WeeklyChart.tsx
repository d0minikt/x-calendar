import React from "react";
import { VictoryTooltip, VictoryPie, VictoryTheme } from "victory";
import { formatMinutes } from "../../services/api/calendar";
import { ChartItem } from "../../services/ChartItem";

interface CustomLabelProps {
  datum?: any;
}

class CustomLabel extends React.Component<CustomLabelProps> {
  render() {
    return (
      <g>
        <VictoryTooltip
          {...this.props}
          text={`${this.props.datum.summary}`}
          orientation="top"
          pointerLength={0}
          flyoutStyle={{ fill: "white", stroke: "#ddd", strokeWidth: 1 }}
        />
      </g>
    );
  }
}

interface WeeklyChartProps {
  items: ChartItem[];
  onItemSelected?: (id: string) => void;
}

class WeeklyChart extends React.Component<WeeklyChartProps> {
  getTotal = () =>
    this.props.items
      .map(it => it.length)
      .reduce((a: number, b: number) => a + b, 0);

  render() {
    const { items } = this.props;

    return (
      <div
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flex: "1 0 auto",
          cursor: "pointer"
        }}
      >
        <VictoryPie
          animate={{ duration: 500, easing: "circle" }}
          theme={VictoryTheme.material}
          style={{
            data: {
              fillOpacity: 1,
              stroke: "#fff",
              strokeWidth: 0.5
            },
            labels: {
              fontSize: 10
            }
          }}
          labels={d => d.summary}
          labelComponent={<CustomLabel />}
          colorScale={items.filter(c => c.length > 0).map(c => c.background)}
          data={items.filter(it => it.length > 0).map(it => {
            return {
              title: it.title,
              y: it.length,
              label: formatMinutes(it.length)
            };
          })}
          events={[
            {
              target: "data",
              eventHandlers: {
                onClick: () => {
                  return [
                    {
                      target: "data",
                      mutation: props => {
                        const { title } = props.datum;
                        if (this.props.onItemSelected !== undefined)
                          this.props.onItemSelected(title);
                        return null;
                      }
                    }
                  ];
                }
              }
            }
          ]}
        />
      </div>
    );
  }
}
export default WeeklyChart;
