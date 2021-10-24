import React from 'react';
import Button from '@mui/material/Button';
import ButtonGroup from '@mui/material/ButtonGroup';
import Collapse from '@mui/material/Collapse';
import Container from '@mui/material/Container';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined';
import EditOutlinedIcon from '@mui/icons-material/EditOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

import DashboardCard from '../DashboardCard';
import OrderStatus from './Components/OrderStatus';

function WorkOrder() {
  const [showFeeDetails, setShowFeeDetails] = React.useState(false);

  const handleShowFeeDeatils = () => {
    setShowFeeDetails(!showFeeDetails);
  }


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
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <Typography variant="h6" component="div">
                  Description
                </Typography>
                <Typography variant="body1" component="div">
                  Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempora commodi architecto, fugit perferendis inventore ipsam aspernatur voluptatibus! Eaque impedit eum consequuntur totam? Alias beatae ex animi accusantium quod sed ipsum!
                </Typography>
              </Grid>
              <Grid
                container
                spacing={2}
                justifyContent="space-evenly"
              >
                <Grid item xs={12} sm={6}>
                  <List
                    subheader={
                      <ListSubheader component="div">
                        Deadline
                      </ListSubheader>
                    }
                  >
                    <ListItem>
                      <ListItemIcon>
                        <CalendarTodayOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="October 30th, 20201"
                        secondary="6 days to deadline"
                      />
                    </ListItem>
                  </List>
                </Grid>
                <Divider orientation="vertical" variant="middle" flexItem />
                <Grid item xs={12} sm={5}>
                  <List
                    subheader={
                      <ListSubheader component="div">
                        Fee details
                      </ListSubheader>
                    }
                  >
                    <ListItem>
                      <ListItemIcon>
                        <MonetizationOnOutlinedIcon />
                      </ListItemIcon>
                      <ListItemText
                        primary="190 NZD"
                        secondary="Inc. GST."
                      />
                      <IconButton onClick={handleShowFeeDeatils}>
                        {showFeeDetails ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
                      </IconButton>
                    </ListItem>
                    <Collapse in={showFeeDetails} timeout="auto" unmountOnExit>
                      <List component="div" disablePadding>
                        <ListItem sx={{ pl: 4 }}>
                          <ListItemText
                            primary="Paid"
                            secondary="$ 100 NZD Inc. GST."
                          />
                        </ListItem>
                        <ListItem sx={{ pl: 4 }}>
                          <ListItemText
                            primary="To paid"
                            secondary="$ 90 NZD Inc. GST."
                          />
                        </ListItem>
                      </List>
                    </Collapse>
                  </List>
                </Grid>
              </Grid>
            </Grid>
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
