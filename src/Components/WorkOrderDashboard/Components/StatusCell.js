import React from 'react';

import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';

import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';

const StatusCell = ({
  status,
  areas,
  ...otherProps
}) => {

  var doneFlag = true;
  var color = 'primary';

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
      {...otherProps}
    >
      <div>
        {
          Object.entries(areas).map(([key, value]) => {
            color = !doneFlag ? 'disabled' : 'primary';
            switch (key) {
              case 'design':
                if (value) {
                  if (status.area === key) {
                    color = 'secondary';
                    doneFlag = !doneFlag;
                  }
                  return <DesignServicesOutlinedIcon key={key} color={color} />
                }
                break;
              case 'print':
                if (value) {
                  if (status.area === key) {
                    color = 'secondary';
                    doneFlag = !doneFlag;
                  }
                  return <LocalPrintshopOutlinedIcon key={key} color={color} />
                }
                break;
              case 'workshop':
                if (value) {
                  if (status.area === key) {
                    color = 'secondary';
                    doneFlag = !doneFlag;
                  }
                  return <HandymanOutlinedIcon key={key} color={color} />
                }
                break
              case 'installation':
                if (value) {
                  if (status.area === key) {
                    color = 'secondary';
                    doneFlag = !doneFlag;
                  }
                  return <PanToolOutlinedIcon key={key} color={color} />
                }
                break;
              default:
                break;
            }
          })
        }
        <DeliveryDiningOutlinedIcon
          key="delivery"
          color={
            status.stage === 'isDelivered' ? 'primary'
              : status.area === 'delivery' ? 'secondary'
                : 'disabled'
          }
        />
      </div>
      <div>
        <Typography
          variant="body1"
          component="span"
          color={status.onTime ? "success.light" : "error.light"}
          fontWeight="bold"
        >
          {
            status.stage === 'isDelivered' ? 'Delivered'
              : status.stage === 'isReady' ? 'Ready'
                : status.stage === 'isOnGoing' ? 'In Progress'
                  : 'Waiting'
          }
        </Typography>
      </div>
    </Grid>
  )
}

export default StatusCell
