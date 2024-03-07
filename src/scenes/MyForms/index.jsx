import React, { useEffect, useState } from 'react';
import { 
  Box, 
  Typography, 
  Button,
  Modal,
  TextField,
} from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import CustomColumnMenu from 'components/DataGridCustomColumnMenu';

const MyForms = () => {
  const [submittedFormData, setSubmittedFormData] = useState([]);
  const [selectedRow, setSelectedRow] = useState(null);
  const [deleteModalOpen, setDeleteModalOpen] = useState(false);
  const [finalizeModalOpen, setFinalizeModalOpen] = useState(false);
  const [approverName, setApproverName] = useState('');

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem('submittedForm')) || [];
    const formattedData = formData.map((row, index) => ({
      ...row,
      id: index + 1,
    }));
    setSubmittedFormData(formattedData);
  }, []);

  const handleDeleteRow = () => {
    if (selectedRow) {
      const updatedData = submittedFormData.filter(row => row.id !== selectedRow.id);
      setSubmittedFormData(updatedData);
      setDeleteModalOpen(false);
    }
  };

  const handleFinalize = () => {
    setApproverName(''); // Clear input field
    setFinalizeModalOpen(true);
  };

  const handleApproverNameChange = (e) => {
    setApproverName(e.target.value);
  };

  const handleApprove = () => {

    setFinalizeModalOpen(false);
  };

  const columns = [
    { field: 'id', headerName: 'ID', flex: 0.5 },
    { field: 'ref', headerName: 'Form Group', flex: 1 },
    { field: 'name', headerName: 'Form Title', flex: 0.5 },
    { 
      field: 'deleteForm', 
      headerName: 'Delete Form', 
      flex: 0.5,
      renderCell: (params) => (
        <Button variant="outlined" color="error" onClick={() => {
          setSelectedRow(params.row);
          setDeleteModalOpen(true);
        }}>
          Delete
        </Button>
      ),
    },
    { 
      field: 'finalize', 
      headerName: 'Finalize', 
      flex: 0.4,
      renderCell: () => (
        <Button variant="contained" color="primary" onClick={handleFinalize}>
          Finalize
        </Button>
      ),
    },
    { field: 'role', headerName: 'Role', flex: 0.5 },
  ];

  return (
    <Box m="1.5rem 2.5rem">
      <Box mt="40px" height="75vh">
        <DataGrid
          loading={!submittedFormData}
          rows={submittedFormData}
          columns={columns}
          components={{ ColumnMenu: CustomColumnMenu }}
        />
      </Box>

      <Modal
        open={deleteModalOpen}
        onClose={() => setDeleteModalOpen(false)}
        aria-labelledby="delete-form-modal"
        aria-describedby="delete-form-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography id="delete-form-modal-description" variant="h6" gutterBottom>
            Are you sure you want to delete this form?
          </Typography>
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="outlined" onClick={() => setDeleteModalOpen(false)}>
              No
            </Button>
            <Button variant="contained" color="error" onClick={handleDeleteRow} sx={{ ml: 2 }}>
              Yes
            </Button>
          </Box>
        </Box>
      </Modal>

      <Modal
        open={finalizeModalOpen}
        onClose={() => setFinalizeModalOpen(false)}
        aria-labelledby="finalize-form-modal"
        aria-describedby="finalize-form-modal-description"
      >
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            bgcolor: 'background.paper',
            boxShadow: 24,
            p: 4,
            width: 400,
          }}
        >
          <Typography id="finalize-form-modal-description" variant="h6" gutterBottom>
            Enter Approver Name
          </Typography>
          <TextField
            label="Approver Name"
            variant="outlined"
            value={approverName}
            onChange={handleApproverNameChange}
            fullWidth
            autoFocus
          />
          <Box display="flex" justifyContent="flex-end" mt={2}>
            <Button variant="outlined" onClick={() => setFinalizeModalOpen(false)}>
              Cancel
            </Button>
            <Button variant="contained" color="primary" onClick={handleApprove} sx={{ ml: 2 }}>
              Approve
            </Button>
          </Box>
        </Box>
      </Modal>
    </Box>
  );
};

export default MyForms;
