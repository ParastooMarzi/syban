import React from "react";
import { Box } from "@mui/material";
import Header from "components/Header";
import { ResponsiveBar } from "@nivo/bar";
import { t } from "i18next";

const Breakdown = () => {
  const data = [
    {
      timeInterval: "January",
      creditIncome: Math.floor(Math.random() * 10000) + 5000, // Random credit income between 5000 and 15000
      actualIncome: Math.floor(Math.random() * 10000) + 5000, // Random actual income between 5000 and 15000
    },
    {
      timeInterval: "February",
      creditIncome: Math.floor(Math.random() * 10000) + 5000, // Random credit income between 5000 and 15000
      actualIncome: Math.floor(Math.random() * 10000) + 5000, // Random actual income between 5000 and 15000
    },
    {
      timeInterval: "March",
      creditIncome: Math.floor(Math.random() * 10000) + 5000, // Random credit income between 5000 and 15000
      actualIncome: Math.floor(Math.random() * 10000) + 5000, // Random actual income between 5000 and 15000
    },
    // Add more data for other months
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={t("Credit and Actual Income")} subtitle={t("Comparison of Financial Metrics")} />
      <Box mt="40px" height="75vh">
        <ResponsiveBar
          data={data}
          keys={["creditIncome", "actualIncome"]}
          indexBy="timeInterval"
          margin={{ top: 50, right: 50, bottom: 70, left: 60 }}
          padding={0.3}
          colors={{ scheme: 'set2' }}
          axisBottom={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
          }}
          axisLeft={{
            tickSize: 5,
            tickPadding: 5,
            tickRotation: 0,
            legend: "Amount (ریال)",
            legendPosition: "middle",
            legendOffset: -40,
          }}
          labelSkipWidth={12}
          labelSkipHeight={12}
          labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
          animate={true}
          motionStiffness={90}
          motionDamping={15}
          legends={[
            {
              dataFrom: 'keys',
              anchor: 'top-right',
              direction: 'column',
              justify: false,
              translateX: 120,
              translateY: 0,
              itemsSpacing: 2,
              itemWidth: 100,
              itemHeight: 20,
              itemDirection: 'left-to-right',
              itemOpacity: 0.85,
              symbolSize: 20,
              effects: [
                {
                  on: 'hover',
                  style: {
                    itemOpacity: 1
                  }
                }
              ]
            }
          ]}
        />
      </Box>
    </Box>
  );
};

export default Breakdown;
