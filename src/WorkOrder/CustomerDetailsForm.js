import React from 'react';
import {CardContent, Grid, TextField, Typography} from '@mui/material';



function CustomerDetailsForm() {
  return (
      <CardContent>
        <Typography variant="h4" gutterBottom>
          Customer Details
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Grid container item spacing={2}>
              <Grid item xs={12} md={8}>
                <TextField
                  id="customerName"
                  label="Name Business or Person"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={4}>
                <TextField
                  id="customerIdDocument"
                  label="Customer ID Document"
                  fullWidth
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
                  id="contactName"
                  label="Name"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="contactSurname"
                  label="Surname"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="contactPhone"
                  label="Contact Number"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6}>
                <TextField
                  id="contactEmail"
                  label="Email"
                  type="email"
                  fullWidth
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
                  id="address"
                  label="First Line"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  id="suburbAddress"
                  label="Suburb"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  id="cityAddress"
                  label="Town/City"
                  fullWidth
                />
              </Grid>
              <Grid item xs={12} md={6} lg={3}>
                <TextField
                  id="postalCode"
                  label="Postal Code"
                  fullWidth
                />
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
  )
}

export default CustomerDetailsForm;
