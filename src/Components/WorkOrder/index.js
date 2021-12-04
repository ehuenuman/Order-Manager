import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router';

import Chip from '@mui/material/Chip';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

import DashboardCard from '../DashboardCard';
import OrderStatus from './components/OrderStatus';
import OrderDetails from './components/OrderDetails';
import OrderCustomerDetails from './components/OrderCustomerDetails';
import { getOrderById } from '../../api/services/WorkOrder';

function WorkOrder() {
  let { orderNumber } = useParams();
  const [isLoading, setIsLoading] = useState(true);

  const [order, setOrder] = useState({});
  const [status, setStatus] = useState({});

  useEffect(() => {
    getOrderById(orderNumber).then((data) => {
      setOrder(data); //JSON.parse(JSON.stringify(data))
      setStatus(JSON.parse(JSON.stringify(data.status)));
      setIsLoading(false);
    }
    );
  }, [orderNumber]);

  if (isLoading) return "Loading...."

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
              Order #{order.number}
            </Typography>
            <div>
              {(status.stage === 'isDelivered') &&
                <Chip
                  variant="outlined"
                  color={(status.onTime) ? "success" : "error"}
                  icon={<DeliveryDiningOutlinedIcon />}
                  label="Delivered"
                  sx={{ mr: 2 }}
                />
              }
              <Chip
                variant="outlined"
                color={(status.onTime) ? "success" : "error"}
                icon={<TimerOutlinedIcon />}
                label={(status.onTime) ? "On time" : "Late"}
              />
            </div>
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
                customerId={order.customer.id}
              />
            </DashboardCard>
          </Grid>
          <Grid item xs>
            <DashboardCard title="Order status">
              <OrderStatus
                updateStatus={setStatus}
                order={order}
              />
            </DashboardCard>
          </Grid>
        </Grid>
      </Container >
  )
}

export default WorkOrder
