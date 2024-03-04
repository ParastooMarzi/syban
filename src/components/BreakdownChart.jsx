import React from "react";
import { ResponsivePie } from "@nivo/pie";
import { Box, Typography, useTheme } from "@mui/material";

const BreakdownChart = ({ isDashboard = false }) => {
  const theme = useTheme();

  // Fake data
  const fakeData = {
    formsByCategory: {
      WasteManagement: 100,
      CRM: 150,
      Finance: 150,
      Saftey:100
    },
    yearlySalesTotal: 850,
  };

  const colors = [
    theme.palette.secondary[500],
    theme.palette.secondary[300],
    theme.palette.secondary[300],
    theme.palette.secondary[500],
  ];
  const formattedData = Object.entries(fakeData.formsByCategory).map(
    ([category, sales], i) => ({
      id: category,
      label: category,
      value: sales,
      color: colors[i],
    })
  );

  return (
    <Box
      height={isDashboard ? "310px" : "100%"}
      width={undefined}
      minHeight={isDashboard ? "100px" : undefined}
      minWidth={isDashboard ? "100px" : undefined}
      marginTop="3rem"
      position="relative"
    >
      <ResponsivePie
        data={formattedData}
        theme={{
          // Your theme settings
        }}
        // Other props...
      />
      <Box
        position="absolute"
        top="50%"
        left="50%"
        color={theme.palette.secondary[400]}
        textAlign="center"
        pointerEvents="none"
        sx={{
          transform: isDashboard
            ? "translate(-75%, -170%)"
            : "translate(-50%, -100%)",
        }}
      >
       
      </Box>
    </Box>
  );
};

export default BreakdownChart;
