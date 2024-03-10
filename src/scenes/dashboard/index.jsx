import React from "react";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";
import {
  DownloadOutlined,
  Email,
  PointOfSale,
  PersonAdd,
  Traffic,
} from "@mui/icons-material";
import {
  Box,
  Button,
  Typography,
  useTheme,
  useMediaQuery,
} from "@mui/material";
import { DataGrid } from "@mui/x-data-grid";
import BreakdownChart from "components/BreakdownChart";
import OverviewChart from "components/OverviewChart";
import { useGetDashboardQuery } from "state/api";
import StatBox from "components/StatBox";
import { useTranslation } from 'react-i18next';

const Dashboard = () => {
  const theme = useTheme();
  const isNonMediumScreens = useMediaQuery("(min-width: 1200px)");
  const { data, isLoading } = useGetDashboardQuery();
  const { t } = useTranslation();
  
  // Fake data for demonstration purposes
  const generateFakeData = () => {
    const rows = [];
    const formGroups = [t("wastemanagement"), t("crmAndFinance"), t("healthAndSafety")];
    for (let i = 0; i < 50; i++) {
      rows.push({
        _id: i + 1,
        userId: `User ${i + 1}`,
        createdAt: new Date().toLocaleDateString(),
        products: Math.floor(Math.random() * 50),
        form_group: formGroups[Math.floor(Math.random() * formGroups.length)],
      });
    }
    return rows;
  };

  const columns = [
    {
      field: "_id",
      headerName: t("ID"),
      flex: 1,
    },
    {
      field: "userId",
      headerName: t("USER_ID"),
      flex: 1,
    },
    {
      field: "createdAt",
      headerName: t("CREATED_AT"),
      flex: 1,
    },
    {
      field: "products",
      headerName: t("NUM_FORMS"),
      flex: 0.5,
      sortable: false,
      renderCell: (params) => params.value.length,
    },
    {
      field: "form_group",
      headerName: t("FORM_GROUP"),
      flex: 1,
    },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title={t("DASHBOARD_TITLE")} subtitle={t("WELCOME_SYBAN")} />

        <Box>
          
        </Box>
      </FlexBetween>

      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(12, 1fr)"
        gridAutoRows="160px"
        gap="20px"
        sx={{
          "& > div": { gridColumn: isNonMediumScreens ? undefined : "span 12" },
        }}
        
      >
        {/* ROW 1 : Form generator */}
        <StatBox
          title={
            <Box
              bgcolor="#f0f0f0"
              padding="20px"
              borderRadius="10px"
              boxShadow="0px 0px 10px rgba(0, 0, 0, 0.1)"
              display="flex"
              flexDirection={{ xs: "column", md: "row" }}
              alignItems={{ xs: "center", md: "flex-start" }}
              justifyContent="center"
              height="120px"
              color={theme.palette.secondary[500]}
            >
              <Typography variant="h5" mt={2} sx={{ marginBottom: { xs: 2, md: 0 }} }>
                {t("FORM_GENERATOR")}
              </Typography>
              <a href="/formgenerator" style={{ textDecoration: "none", margin: { xs: "10px 0", md: "0 10px" } }}>
                <Button
                  variant="contained"
                  size="large"
                  sx={{
                    background: "linear-gradient(to right, rgb(255, 149, 0), rgb(255, 221, 0))",
                    borderRadius: "30px",
                    border: 0,
                    color: "white",
                    height: "auto",
                   
                    boxShadow: "0 3px 5px 2px rgba(255, 105, 135, .3)",
                    transition: "all 0.3s ease",
                    "&:hover": {
                      background: "linear-gradient(to right, rgb(255, 200, 0), rgb(255, 123, 0))",
                      boxShadow: "0 5px 8px 3px rgba(255, 105, 135, .3)",
                    },
                  }}
                >
                  {t("JOIN_NOW")}
                </Button>
              </a>
            </Box>
          }
          
        />
        <StatBox
          title={
            <Typography variant="h5" sx={{ color: "black" }}>
              {t("TODAYS_FORMS")}
            </Typography>
          }
          value={data && data.todayStats.totalSales}
          increase="+21%"
          description={t("SINCE_LAST_MONTH")}
          icon={
            <PointOfSale
              sx={{ color: "#FFC524", fontSize: "26px" }}
            />
          }
        />

        <Box
          gridColumn="span 8"
          gridRow="span 2"
          backgroundColor={theme.palette.background.alt}
          p="1rem"
          borderRadius="0.55rem"
        >
          <OverviewChart view="sales" isDashboard={true} />
        </Box>
        <StatBox
          title={
            <Typography variant="h5" sx={{ color: "black" }}>
              {t("MONTHLY_FORMS")}
            </Typography>
          }
          value={data && data.thisMonthStats.totalSales}
          increase="+5%"
          description={t("SINCE_LAST_MONTH")}
          icon={
            <PersonAdd
              sx={{ color: "#FFC524", fontSize: "26px" }}
            />
          }
        />
        <StatBox
          title={
            <Typography variant="h5" sx={{ color: "black" }}>
              {t("YEARLY_FORMS")}
            </Typography>
          }
          value={data && data.yearlySalesTotal}
          increase="+43%"
          description={t("SINCE_LAST_MONTH")}
          icon={
            <Traffic
              sx={{ color: "#FFC524", fontSize: "26px" }}
            />
          }
        />


        {/* ROW 2 */}
        <Box
          gridColumn="span 8"
          gridRow="span 3"
          sx={{
            "& .MuiDataGrid-root": {
              border: "none",
              borderRadius: "5rem",
            },
            "& .MuiDataGrid-cell": {
              borderBottom: "none",
            },
            "& .MuiDataGrid-columnHeaders": {
              backgroundColor: "#FFC524",
              color: theme.palette.secondary[500],
              borderBottom: "none",
            },
            "& .MuiDataGrid-virtualScroller": {
              backgroundColor: theme.palette.background.alt,
            },
            "& .MuiDataGrid-footerContainer": {
              backgroundColor: "#FFC524",
              color: theme.palette.secondary[100],
              borderTop: "none",
            },
            "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
              color: `${theme.palette.secondary[200]} !important`,
            },
          }}
        >
          <DataGrid
            
            getRowId={(row) => row._id}
            rows={generateFakeData()}
            columns={columns}
          />
        </Box>
        <Box
          gridColumn="span 4"
          gridRow="span 3"
          backgroundColor={theme.palette.background.alt}
          p="1.5rem"
          borderRadius="0.55rem"
        >
          <Typography variant="h6" sx={{ color: theme.palette.secondary[500] }}>
            {t("FORMS_CATEGORIES")}
          </Typography>
          <BreakdownChart isDashboard={true} />
          <Typography
            p="0 0.6rem"
            fontSize="0.8rem"
            marginTop={2}
            sx={{ color: theme.palette.secondary[500] }}
          >
            {t("BREAKDOWN_DESCRIPTION")}
          </Typography>
        </Box>
      </Box>
    </Box>
  );
};

export default Dashboard;
