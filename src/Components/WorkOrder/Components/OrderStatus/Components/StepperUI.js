import * as React from 'react';
import PropTypes from 'prop-types';
import { styled } from '@mui/material/styles';
import StepConnector, { stepConnectorClasses } from '@mui/material/StepConnector';

import DeliveryDiningOutlinedIcon from '@mui/icons-material/DeliveryDiningOutlined';
import DesignServicesOutlinedIcon from '@mui/icons-material/DesignServicesOutlined';
import HandymanOutlinedIcon from '@mui/icons-material/HandymanOutlined';
import LocalPrintshopOutlinedIcon from '@mui/icons-material/LocalPrintshopOutlined';
import PanToolOutlinedIcon from '@mui/icons-material/PanToolOutlined';

const ColorlibConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 22,
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`&.${stepConnectorClasses.completed}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: theme.palette.primary.main,
    },
  },
  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 3,
    borderRadius: 1,
    backgroundColor:
      theme.palette.mode === 'dark' ? theme.palette.grey[800] : '#eaeaf0',
  },
}));

const ColorlibStepIconRoot = styled('div')(({ theme, ownerState }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? theme.palette.grey[700] : '#ccc',
  zIndex: 1,
  color: '#fff',
  width: 50,
  height: 50,
  display: 'flex',
  borderRadius: '50%',
  justifyContent: 'center',
  alignItems: 'center',
  ...(ownerState.completed && {
    backgroundColor: theme.palette.primary.main,
  }),
  ...(ownerState.active && {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.35)',
    /* boxShadow: '0 4px 10px 0 ' + theme.palette.secondary.main, */
  }),
  ...(ownerState.inProgress && {
    backgroundColor: theme.palette.secondary.main,
    boxShadow: '0 4px 10px 0 rgba(0,0,0,.35)'
  }),
}));

function ColorlibStepIcon(props) {
  const { active, completed, inProgress, className } = props;

  const icons = {
    "design": <DesignServicesOutlinedIcon />,
    "print": <LocalPrintshopOutlinedIcon />,
    "workshop": <HandymanOutlinedIcon />,
    "installation": <PanToolOutlinedIcon />,
    "delivery": <DeliveryDiningOutlinedIcon />
  };

  return (
    <ColorlibStepIconRoot ownerState={{ completed, active, inProgress }} className={className}>
      {icons[props.icon]}
    </ColorlibStepIconRoot>
  );
}

ColorlibStepIcon.propTypes = {
  /**
   * Whether this step is active.
   * @default false
   */
  active: PropTypes.bool,
  className: PropTypes.string,
  /**
   * Mark the step as completed. Is passed to child components.
   * @default false
   */
  completed: PropTypes.bool,
  /**
   * The label displayed in the step icon.
   */
  icon: PropTypes.node,
};

export {
  ColorlibConnector,
  ColorlibStepIcon
} 
