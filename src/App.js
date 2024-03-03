import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { themeSettings } from "theme";
import Layout from "scenes/layout";
import Dashboard from "scenes/dashboard";
import Wastemanagement from "scenes/watemanagement";
import Transactions from "scenes/transactions";
import Geography from "scenes/geography";
import Overview from "scenes/overview";
import Daily from "scenes/daily";
import Monthly from "scenes/monthly";
import Breakdown from "scenes/breakdown";
import Admin from "scenes/admin";
import Performance from "scenes/performance";
import Home from "./homepage/home"
import HealthAndSafety  from "scenes/healt&saftey";
import CRMAndFinance from "scenes/CRM&Finance";
import Formsofx from "formComponents";
import FormGenerator from "scenes/formGenerator";


function App() {
  const mode = useSelector((state) => state.global.mode);
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);
  return (
    <div className="app">
      <BrowserRouter>
        <ThemeProvider theme={theme}>
          <CssBaseline />
          <Routes><Route path="/home" element={<Home />} />
          <Route path="/" element={<Navigate to="/home" replace />} />
          
            <Route element={<Layout />}>
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/wastemanagement" element={<Wastemanagement/>}/>
              <Route path="/health_and_safety" element={<HealthAndSafety/>}/>
              <Route path="/formsofx" element={<Formsofx/>}/>
              <Route path="/formgenerator" element={<FormGenerator/>}/>
              <Route path="crm_and_finance" element={<CRMAndFinance/>}/>
              <Route path="/transactions" element={<Transactions />} />
              <Route path="/geography" element={<Geography />} />
              <Route path="/overview" element={<Overview />} />
              <Route path="/daily" element={<Daily />} />
              <Route path="/monthly" element={<Monthly />} />
              <Route path="/breakdown" element={<Breakdown />} />
              <Route path="/admin" element={<Admin />} />
              <Route path="/performance" element={<Performance />} />
            </Route>
          </Routes>
        </ThemeProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
