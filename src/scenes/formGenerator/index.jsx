import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { 
  Box, 
  Typography, 
  TextField, 
  Checkbox, 
  FormControlLabel, 
  Button, 
  FormControl, 
  FormLabel,
  Radio,
  RadioGroup,
  MenuItem,
  Select,
  InputLabel,
  styled,
  Card,
  Grid
} from '@mui/material';
import Header from 'components/Header';
import FlexBetween from 'components/FlexBetween';
import { useTheme } from '@emotion/react';
import axios from 'axios';

const FormFieldWrapper = styled(Box)(({ theme }) => ({
  marginBottom: theme.spacing(2),
}));

const SubmitButton = styled(Button)(({ theme }) => ({
  marginTop: theme.spacing(2),
}));

const FormGenerator = () => {
  const { t, i18n } = useTranslation();
  const [formTitle, setFormTitle] = useState('');
  const [formFields, setFormFields] = useState([]);
  const [filePreview, setFilePreview] = useState(null);
  const [selectedFileFieldId, setSelectedFileFieldId] = useState(null);
  const [previewForm, setPreviewForm] = useState(null);

  const handleAddField = (type) => {
    const newField = { type, label: '', required: false, value: '', values: [] };
    setFormFields([...formFields, newField]);
  };

  const handleRemoveField = (index) => {
    const updatedFormFields = formFields.filter((_, i) => i !== index);
    setFormFields(updatedFormFields);
  };

  const handleChangeFieldLabel = (index, value) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index].label = value;
    setFormFields(updatedFormFields);
  };

  const handleChangeFieldValue = (fieldIndex, valueIndex, value) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[fieldIndex].values[valueIndex] = value;
    setFormFields(updatedFormFields);
  };

  const handleChangeFieldRequired = (index, value) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index].required = value;
    setFormFields(updatedFormFields);
  };

  const handleFileChange = (e, fieldId) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setFilePreview(e.target.result);
      };
      reader.readAsDataURL(file);
      setSelectedFileFieldId(fieldId);
    }
  };

  const handleAddFieldValue = (index) => {
    const updatedFormFields = [...formFields];
    updatedFormFields[index].values.push('');
    setFormFields(updatedFormFields);
  };

  const getFieldComponent = (field) => {
    switch (field.type) {
      case 'NUMERIC POSITIVE INTEGER':
        return (
          <TextField
            type="number"
            label={field.label}
            required={field.required}
            fullWidth
            variant="outlined"
          />
        );
      case 'YES OR NO':
        return (
          <FormControl component="fieldset">
            <FormLabel component="legend">{field.label}</FormLabel>
            <RadioGroup row>
              <FormControlLabel value="yes" control={<Radio />} label="Yes" />
              <FormControlLabel value="no" control={<Radio />} label="No" />
            </RadioGroup>
          </FormControl>
        );
      case 'SINGLE SELECT':
        return (
          <FormControl variant="outlined" fullWidth>
            <InputLabel>{field.label}</InputLabel>
            <Select required={field.required}>
              {field.values.map((value, index) => (
                <MenuItem key={index} value={value}>{value}</MenuItem>
              ))}
            </Select>
          </FormControl>
        );
      case 'SMALL TEXT BOX':
      case 'NUMERIC FLOAT':
      case 'LARGE TEXT BOX':
        return (
          <TextField
            type={field.type === 'NUMERIC FLOAT' ? 'number' : 'text'}
            label={field.label}
            required={field.required}
            fullWidth
            multiline={field.type === 'LARGE TEXT BOX'}
            rows={field.type === 'LARGE TEXT BOX' ? 4 : 1}
            variant="outlined"
          />
        );
      case 'CHECKBOX':
        return (
          <FormControlLabel
            control={<Checkbox />}
            label={field.label}
          />
        );
      case 'IMAGE':
      case 'DOCUMENT':
        return (
          <input type="file" accept={field.type === 'IMAGE' ? 'image/*' : '.pdf,.doc,.docx,.xls,.xlsx,.ppt,.pptx'} />
        );
      case 'DATE':
        return (
          <TextField
            type="date"
            InputLabelProps={{
              shrink: true,
            }}
            variant="outlined"
            fullWidth
            margin="normal"
            onChange={(e) => console.log(e.target.value)} // Handle value change
          />
        );

      case 'TIME':
        return (
          <TextField
            type="time"
            label={field.label}
            required={field.required}
            fullWidth
            variant="outlined"
          />
        );
      default:
        return null;
    }
  };

  const theme = useTheme();

  const handleApproveClick = async () => {
    try {
      const formId = 'd05b8d22-d8c4-11ee-b5ef-0242ac170005'; // Your form ID
  
      const response = await axios.put('https://api.syban-datacloud.com/api/version=1/approve/', {
        form_id: formId // Add form_id to the request body
      }, {
        headers: {
          Authorization: 'Token 145782a20222954d49ba7fc3022bcf28b2500ea6', // Your authorization token
        },
      });
  
      // Handle response if needed
      console.log(response.data);
    } catch (error) {
      // Handle error
      console.error('Error:', error);
    }
  };
{/*
  const handleFinalizeClick = async () => {
    try {
      
    }
  }
  
*/}
  
  const handlePreviewForm = () => {
    const preview = (
      <div>
        <Typography variant="h4">{formTitle}</Typography>
        <form>
          {formFields.map((field, index) => (
            <FormFieldWrapper key={index}>
              <Typography variant="h5"></Typography>
              {getFieldComponent(field)}
            </FormFieldWrapper>
          ))}
          <div style={{ display: 'flex', justifyContent: 'space-between' }}>
            <SubmitButton variant="contained" color="primary" type="submit">
              {t("finalize")}
            </SubmitButton>
          </div>
        </form>
      </div>
    );
    setPreviewForm(preview);
  };

  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title={t('formGeneratorTitle')} subtitle={t('createYourOwnForm')} />
        <FormControl variant="outlined" sx={{ minWidth: 120 }}>
          <Select
            value=""
            onChange={(e) => handleAddField(e.target.value)}
            displayEmpty
          >
            <MenuItem value="" disabled>
              {t('addField')}
            </MenuItem>
            {/* Translation for menu items */}
            <MenuItem value="NUMERIC POSITIVE INTEGER">{t('numericPositiveInteger')}</MenuItem>
            <MenuItem value="DATE">{t('date')}</MenuItem>
            <MenuItem value="YES OR NO">{t('yesOrNo')}</MenuItem>
            <MenuItem value="SINGLE SELECT">{t('singleSelect')}</MenuItem>
            <MenuItem value="SMALL TEXT BOX">{t('smallTextBox')}</MenuItem>
            <MenuItem value="NUMERIC FLOAT">{t('numericFloat')}</MenuItem>
            <MenuItem value="LARGE TEXT BOX">{t('largeTextBox')}</MenuItem>
            <MenuItem value="CHECKBOX">{t('checkbox')}</MenuItem>
            <MenuItem value="IMAGE">{t('image')}</MenuItem>
            <MenuItem value="DOCUMENT">{t('document')}</MenuItem>
            <MenuItem value="TIME">{t('time')}</MenuItem>
          </Select>
        </FormControl>
      </FlexBetween>
      <Box mt={2}>
        <TextField
          label={t("formTitleLabel")}
          value={formTitle}
          onChange={(e) => setFormTitle(e.target.value)}
          variant="outlined"
          fullWidth
          margin="normal"
        />
      </Box>
      <Box mt={3}>
        {formFields.map((field, index) => (
          <Box key={index} display="flex-between" alignItems="center" mt={3}>
            <TextField
              label={t('fieldLabel')}
              value={field.label}
              onChange={(e) => handleChangeFieldLabel(index, e.target.value)}
              variant="outlined"
              fullWidth
              margin="normal"
            />
            {['SINGLE SELECT'].includes(field.type) && (
              <>
                {field.values.map((value, valueIndex) => (
                  <TextField
                    key={valueIndex}
                    label={t("value")}
                    value={value}
                    onChange={(e) => handleChangeFieldValue(index, valueIndex, e.target.value)}
                    variant="outlined"
                    fullWidth
                    margin="normal"
                  />
                ))}
                <Button
                  variant="primary" color="contained" 
                  onClick={() => handleAddFieldValue(index)}
                >
                  {t("addValue")}
                </Button>
              </>
            )}
            <FormControlLabel
              control={
                <Checkbox
                  checked={field.required}
                  onChange={(e) => handleChangeFieldRequired(index, e.target.checked)}
                />
              }
              label={t("required")}
            />
            <Button variant="outlined" color="error" onClick={() => handleRemoveField(index)}>
              {t("remove")}
            </Button>
          </Box>
        ))}
      </Box>
      <Box mt={3}>
        <Button variant="contained" color="primary" onClick={handlePreviewForm}>
          {t('previewForm')}
        </Button>
      </Box>
      {previewForm && (
        <Box mt="20px">
          <Card
            sx={{
              backgroundImage: "none",
              backgroundColor: theme.palette.background.alt,
              borderRadius: "0.55rem",
              padding: "20px",
            }}
          >
            {previewForm}
          </Card>
        </Box>
      )}
    </Box>
  );
};

export default FormGenerator;
