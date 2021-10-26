import React from 'react';
import { useParams } from 'react-router';

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

import OrdersData from '../../Data/ordersData.json';


const order = OrdersData[90];

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
            <OrderCustomerDetails />
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
