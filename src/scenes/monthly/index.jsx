import React, { useMemo } from "react";
import { Box, useTheme, Typography } from "@mui/material";
import Header from "components/Header";
import { ResponsiveBar } from "@nivo/bar";
import { useTranslation } from 'react-i18next';

const Monthly = () => {
  const { t } = useTranslation();
  const theme = useTheme();

  const [formattedData] = useMemo(() => {
    // Fake monthly data generation
    const months = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];
    const activeContractsValue = months.map(month => ({
      month,
      value: Math.floor(Math.random() * 1000000) + 500000 // Random value between 500000 and 1500000
    }));

    return [activeContractsValue];
  }, []);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={t("Value of Active Contracts")} subtitle={t("Chart of monthly forms")} />
      <Box height="75vh">
        <ResponsiveBar
          data={formattedData}
          keys={["value"]}
          indexBy="month"
          theme={{
            axis: {
              domain: {
                line: {
                  stroke: theme.palette.secondary[200],
                },
              },
              legend: {
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
              ticks: {
                line: {
                  stroke: theme.palette.secondary[200],
                  strokeWidth: 1,
                },
                text: {
                  fill: theme.palette.secondary[200],
                },
              },
            },
            grid: {
              line: {
                stroke: theme.palette.secondary[200],
                strokeWidth: 1,
                strokeDasharray: "4 4",
              },
            },
            tooltip: {
              container: {
                background: theme.palette.background.paper,
                color: theme.palette.text.primary,
                fontSize: "1rem",
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              },
            },
          }}
          margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
          axisBottom={{
            orient: "bottom",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: t("Time Interval"),
            legendOffset: 36,
            legendPosition: "middle",
          }}
          axisLeft={{
            orient: "left",
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: t("Value of Active Contracts"),
            legendOffset: -40,
            legendPosition: "middle",
            format: (value) => `${value.toLocaleString()} ریال`, // Format value with Persian currency symbol
          }}
          enableGridX={false}
          enableGridY={true}
          enableLabel={false}
          colors={{ datum: "data.color" }}
          labelTextColor={{ from: "color", modifiers: [["darker", 1.6]] }}
          isInteractive={true}
          tooltip={({ id, value, color }) => (
            <Box
              sx={{
                padding: "0.5rem",
                backgroundColor: theme.palette.background.paper,
                color: theme.palette.text.primary,
                borderRadius: "4px",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
              }}
            >
              <Typography variant="body1">{`${t("Month")}: ${id}`}</Typography>
              <Typography variant="body1">{`${t("Value")}: ${value.toLocaleString()} ریال`}</Typography>
            </Box>
          )}
        />
      </Box>
      <Box mt="2rem">

        <Typography variant="body1">{t("This plot visualizes the sum of the values of contracts (Contract-Contract Price) that remain active at each time interval, considering the span between the start and end dates. A contract is counted as active for a given interval if the project commenced (ContractCommencement-Start Date) before or during that interval and did not conclude (ContractEnd-End Date) before the interval's start. This analysis allows for tracking the fluctuation in active contracts over time, providing insights into contract management and operational workload.")}</Typography>
      </Box>
    </Box>
  );
};

export default Monthly;
