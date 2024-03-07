import React, { useState } from "react";
import { Box, useTheme, Modal, TextField, Button, Backdrop, Typography } from "@mui/material";
import { useGetAdminsQuery } from "state/api";
import { DataGrid } from "@mui/x-data-grid";
import Header from "components/Header";
import CustomColumnMenu from "components/DataGridCustomColumnMenu";

const Admin = () => {
  const theme = useTheme();
  const { data, isLoading } = useGetAdminsQuery();
  const [showModal, setShowModal] = useState(true);
  const [password, setPassword] = useState("");
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const columns = [
    {
      field: "_id",
      headerName: "ID",
      flex: 1,
    },
    {
      field: "name",
      headerName: "Name",
      flex: 0.5,
    },
    {
      field: "email",
      headerName: "Email",
      flex: 1,
    },
    {
      field: "phoneNumber",
      headerName: "Phone Number",
      flex: 0.5,
      renderCell: (params) => {
        return params.value.replace(/^(\d{3})(\d{3})(\d{4})/, "($1)$2-$3");
      },
    },
    {
      field: "country",
      headerName: "Country",
      flex: 0.4,
    },
    {
      field: "occupation",
      headerName: "Occupation",
      flex: 1,
    },
    {
      field: "role",
      headerName: "Role",
      flex: 0.5,
    },
  ];

  const handlePasswordSubmit = () => {
    if (password === "5678") {
      setShowModal(false);
      setIsAuthenticated(true);
    } else {
      alert("Incorrect password. Please try again.");
    }
  };

  return (
    <>
      <Modal
  open={showModal}
  onClose={() => setShowModal(false)}
  aria-labelledby="password-modal"
  BackdropComponent={Backdrop}
  BackdropProps={{
    sx: { backdropFilter: "blur(5px)" },
    onClick: (e) => e.stopPropagation(), // Prevent closing when clicking on backdrop
  }}
>
  <Box
    sx={{
      position: "absolute",
      top: "50%",
      left: "50%",
      transform: "translate(-50%, -50%)",
      width: 400,
      bgcolor: "background.paper",
      border: "2px solid #000",
      boxShadow: 24,
      p: 4,
    }}
  >
    {/* Title */}
    <Typography variant="h5" align="center" gutterBottom>
      Are you Admin?
    </Typography>
    {/* Password Input */}
    <TextField
      label="Password"
      variant="outlined"
      type="password"
      value={password}
      onChange={(e) => setPassword(e.target.value)}
      fullWidth
      mb={2}
    />
    {/* Submit Button */}
    <Button
  variant="contained"
  onClick={handlePasswordSubmit}
  fullWidth
  sx={{
    width:"50%",
    marginTop:"1rem",
    justifyContent:"center",
    borderRadius: "0.5rem", 
    textTransform: "none", 
    backgroundColor: theme.palette.primary.main,
    color: theme.palette.primary.contrastText,
    "&:hover": {
      backgroundColor: theme.palette.primary.dark,
    },
  }}
>
  Submit
</Button>
  </Box>
</Modal>


      {isAuthenticated && (
        <Box m="1.5rem 2.5rem">
          <Header title="ADMINS" subtitle="Managing admins and list of admins" />
          <Box
            mt="40px"
            height="75vh"
            sx={{
              "& .MuiDataGrid-root": {
                border: "none",
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
                backgroundColor: theme.palette.primary.light,
              },
              "& .MuiDataGrid-footerContainer": {
                backgroundColor: "#FFC524",
                color: theme.palette.secondary[500],
                borderTop: "none",
              },
              "& .MuiDataGrid-toolbarContainer .MuiButton-text": {
                color: `${theme.palette.secondary[200]} !important`,
              },
            }}
          >
            <DataGrid
              loading={isLoading || !data}
              getRowId={(row) => row._id}
              rows={data || []}
              columns={columns}
              components={{
                ColumnMenu: CustomColumnMenu,
              }}
            />
          </Box>
        </Box>
      )}
    </>
  );
};

export default Admin;
