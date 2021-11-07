import React from 'react';
import { CardContent, Grid, Typography } from '@mui/material';
import TextField from './FormUI/TextField';
import Autocomplete from './FormUI/Autocomplete';
import { getCustomers } from '../../../api/services/Customer';

function CustomerDetailsForm() {

  const [customers, setCustomers] = React.useState([]);
  React.useEffect(() => {
    getCustomers().then((data) => {
      setCustomers(data);
    });
  }, []);

  return (
    <CardContent>
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <Grid container item spacing={2}>
            <Grid item xs={12} md={8}>
              <Autocomplete
                name="customerName"
                label="Name Business or Person"
                customers={customers}
              />
              <TextField
                name="customerId"
                type="hidden"
                sx={{ display: 'none' }}
              />
            </Grid>
            <Grid item xs={12} md={4}>
              <TextField
                name="customerIdDocument"
                label="Customer ID Document"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container item spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" align="left">
                Contact details
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="contactName"
                label="Name"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="contactSurname"
                label="Surname"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="contactPhone"
                label="Contact Number"
              />
            </Grid>
            <Grid item xs={12} md={6}>
              <TextField
                name="contactEmail"
                label="Email"
                type="email"
              />
            </Grid>
          </Grid>
        </Grid>

        <Grid item xs={12}>
          <Grid container item spacing={2}>
            <Grid item xs={12}>
              <Typography variant="h6" align="left">
                Customer Address
              </Typography>
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                name="customerAddress"
                label="Address"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                name="customerSuburb"
                label="Suburb"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                name="customerCity"
                label="Town/City"
              />
            </Grid>
            <Grid item xs={12} md={6} lg={3}>
              <TextField
                name="customerPostalCode"
                label="Postal Code"
              />
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </CardContent>
  )
}

export default CustomerDetailsForm;
