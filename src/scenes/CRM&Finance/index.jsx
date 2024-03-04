import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardActions, CardContent, Collapse, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import Header from 'components/Header';
import { FaEye, FaRegEdit } from 'react-icons/fa';
import { MdOutlineLibraryAdd } from "react-icons/md";
import { Link, useNavigate } from 'react-router-dom';
import Formsofx from 'formComponents';

const CRMAndFinance = () => {
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const navigate = useNavigate();
  const [forms, setForms] = useState([]);
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedFormName, setSelectedFormName] = useState('');

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('http://185.110.189.96:8000/api/version%3D1/list-forms/Waste_Management/');
        setForms(response.data);
        if (response.data && response.data.length > 0) {
          setSelectedFormName(response.data[0].name.en);
        }
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  const fetchFormDetails = async (ref) => {
    try {
      const response = await axios.get(`http://185.110.189.96:8000/api/version%3D1/forms/${ref}`);
      setSelectedForm(response.data);
      
      localStorage.setItem('selectedFormData', JSON.stringify(response.data)); // Store selected form data in localStorage
      navigate('/formsofx'); // Navigate to Formsofx page after setting the selected form data
    } catch (error) {
      console.error('Error fetching form details:', error);
    }
  };

  const CRMAndFinanceForms = forms.filter(form => form.group === "CRM_and_Finance");
  
  const handleEditClick = async (formRef) => {
    await fetchFormDetails(formRef);
    console.log(formRef)
    // Navigate to Formsofx page with selected form details
  };

  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Box m="1.5rem 2.5rem">
      <Header title="CRM AND FINANCE" subtitle="Forms of CRM & Finance" />
      
      <Box
        mt="20px"
        display="grid"
        gridTemplateColumns="repeat(4, minmax(0, 1fr))"
        justifyContent="space-between"
        rowGap="20px"
        columnGap="1.33%"
        sx={{
          "& > div": { gridColumn: isNonMobile ? undefined : "span 4" },
        }}
      >
        {CRMAndFinanceForms.length > 0 && CRMAndFinanceForms.map((form, index) => (
          <Card
            key={index}
            sx={{
              backgroundImage: "none",
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
            }}
          >
            <CardContent>
              <Typography
                sx={{ fontSize: 14 }}
                color={theme.palette.secondary[400]}
                gutterBottom
              >
                {form.name && form.name.en ? form.name.en : ""}
              </Typography>
              <Typography variant="body2">
                {form.description && form.description.en ? form.description.en : ""}
              </Typography>
              <Typography variant="body2">Reference: {form.ref}</Typography>
            </CardContent>
            <CardActions>
              <Button variant="primary" size="small" component={Link} to="/formsofx" onClick={() => handleEditClick(form.ref)}><FaRegEdit size={20} color="#FFC524"/></Button>
              <Button variant="primary" size="small"><FaEye size={20} /></Button>
              <Button variant="primary" size="small"><MdOutlineLibraryAdd size={20}/></Button>
              <Button
                variant="primary"
                size="small"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                See More
              </Button>
            </CardActions>
            <Collapse
              in={isExpanded}
              timeout="auto"
              unmountOnExit
              sx={{
                color: theme.palette.neutral[300],
              }}
            >
              <CardContent>
                <Typography>id: </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Box>
      {selectedForm && <Formsofx selectedForm={selectedForm} />}


    </Box>
  );
};

export default CRMAndFinance;
