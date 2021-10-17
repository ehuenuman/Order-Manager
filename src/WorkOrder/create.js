import React from 'react';
import {Card, CardContent, Container, FormControl, Grid, Input, InputLabel, Typography } from '@mui/material';

function NewWorkOrderForm() {
  return (
    <Container>
      <form>
        <Card>
          <CardContent>
            <Typography variant="h4" gutterBottom>
              Customer Details
            </Typography>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Grid container item spacing={2}>
                  <Grid item xs={12} md={8}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="customerName">Name Business or Person</InputLabel>
                      <Input
                        id="customerName"
                        name="customerName"
                        type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={4}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="customerIdDocument">Customer ID Document</InputLabel>
                      <Input
                        id="customerIdDocument"
                        name="customerIdDocument"
                        type="text" />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container item spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6">
                      Contact details
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="contactName">Name</InputLabel>
                      <Input
                        id="contactName"
                        name="contactName"
                        type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="contactSurname">Surname</InputLabel>
                      <Input
                        id="contactSurname"
                        name="contactSurname"
                        type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="contactPhone">Phone</InputLabel>
                      <Input htmlFor="contactPhone"
                        id="contactPhone"
                        name="contactPhone"
                        type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="contactEmail">Email</InputLabel>
                      <Input
                        id="email"
                        name="email"
                        type="email" />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>

              <Grid item xs={12}>
                <Grid container item spacing={2}>
                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Customer Address
                    </Typography>
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="firstLine">First Line</InputLabel>
                      <Input
                        id="firstLine"
                        name="firstLine"
                        type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="suburb">Suburb</InputLabel>
                      <Input
                        id="suburb"
                        name="suburb"
                        type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="city">Town/City</InputLabel>
                      <Input
                        id="city"
                        name="city"
                        type="text" />
                    </FormControl>
                  </Grid>
                  <Grid item xs={12} md={6} lg={3}>
                    <FormControl fullWidth>
                      <InputLabel htmlFor="postalCode">Postal Code</InputLabel>
                      <Input
                        id="postalCode"
                        name="postalCode"
                        type="text" />
                    </FormControl>
                  </Grid>
                </Grid>
              </Grid>



            </Grid>
          </CardContent>
        </Card>




        <button type="submit">Submit</button>
      </form>
    </Container>
  );
}

export default NewWorkOrderForm;