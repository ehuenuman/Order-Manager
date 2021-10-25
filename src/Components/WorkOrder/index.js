import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Container from '@mui/material/Container';
import Grid from '@mui/material/Grid';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import Typography from '@mui/material/Typography';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

import DashboardCard from '../DashboardCard';
import OrderStatus from './OrderStatus';
import OrderDetails from './OrderDetails';

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
          <DashboardCard
            title="Customer details"
          >
            <List>
              <ListItem>
                <ListItemIcon>
                  <BusinessOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Business Name"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <PersonOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Customer Contact Name"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <LocalPhoneOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Customer Contact Number"
                />
              </ListItem>
              <ListItem>
                <ListItemIcon>
                  <AlternateEmailOutlinedIcon />
                </ListItemIcon>
                <ListItemText
                  primary="Customer Contact Email"
                />
              </ListItem>
            </List>
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
