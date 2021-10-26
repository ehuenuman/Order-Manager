import React from 'react'
import PropTypes from 'prop-types';
import { format, formatDistance } from 'date-fns';

import Collapse from '@mui/material/Collapse';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import IconButton from '@mui/material/IconButton';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import Typography from '@mui/material/Typography';

import EventOutlinedIcon from '@mui/icons-material/EventOutlined';
import ExpandLessOutlinedIcon from '@mui/icons-material/ExpandLessOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import MonetizationOnOutlinedIcon from '@mui/icons-material/MonetizationOnOutlined';
import TodayOutlinedIcon from '@mui/icons-material/TodayOutlined';

const formatDate = "dd MMM, yyyy";
const formatCurrency = (number) => (
  new Intl.NumberFormat('en-En', {
    style: 'currency', 
    currency: 'NZD',
    maximumSignificantDigits: 2
  }).format(number)
);

const OrderDetails = ({
  creationDate,
  deadline,
  description,
  fee
}) => {
  const [showFeeDetails, setShowFeeDetails] = React.useState(false);

  const handleShowFeeDeatils = () => {
    setShowFeeDetails(!showFeeDetails);
  }

  return (
    <Grid container spacing={2} mt={1}>
      <Grid item xs={12}>
        <Typography variant="body1" component="div">
          {description}
        </Typography>
      </Grid>
      <Grid
        container
        item
        spacing={2}
        justifyContent="space-evenly"
      >
        <Grid item xs={12} sm={6}>
          <List
            subheader={
              <ListSubheader component="div">
                Timeframe
              </ListSubheader>
            }
          >
            <ListItem>
              <ListItemIcon>
                <TodayOutlinedIcon aria-label="created date" />
              </ListItemIcon>
              <ListItemText
                primary={format(new Date(creationDate), formatDate)}
                secondary={formatDistance(new Date(creationDate), new Date(), { addSuffix: true })}
              />
            </ListItem>
            <ListItem>
              <ListItemIcon>
                <EventOutlinedIcon aria-label="deadline" />
              </ListItemIcon>
              <ListItemText
                primary={format(new Date(deadline), formatDate)}
                secondary={formatDistance(new Date(deadline), new Date(), { addSuffix: true })}
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
                primary={formatCurrency(fee.total)}
                secondary="Inc. GST."
              />
              <IconButton onClick={handleShowFeeDeatils}>
                {showFeeDetails ? <ExpandLessOutlinedIcon /> : <ExpandMoreOutlinedIcon />}
              </IconButton>
            </ListItem>
            <Collapse in={showFeeDetails} timeout="auto" unmountOnExit>
              <List component="div" disablePadding dense>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary="Paid"
                    secondary={formatCurrency(fee.paid) + " Inc. GST."}
                  />
                </ListItem>
                <ListItem sx={{ pl: 4 }}>
                  <ListItemText
                    primary="To paid"
                    secondary={formatCurrency(fee.toPaid) + " Inc. GST."}
                  />
                </ListItem>
              </List>
            </Collapse>
          </List>
        </Grid>
      </Grid>
    </Grid>
  )
}

OrderDetails.propTypes = {
  creationDate: PropTypes.string.isRequired,
  deadline: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  fee: PropTypes.object.isRequired
}

export default OrderDetails
