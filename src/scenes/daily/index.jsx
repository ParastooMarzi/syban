import React, { useMemo, useState } from "react";
import { Box, Typography, useTheme } from "@mui/material";
import Header from "components/Header";
import { ResponsiveLine } from "@nivo/line";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useTranslation } from 'react-i18next';

const Daily = () => {
  const { t, i18n } = useTranslation();
  const [startDate, setStartDate] = useState(new Date("2021-02-01"));
  const [endDate, setEndDate] = useState(new Date("2021-03-01"));
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    const activeContractsLine = {
      id: t("Number of Active Contracts"),
      color: theme.palette.primary.main,
      data: [],
    };

    // Generate fake data
    for (let date = new Date(startDate); date <= endDate; date.setDate(date.getDate() + 1)) {
      const formattedDate = date.toISOString().slice(0, 10);
      const numActiveContracts = Math.floor(Math.random() * 50) + 50; // Random number between 50 and 100

      activeContractsLine.data.push({ x: formattedDate, y: numActiveContracts });
    }

    const formattedData = [activeContractsLine];
    return [formattedData];
  }, [startDate, endDate, theme.palette.primary.main, t]);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={t("Number of Active Contracts")} subtitle={t("Chart of daily forms")} />
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
          margin={{ top: 50, right: 110, bottom: 70, left: 60 }}
          xScale={{ type: "time", format: "%Y-%m-%d" }}
          yScale={{ type: "linear", min: 0, max: "auto", stacked: false, reverse: false }}
          xFormat="time:%Y-%m-%d"
          axisBottom={{
            format: "%b %d",
            tickValues: "every 1 day",
            legend: t("Time Interval"),
            legendOffset: 60,
            legendPosition: "middle",
          }}
          axisLeft={{
            legend: t("Number of Active Contracts"),
            legendOffset: -50,
            legendPosition: "middle",
          }}
          curve="linear"
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
      <Box mt="2rem">
        
        <Typography variant="body1">{t("This plot visualizes the number of contracts that remain active at each time interval, considering the span between the start and end dates. A contract is counted as active for a given interval if the project commenced (ContractCommencement-Start Date) before or during that interval and did not conclude (ContractEnd-End Date) before the interval's start. This analysis allows for tracking the fluctuation in active contracts over time, providing insights into contract management and operational workload.")}</Typography>
      </Box>
    </Box>
  );
};

export default Daily;
