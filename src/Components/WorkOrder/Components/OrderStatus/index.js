import React from 'react';
import PropTypes from 'prop-types';
import { format } from 'date-fns';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

import AccessTimeOutlinedIcon from '@mui/icons-material/AccessTimeOutlined';
import TimelineOutlinedIcon from '@mui/icons-material/TimelineOutlined';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';

import { ColorlibConnector, ColorlibStepIcon } from './Components/StepperUI';

const formatDate = "dd MMM, yyyy";

//var steps = ["Design", "Print", "Workshop", "Installation", "Delivery"];

const parseText = {
  'design': 'Design',
  'print': 'Print',
  'workshop': 'Workshop',
  'installion': 'Installation',
  'delivery': 'Delivery',
  'isWaiting': 'Waiting',
  'isOnGoing': 'In progress',
  'isReady': 'Ready to pick up or delivery',
  'isDelivered': 'Delivered'
}

const OrderStatus = ({
  areas,
  stages,
  status
}) => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [inProgress, setInProgress] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

  const steps = [];
  Object.entries(areas).map(area => {
    if (area[1]) steps.push(area[0]);
  });
  steps.push("delivery");


  const totalSteps = () => {
    return steps.length;
  };

  const completedSteps = () => {
    return Object.keys(completed).length;
  };

  const isLastStep = () => {
    return activeStep === totalSteps() - 1;
  };

  const handleNext = () => {
    const newActiveStep =
      isLastStep() ?
        activeStep
        : activeStep + 1;
    setActiveStep(newActiveStep);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleStep = (step) => () => {
    setActiveStep(step);
  };

  const handleComplete = () => {
    const newCompleted = completed;
    newCompleted[activeStep] = true;
    setCompleted(newCompleted);
    setInProgress(activeStep + 1);
    handleNext();
  };

  return (
    <Stack
      spacing={5}
      marginTop={2}
      width="100%"
    >
      <Grid
        container
        spacing={2}
        justifyContent="space-evenly"
        alignItems="center"
      >
        <Grid
          container
          item
          xs="auto"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs="auto">
            <TimelineOutlinedIcon />
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle2" component="span" marginLeft={1}>
              Status
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" component="div">
              {parseText[status.stage] + " " + parseText[status.area]}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs="auto"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs="auto">
            <AccessTimeOutlinedIcon />
          </Grid>
          <Grid item xs>
            <Typography variant="subtitle2" component="span" marginLeft={1}>
              Last update
            </Typography>
          </Grid>
          <Grid item xs={12}>
            <Typography variant="body1" component="div">
              {format(new Date(status.lastUpdate), formatDate)}
            </Typography>
          </Grid>
        </Grid>
        <Grid
          container
          item
          xs="auto"
          justifyContent="space-around"
          alignItems="center"
        >
          <Grid item xs="auto">
            <TimerOutlinedIcon
              color={status.onTime ? "success" : "error"}
              fontSize="large"
            />
          </Grid>
          <Grid item xs>
            <Typography variant="body1" component="div" marginLeft={1}>
              {status.onTime ? "On time" : "Late"}
            </Typography>
          </Grid>
        </Grid>
      </Grid>
      <Stepper
        nonLinear
        activeStep={activeStep}
        alternativeLabel
        connector={<ColorlibConnector />}
      >
        {steps.map((label, index) => (
          <Step key={label} completed={completed[index]}>
            <StepButton
              onClick={handleStep(index)}
              disabled={
                !(index === inProgress) &&
                !completed[index]
              }
            >
              <StepLabel
                StepIconComponent={ColorlibStepIcon}
                StepIconProps={{ 'icon': label, 'inProgress': index === inProgress }}
              >
                {parseText[label]}
              </StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        justifyContent="space-between"
        alignItems="center"
      >
        <Button
          disabled={activeStep === 0}
          onClick={handleBack}
        >
          Back
        </Button>
        {activeStep !== steps.length &&
          (completed[activeStep] ? (
            <Typography variant="caption" sx={{ display: 'inline-block' }}>
              Step {activeStep + 1} already completed
            </Typography>
          ) : (
            <Button onClick={handleComplete}>
              {completedSteps() === totalSteps() - 1
                ? 'Finish Order'
                : 'Complete Step'}
            </Button>
          ))}
        <Button
          disabled={
            activeStep === totalSteps() - 1
              ? true
              : !(activeStep + 1 === inProgress)
              && !completed[activeStep + 1]
          }
          onClick={handleNext}
        >
          Next
        </Button>
      </Grid>
    </Stack>
  )
}

OrderStatus.propTypes = {
  areas: PropTypes.object.isRequired,
  stages: PropTypes.object.isRequired,
  status: PropTypes.object.isRequired
}

export default OrderStatus
