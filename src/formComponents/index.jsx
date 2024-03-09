import React, { useState, useEffect } from 'react';
import { 
  Box, 
  Typography, 
  TextField, 
  Checkbox, 
  FormControlLabel, 
  Button, 
  useMediaQuery, 
  useTheme, 
  Card, 
  MenuItem, 
  Radio, 
  RadioGroup, 
  FormControl, 
  FormLabel,
  Grid,
  InputLabel,
  Select,
} from '@mui/material';
import Header from 'components/Header';
import { Redirect } from 'react-router-dom';
import MyForms from 'scenes/MyForms';
import { useTranslation } from 'react-i18next';

const Formsofx = () => {
  const { t, i18n } = useTranslation();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const [filteredForms, setFilteredForms] = useState(null);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFileFieldId, setSelectedFileFieldId] = useState(null);
  const [selectedForm, setSelectedForm] = useState(null);
  const [selectedTitle, setSelectedTitle] = useState('');
  const [formData, setFormData] = useState({});
  const [submittedFormData, setSubmittedFormData] = useState(null);
  const [redirectToMyForms, setRedirectToMyForms] = useState(false);

  useEffect(() => {
    const formData = JSON.parse(localStorage.getItem('selectedFormData'));
    setSelectedForm(formData);
  }, []);

  useEffect(() => {
    if (selectedForm) {
      // Filter forms by title
      const filtered = Object.keys(selectedForm).filter(sectionKey => selectedForm[sectionKey]?.section_data?.title?.[i18n.language] === selectedTitle);
      setFilteredForms(filtered);
    }
  }, [selectedTitle, selectedForm, i18n.language]);

  const handleSubmit = () => {
    setSubmittedFormData(formData);
    localStorage.setItem('submittedForm', JSON.stringify([formData])); // Store submitted form data in localStorage as an array
    setRedirectToMyForms(true);
  };

  const handleFileChange = (e, fieldId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setSelectedFileFieldId(fieldId); // Update the selected file field ID
    }
  };

  const handleFieldChange = (fieldId, value) => {
    setFormData(prevFormData => ({
      ...prevFormData,
      [fieldId]: value
    }));
  };

  const renderFormField = (field) => {
    switch (field.field_type) {
      case 'NUMERIC POSITIVE INTEGER':
        return (
          <TextField
            key={field.inquiry[i18n.language]}
            label={field.inquiry[i18n.language]}
            type="number"
            InputProps={{
              inputProps: { min: 0, step: 1 }, // Allow only positive integers
            }}
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => handleFieldChange(field.inquiry[i18n.language], e.target.value)} // Handle value change
          />
        );
      case 'DATE':
        return (
          <TextField
            key={field.inquiry[i18n.language]}
            label={field.inquiry[i18n.language]}
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => handleFieldChange(field.inquiry[i18n.language], e.target.value)} // Handle value change
          />
        );
      case 'YES OR NO':
        return (
          <FormControl component="fieldset" key={field.inquiry[i18n.language]}>
            <FormLabel component="legend">{field.inquiry[i18n.language]}</FormLabel>
            <RadioGroup 
              row 
              aria-label={field.inquiry[i18n.language]} 
              name={field.inquiry[i18n.language]}
              defaultValue={field.defaultValue} // set default value if needed
              onChange={(e) => handleFieldChange(field.inquiry[i18n.language], e.target.value)} // Handle value change
            >
              <FormControlLabel 
                value="yes" 
                control={<Radio />} 
                label={t('Yes')} 
              />
              <FormControlLabel 
                value="no" 
                control={<Radio />} 
                label={t('No')} 
              />
            </RadioGroup>
          </FormControl>
        );
      case 'SINGLE SELECT':
        return (
          <FormControl key={field.inquiry[i18n.language]} variant="outlined" fullWidth margin="normal">
            <InputLabel>{field.inquiry[i18n.language]}</InputLabel>
            <Select
              label={field.inquiry[i18n.language]}
              value={formData[field.inquiry[i18n.language]] || ''} // Set the selected value state here
              onChange={(e) => handleFieldChange(field.inquiry[i18n.language], e.target.value)} // Handle value change
            >
              {/* Map through options to create Select options */}
              {field.options && field.options.map((option) => (
                <MenuItem key={option.id} value={option.value}>
                  {option.label}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'SMALL TEXT BOX':
      case 'NUMERIC FLOAT':
      case 'LARGE TEXT BOX':
        return (
          <TextField 
            key={field.inquiry[i18n.language]} 
            label={field.inquiry[i18n.language]} 
            variant="outlined" 
            fullWidth 
            margin="normal" 
            multiline={field.field_type === 'LARGE TEXT BOX'} 
            rows={field.field_type === 'LARGE TEXT BOX' ? 4 : 1} 
            type={field.field_type === 'NUMERIC FLOAT' ? 'number' : 'text'} 
            onChange={(e) => handleFieldChange(field.inquiry[i18n.language], e.target.value)} // Handle value change
          />
        );
      case 'CHECKBOX':
        return (
          <FormControlLabel
            key={field.inquiry[i18n.language]}
            control={<Checkbox />}
            label={field.inquiry[i18n.language]}
            onChange={(e) => handleFieldChange(field.inquiry[i18n.language], e.target.checked)} // Handle value change
          />
        );
      case 'IMAGE':
      case 'DOCUMENT':
        return (
          <div>
            <FormLabel component="legend">{field.inquiry[i18n.language]}</FormLabel>
            <input
              key={field.inquiry[i18n.language]}
              type="file"
              accept={field.field_type === 'IMAGE' ? 'image/*' : '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'}
              onChange={(e) => handleFileChange(e, field.inquiry[i18n.language])} // Pass field ID to handleFileChange
            />
            {selectedFileFieldId === field.inquiry[i18n.language] && filePreview && (
              <img src={filePreview} alt="Preview" style={{ maxWidth: '100px', maxHeight: '100px' }} />
            )}
          </div>
        );

      case 'TIME':
        return (
          <TextField
            key={field.inquiry[i18n.language]}
            label={field.inquiry[i18n.language]}
            type="time"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => handleFieldChange(field.inquiry[i18n.language], e.target.value)} // Handle value change
          />
        );
      // Add cases for other field types
      default:
        return null;
    }
  };

  if (redirectToMyForms) {
    return <MyForms submittedForm={submittedFormData} />;
  }

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={`FORMS OF ${selectedForm && selectedForm[Object.keys(selectedForm)[0]]?.section_data?.form || ""}`} />
      
      <Box display="flex" justifyContent="center">
        {/* Select input for choosing title */}
        <TextField
          select
          label={t('Select Title')}
          value={selectedTitle}
          onChange={(e) => setSelectedTitle(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        >
          {/* Map through titles to create options */}
          {selectedForm && Object.keys(selectedForm).map((sectionKey) => (
            <MenuItem key={sectionKey} value={selectedForm[sectionKey]?.section_data?.title?.[i18n.language]}>
              {selectedForm[sectionKey]?.section_data?.title?.[i18n.language]}
            </MenuItem>
          ))}
        </TextField>
      </Box>

      {filteredForms && filteredForms.map((sectionKey) => (
        <Box
          key={sectionKey}
          mt="20px"
        >
          <Card
            sx={{
              backgroundImage: "none",
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
              padding: "20px",
            }}
          >
            <Typography variant="h4">
              {selectedForm[sectionKey]?.section_data?.title?.[i18n.language] || "Title Not Available"}
            </Typography>
            <Grid container spacing={2}>
              {/* Render other form fields if fields array is not null */}
              {selectedForm[sectionKey]?.fields && selectedForm[sectionKey]?.fields.map((field) => (
                <Grid item xs={12} sm={6} key={field.inquiry[i18n.language]}>
                  {renderFormField(field)}
                </Grid>
              ))}
            </Grid>
            {/* Add more form fields as needed */}
            <Button variant="contained" color="primary" onClick={handleSubmit}>
                {t('Submit')}
              </Button>
          </Card>
        </Box>
      ))}
      {submittedFormData && <MyForms submittedForm={submittedFormData} />}
    </Box>
  );
};

export default Formsofx;
