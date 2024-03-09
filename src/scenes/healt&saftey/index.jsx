import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Box, Button, Card, CardActions, CardContent, Collapse, Typography, useMediaQuery } from '@mui/material';
import { useTheme } from '@emotion/react';
import Header from 'components/Header';
import { useTranslation } from 'react-i18next';

const Health_and_safety = () => {
  const { t } = useTranslation();
  const isNonMobile = useMediaQuery("(min-width: 1000px)");
  const theme = useTheme();
  const [forms, setForms] = useState([]);
  const [isExpanded, setIsExpanded] = useState(false);

  useEffect(() => {
    const fetchForms = async () => {
      try {
        const response = await axios.get('https://api.syban-datacloud.com/api/version%3D1/list-forms/Waste_Management/');
        setForms(response.data);
      } catch (error) {
        console.error('Error fetching forms:', error);
      }
    };

    fetchForms();
  }, []);

  const healthForms = forms.filter(form => form.group === 'Health_and_Safety');

  return (
    <Box m="1.5rem 2.5rem">
      <Header title={t('healthAndSafetyTitle')} subtitle={t('formsOfHealthAndSafety')} />

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
        {healthForms.map((form, index) => (
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
                color={theme.palette.secondary[700]}
                gutterBottom
              >
                {form.name[t.language] || form.name.en}
              </Typography>
              <Typography variant="body2">{form.description[t.language] || form.description.en}</Typography>
              <Typography variant="body2">Reference: {form.ref}</Typography>
            </CardContent>
            <CardActions>
              <Button
                variant="primary"
                size="small"
                onClick={() => setIsExpanded(!isExpanded)}
              >
                {t('seeMore')}
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
                <Typography>Supply Left: </Typography>
                <Typography>
                  Yearly Sales This Year: 
                </Typography>
                <Typography>
                  Yearly Units Sold This Year: 
                </Typography>
              </CardContent>
            </Collapse>
          </Card>
        ))}
      </Box>
    </Box>
  );
};

export default Health_and_safety;
