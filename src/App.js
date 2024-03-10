import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Wastemanagement from "scenes/watemanagement";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Home from "./homepage/home"
import HealthAndSafety  from "scenes/healt&saftey";
import CRMAndFinance from "scenes/CRM&Finance";
import Formsofx from "formComponents";
import FormGenerator from "scenes/formGenerator";
import MyForms from "scenes/MyForms";
import WasteManagementDashboard from "scenes/wastemanagementDashboard";


function App() {
  const mode = useSelector((state) => state.global.mode);


  // Create the main theme based on the selected mode
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);

  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes>
            <Route path="/home" element={<Home />} />
            <Route path="/" element={<Navigate to="/home" replace />} />
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wastemanagement" element={<Wastemanagement/>}/>
              <Route path="/health_and_safety" element={<HealthAndSafety/>}/>
              <Route path="/formsofx" element={<Formsofx/>}/>
              <Route path="/formgenerator" element={<FormGenerator/>}/>
              <Route path="crm_and_finance" element={<CRMAndFinance/>}/>
              <Route path="/myforms" element={<MyForms />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/wastemanagementdashboard" element={<WasteManagementDashboard />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
