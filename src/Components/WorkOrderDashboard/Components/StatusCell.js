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
  var iconsProps = {};
  var color;
  var isStageNoTouched = false;
  const stages = ['design', 'print', 'workshop', 'installation'];
  stages.map(stage => {
    color = isStageNoTouched ? 'disabled' : 'primary';
    if (areas[stage]) {
      if (status.area === stage) {
        color = 'secondary';
        isStageNoTouched = true;
      }
      iconsProps[stage] = {
        key: stage,
        color: color
      }
    }
    console.log(iconsProps);
  });

  return (
    <Grid
      container
      justifyContent="space-between"
      alignItems="center"
    >
      <div>
        <Grid
          container
          justifyContent="space-between"
          alignItems="center"
        >
          {
            areas.design && <DesignServicesOutlinedIcon {...iconsProps.design} />
          }
          {
            areas.print && <LocalPrintshopOutlinedIcon {...iconsProps.print} />
          }
          {
            areas.workshop && <HandymanOutlinedIcon {...iconsProps.workshop} />
          }
          {
            areas.installation && <PanToolOutlinedIcon {...iconsProps.installation} />
          }
          <DeliveryDiningOutlinedIcon
            key="delivery"
            color={
              status.stage === 'isDelivered' ? 'primary'
                : status.area === 'delivery' ? 'secondary'
                  : 'disabled'
            }
          />
        </Grid>
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
