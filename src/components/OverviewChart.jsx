import React, { useMemo } from "react";
import { ResponsiveLine } from "@nivo/line";
import { useTheme } from "@mui/material";

const OverviewChart = ({ isDashboard = false, view }) => {
  const theme = useTheme();

  // Generate fake data
  const generateFakeData = () => {
    const monthlyData = [
      { month: "Jan", totalSales: 5000, totalUnits: 200 },
      { month: "Feb", totalSales: 6000, totalUnits: 250 },
      { month: "Mar", totalSales: 7500, totalUnits: 280 },
      { month: "Apr", totalSales: 8000, totalUnits: 300 },
      { month: "May", totalSales: 8500, totalUnits: 320 },
      { month: "Jun", totalSales: 9000, totalUnits: 350 },
      { month: "Jul", totalSales: 9500, totalUnits: 370 },
      { month: "Aug", totalSales: 10000, totalUnits: 380 },
      { month: "Sep", totalSales: 10500, totalUnits: 400 },
      { month: "Oct", totalSales: 11000, totalUnits: 420 },
      { month: "Nov", totalSales: 11500, totalUnits: 450 },
      { month: "Dec", totalSales: 12000, totalUnits: 470 },
    ];

    const totalSalesLine = {
      id: "totalSales",
      data: monthlyData.map(({ month, totalSales }) => ({ x: month, y: totalSales })),
    };

    const totalUnitsLine = {
      id: "totalUnits",
      data: monthlyData.map(({ month, totalUnits }) => ({ x: month, y: totalUnits })),
    };

    return [totalSalesLine, totalUnitsLine];
  };

  const [totalSalesLine, totalUnitsLine] = useMemo(() => generateFakeData(), []); 

  // Ensure data is not empty or undefined
  if (!totalSalesLine || !totalUnitsLine) {
    return null; // Or display a loading indicator or error message
  }

  return (
    <ResponsiveLine
      data={[view === "sales" ? totalSalesLine : totalUnitsLine]}
      theme={{
        // Your theme configuration
      }}
      margin={{ top: 20, right: 50, bottom: 50, left: 70 }}
      xScale={{ type: "point" }}
      yScale={{
        type: "linear",
        min: "auto",
        max: "auto",
        stacked: false,
        reverse: false,
      }}
      yFormat=" >-.2f"
      curve="catmullRom"
      enableArea={isDashboard}
      axisTop={null}
      axisRight={null}
      axisBottom={{
        // Your axis bottom configuration
      }}
      axisLeft={{
        // Your axis left configuration
      }}
      enableGridX={false}
      enableGridY={false}
      pointSize={10}
      pointColor={{ theme: "background" }}
      pointBorderWidth={2}
      pointBorderColor={{ from: "serieColor" }}
      pointLabelYOffset={-12}
      useMesh={true}
      legends={
        !isDashboard
          ? [
              {
                anchor: "bottom-right",
                direction: "column",
                justify: false,
                translateX: 30,
                translateY: -40,
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
            ]
          : undefined
      }
    />
  );
};

export default OverviewChart;
