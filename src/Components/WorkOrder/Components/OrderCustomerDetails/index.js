import React from 'react';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const OrderCustomerDetails = () => {
  return (
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
  )
}

export default OrderCustomerDetails
