import React, { useState } from "react";
import { useTranslation } from 'react-i18next';
import {
  Box,
  Typography,
  Container,
  Grid,
  useMediaQuery,
} from "@mui/material";
import {
  LineChart,
  Line,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
} from "recharts";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";

const WasteManagementDashboard = () => {
  const { t } = useTranslation();

  // Fake data for demonstration purposes
  const generateMonthlyData = () => {
    const months = [
      "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"
    ];
    return months.map((month, index) => ({
      name: month,
      value: Math.floor(Math.random() * 20) + 10,
      credit: Math.floor(Math.random() * 10000) + 8000,
      income: Math.floor(Math.random() * 12000) + 8000,
      origin: Math.floor(Math.random() * 600) + 300,
      destination: Math.floor(Math.random() * 500) + 200,
      entering: Math.floor(Math.random() * 500) + 200,
      exiting: Math.floor(Math.random() * 400) + 100,
      treated: Math.floor(Math.random() * 300) + 100,
      landfilled: Math.floor(Math.random() * 200) + 50,
    }));
  };

  // Generate fake data
  const fakeActiveContractsData = generateMonthlyData();
  const fakeWasteReceivedData = generateMonthlyData();
  const fakeHealthAndSafetyData = generateMonthlyData();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title={t('dashboardTitle')}  />

        <Box>
          
        </Box>
      </FlexBetween>

      
        

        <Grid container spacing={4}>
          {/* Dashboard 1: CRM and Finance */}
          <Grid item xs={12} md={6} >
            <Box my={4}>
              <Typography variant="h5" gutterBottom>
                {t('crmFinanceTitle')}
              </Typography>
              <LineChart
                width={1450}
                height={300}
                data={fakeActiveContractsData}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Line
                  type="monotone"
                  dataKey="value"
                  stroke="#f57c00"
                  activeDot={{ r: 8 }}
                />
              </LineChart>
            </Box>
          </Grid>

          {/* Dashboard 2: Track Waste */}
          <Grid item xs={12} md={6} lg={6}>
            {/* To be implemented */}
          </Grid>

          {/* Dashboard 3: Waste Management Overview */}
          <Grid item xs={12} md={6} lg={6}>
            <Box my={4}>
              <Typography variant="h5" gutterBottom>
                {t('wasteOverviewTitle')}
              </Typography>
    
              <BarChart width={600} height={300} data={fakeWasteReceivedData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="origin" stackId="a" fill="#2196f3" />
                <Bar dataKey="destination" stackId="a" fill="#4caf50" />
              </BarChart>

              {/* Additional charts for Waste Management Overview */}
              {/* Add your charts here */}
            </Box>
          </Grid>

          {/* Dashboard 4: Health and Safety */}
          <Grid item xs={12} md={6} lg={6}>
            <Box my={4}>
              <Typography variant="h5" gutterBottom>
                {t('healthSafetyTitle')}
              </Typography>
    
              <BarChart width={600} height={300} data={fakeHealthAndSafetyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="name" />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="value" fill="#f44336" />
              </BarChart>
            </Box>
          </Grid>
        </Grid>
      </Box>
    

  );
};

export default WasteManagementDashboard;
