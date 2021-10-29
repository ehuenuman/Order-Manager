import React from 'react';
import { useParams } from 'react-router';

import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

import DashboardCard from '../DashboardCard';
import OrderStatus from './components/OrderStatus';
import OrderDetails from './components/OrderDetails';
import OrderCustomerDetails from './components/OrderCustomerDetails';

import OrdersData from '../../data/ordersData.json';
import CustomerData from '../../data/customersData.json';


const order = OrdersData[99];
const customer = CustomerData[0];

function WorkOrder() {
  let { orderNumber } = useParams();

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
            Order #{orderNumber}
          </Typography>
          <Chip 
            variant="outlined" 
            color={(order.status.onTime) ? "success" : "error"}
            icon={<TimerOutlinedIcon />} 
            label={(order.status.onTime) ? "On time" : "Late"}
          />
        </Grid>
        <Grid item xs={12} md={8}>
          <DashboardCard title="Order details">
            <OrderDetails
              creationDate={order.creationDate}
              deadline={order.deadline}
              description={order.description}
              fee={order.fee}
            />
          </DashboardCard>
        </Grid>
        <Grid item xs={12} md={4}>
          <DashboardCard title="Customer details">
            <OrderCustomerDetails
              businessName={customer.name}
              contact={customer.contact}
            />
          </DashboardCard>
        </Grid>
        <Grid item xs>
          <DashboardCard title="Order status">
            <OrderStatus
              areas={order.areas}
              stages={order.stages}
              status={order.status}
            />
          </DashboardCard>
        </Grid>
      </Grid>
    </Container >
  )
}

export default WorkOrder
