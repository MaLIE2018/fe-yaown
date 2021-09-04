import React from "react";
import useStyles from "./PieChart.styles";
import Chart from "react-apexcharts";
import { Box } from "@material-ui/core";

export const PieChart: React.FC<{}> = () => {
  const classes = useStyles();

  const options = {
    options: {
      dataLabels: { enabled: false },
      legend: {
        show: false,
      },
    },
    series: [44, 55, 41, 17, 15],
    labels: ["A", "B", "C", "D", "E"],
  };

  return (
    <Box display='flex' justifyContent='center'>
      <Chart
        options={options.options}
        series={options.series}
        type='donut'
        width='75%'
      />
    </Box>
  );
};
