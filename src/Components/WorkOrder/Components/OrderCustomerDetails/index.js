import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import AlternateEmailOutlinedIcon from '@mui/icons-material/AlternateEmailOutlined';
import BusinessOutlinedIcon from '@mui/icons-material/BusinessOutlined';
import LocalPhoneOutlinedIcon from '@mui/icons-material/LocalPhoneOutlined';
import PersonOutlinedIcon from '@mui/icons-material/PersonOutlined';

import { getCustomerById } from '../../../../api/services/Customer';

const OrderCustomerDetails = ({
  custmr,
}) => {
  const [isLoading, setIsLoading] = useState(true);

  const [customer, setCustomer] = useState({});
  useEffect(() => {
    getCustomerById(custmr.id).then((data) => {
      setCustomer(data);
      setIsLoading(false);
    }
    );
  }, [])

  return (
    <List>
      <ListItem>
        <ListItemIcon>
          <BusinessOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={!isLoading && customer.name}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <PersonOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={!isLoading && (customer.contact.name + " " + customer.contact.surname)}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <LocalPhoneOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={!isLoading && customer.contact.phone}
        />
      </ListItem>
      <ListItem>
        <ListItemIcon>
          <AlternateEmailOutlinedIcon />
        </ListItemIcon>
        <ListItemText
          primary={!isLoading && customer.contact.email}
        />
      </ListItem>
    </List>
  )
}

OrderCustomerDetails.propTypes = {
  custmr: PropTypes.object.isRequired,
}

export default OrderCustomerDetails
