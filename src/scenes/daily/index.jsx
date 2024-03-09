import React, { useMemo, useState } from "react";
import { Box, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";

const Daily = () => {
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    const totalSalesLine = {
      id: "Total Sales",
      color: theme.palette.primary.main,
      data: [],
    };
    const totalUnitsLine = {
      id: "Total Units",
      color: theme.palette.secondary.main,
      data: [],
    };
    const averagePriceLine = {
      id: "Average Price",
      color: theme.palette.info.main,
      data: [],
    };

    // Generate fake data
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const formattedDate = date.toISOString().slice(0, 10);
      const totalSales = Math.floor(Math.random() * 500) + 2000; // Random number between 2000 and 2500
      const totalUnits = Math.floor(Math.random() * 100) + 500; // Random number between 500 and 600
      const averagePrice = parseFloat((totalSales / totalUnits).toFixed(2)); // Calculate average price

      totalSalesLine.data.push({ x: formattedDate, y: totalSales });
      totalUnitsLine.data.push({ x: formattedDate, y: totalUnits });
      averagePriceLine.data.push({ x: formattedDate, y: averagePrice });
    }

    const formattedData = [totalSalesLine, totalUnitsLine, averagePriceLine];
    return [formattedData];
  }, [startDate, endDate, theme.palette.primary.main, theme.palette.secondary.main, theme.palette.info.main]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="DAILY CHARTS" subtitle="Chart of daily forms" />
      <Box height="75vh">
        <Box display="flex" justifyContent="flex-end">
          <Box>
            <DatePicker
              selected={startDate}
              onChange={(date) => setStartDate(date)}
              selectsStart
              startDate={startDate}
              endDate={endDate}
            />
          </Box>
          <Box>
            <DatePicker
              selected={endDate}
              onChange={(date) => setEndDate(date)}
              selectsEnd
              startDate={startDate}
              endDate={endDate}
              minDate={startDate}
            />
          </Box>
        </Box>

        <ResponsiveLine
          data={formattedData}
          theme={{
            background: theme.palette.background.paper,
            textColor: theme.palette.text.primary,
            grid: {
              line: {
                stroke: theme.palette.divider,
              },
            },
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.divider,
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.divider,
                },
                text: {
                  fill: theme.palette.text.primary,
                },
              },
              legend: {
                text: {
                  fill: theme.palette.text.primary,
                },
              },
            },
            legends: {
              text: {
                fill: theme.palette.text.primary,
              },
            },
            tooltip: {
              container: {
                background: theme.palette.background.paper,
              },
            },
          }}
          margin={{ top: 50, right: 110, bottom: 70, left: 60 }}
          xScale={{ type: "point" }}
          yScale={{
            type: "linear",
            min: "auto",
            max: "auto",
            stacked: false,
            reverse: false,
          }}
          yFormat=" >-.2f"
          curve="linear"
          axisTop={null}
          axisRight={null}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 90,
            legend: "Date",
            legendOffset: 60,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Value",
            legendOffset: -50,
            legendPosition: "middle",
          }}
          enableGridX={false}
          enableGridY={false}
          pointSize={10}
          pointColor={{ theme: "background" }}
          pointBorderWidth={2}
          pointBorderColor={{ from: "serieColor" }}
          pointLabelYOffset={-12}
          useMesh={true}
          legends={[
            {
              anchor: "top-right",
              direction: "column",
              justify: false,
              translateX: 100,
              translateY: 0,
              itemsSpacing: 0,
              itemDirection: "left-to-right",
              itemWidth: 80,
              itemHeight: 20,
              itemOpacity: 0.75,
              symbolSize: 12,
              symbolShape: "circle",
              symbolBorderColor: "rgba(0, 0, 0, .5)",
              effects: [
                {
                  on: "hover",
                  style: {
                    itemBackground: "rgba(0, 0, 0, .03)",
                    itemOpacity: 1,
                  },
                },
              ],
            },
          ]}
        />
      </Box>
    </Box>
  );
};

export default Daily;
