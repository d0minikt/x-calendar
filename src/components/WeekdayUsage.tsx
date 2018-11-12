import React from "react";
import { VictoryChart, VictoryBar, VictoryAxis, VictoryTheme } from "victory";

interface WeekdayUsageProps {
  data: number[];
}

const weekdays = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

class WeekdayUsage extends React.Component<WeekdayUsageProps> {
  render() {
    const { data } = this.props;

    const barData: { y: number; x: string }[] = [];
    for (let i = 0; i < 7; i++) {
      let y = 0;
      if (i in data) y = Math.round((data[i] / 60) * 10) / 10;
      barData.push({ y, x: weekdays[i] });
    }

    return (
      <VictoryChart
        height={200}
        width={300}
        domainPadding={{ x: 20 }}
        theme={VictoryTheme.material}
      >
        <VictoryAxis
          dependentAxis
          standalone={false}
          style={{
            tickLabels: { fontSize: 8 },
            axisLabel: { fontSize: 10 }
          }}
        />
        <VictoryAxis
          standalone={false}
          style={{ tickLabels: { fontSize: 8 } }}
        />
        <VictoryBar data={barData} />
      </VictoryChart>
    );
  }
}

export default WeekdayUsage;
