import React from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

const OrderCustomerDetails = ({
  businessName,
  contact
}) => {
  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <BusinessOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={businessName}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <PersonOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={contact.name +" "+ contact.surname}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <LocalPhoneOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={contact.phone}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AlternateEmailOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={contact.email}
        />
      </ListItem>
    </List>
  )
}

OrderCustomerDetails.propTypes = {
  businessName: PropTypes.string.isRequired,
  contact: PropTypes.object.isRequired
}

export default OrderCustomerDetails
