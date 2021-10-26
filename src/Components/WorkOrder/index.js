import React from 'react';

import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';

import DashboardCard from '../DashboardCard';
import OrderStatus from './Components/OrderStatus';
import OrderDetails from './Components/OrderDetails';
import OrderCustomerDetails from './Components/OrderCustomerDetails';

function WorkOrder() {
  return (
    <Container>
      <Grid
        container
        spacing={4}
      >
        <Grid
          container
          item
          justifyContent="space-between"
          alignItems="center"
        >
          <Typography variant="h5" component="div">
            Order #12345
          </Typography>
          <ButtonGroup variant='contained'>
            <Button>
              <EditOutlinedIcon />
            </Button>
            <Button>
              <DeleteOutlinedIcon />
            </Button>
          </ButtonGroup>
        </Grid>
        <Grid item xs={12} md={8}>
          <DashboardCard title="Order details">
            <OrderDetails />
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Customer details">
            <OrderCustomerDetails />
          </DashboardCard>
        </Grid>
        <Grid item xs>
          <DashboardCard title="Order status">
            <OrderStatus />
          </DashboardCard>
        </Grid>
      </Grid>
    </Container >
  )
}

export default WorkOrder
