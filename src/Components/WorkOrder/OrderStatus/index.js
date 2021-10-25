import React from 'react';

import Button from '@mui/material/Button';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Step from '@mui/material/Step';
import StepButton from '@mui/material/StepButton';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import Typography from '@mui/material/Typography';

import { ColorlibConnector, ColorlibStepIcon } from './Components/StepperUI';

const steps = ['Design', 'Print', 'Workshop', 'Installation', 'Delivery'];

const OrderStatus = () => {
  const [activeStep, setActiveStep] = React.useState(0);
  const [inProgress, setInProgress] = React.useState(0);
  const [completed, setCompleted] = React.useState({});

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
      spacing={2}
      marginTop={5}
      width="100%"
    >
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
                {label}
              </StepLabel>
            </StepButton>
          </Step>
        ))}
      </Stepper>
      <Grid
        container
        spacing={2}
      >
        <Grid container item xs>
          <Typography variant="body1" component="div">
            Status
          </Typography>
          <Divider orientation="vertical" variant="middle" />
          <Typography variant="body1" component="div">
            Waiting for design
          </Typography>
        </Grid>
      </Grid>
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

export default OrderStatus
