import React from 'react';
import { format } from 'date-fns';

import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
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
import { Timestamp } from '@firebase/firestore';
import { finishOrder, finishStage, startStage } from '../../../../api/services/WorkOrder';

const formatDate = "dd MMM, yyyy";

const parsePhrase = (word1, word2) => {
  var phrase;
  if (word2) {
    switch (word2) {
      case 'isWaiting':
        (word1 === 'installation') ? (phrase = "Work order expecting installation")
          : (phrase = "Work order waiting in the " + word1 + " area");
        break;
      case 'isOnGoing':
        phrase = "Work order in the " + word1 + " process";
        break;
      case 'isReady':
        phrase = "Work order completed and ready to pick up";
        break;
      case 'isDelivered':
        phrase = "Work order delivered to the customer";
        break;
      default:
        break;
    }
  } else {
    var withCap = {
      'design': 'Design',
      'print': 'Print',
      'workshop': 'Workshop',
      'installation': 'Installation',
      'delivery': 'Delivery'
    }
    phrase = withCap[word1]
  }
  return phrase;
}

const parseDate = (date) => {
  return format((new Timestamp(date.seconds, date.nanoseconds)).toDate(), formatDate);
}

const OrderStatus = ({
  updateOrder,
  order
}) => {
  const tempSteps = [
    order.areas.design && 'design',
    order.areas.print && 'print',
    order.areas.workshop && 'workshop',
    order.areas.installation && 'installation',
  ];
  tempSteps.push("delivery");
  const steps = tempSteps.filter(word => word !== false);

  const [status, setStatus] = React.useState(JSON.parse(JSON.stringify(order.status)));
  const [stages, setStages] = React.useState(JSON.parse(JSON.stringify(order.stages)));

  const [activeStep, setActiveStep] = React.useState(
    steps.findIndex((element) => element === status.area)
  );
  const [inProgress, setInProgress] = React.useState(
    (status.stage === 'isDelivered') ? activeStep + 1 : activeStep
  );
  const [completed, setCompleted] = React.useState(
    () => {
      var completedList = {};
      for (let index = 0; index < inProgress; index++) {
        completedList[index] = true;
      }
      return completedList
    }
  );

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
      isLastStep() ? activeStep : activeStep + 1;
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

  const handleStartStage = () => {
    const newStatus = order.status;
    const newStages = order.stages;
    const timestamp = Timestamp.now();
    newStages[steps[activeStep]].isOnGoing = timestamp;
    newStatus.lastUpdate = timestamp;
    newStatus.stage = 'isOnGoing';

    startStage(order.id, newStages, newStatus);

    setStatus(JSON.parse(JSON.stringify(newStatus)));
    setStages(JSON.parse(JSON.stringify(newStages)));
  };

  const handleCompleteStage = () => {
    const newStatus = order.status;
    const newStages = order.stages;
    const timestamp = Timestamp.now();
    newStages[steps[activeStep]].isFinish = timestamp;
    if (steps[activeStep + 1] === 'delivery') {
      newStages[steps[activeStep + 1]] = {
        isReady: timestamp,
        isDelivered: false
      }
      newStatus.stage = 'isReady';
    } else {
      newStages[steps[activeStep + 1]] = {
        isWaiting: timestamp,
        isOnGoing: false,
        isFinish: false
      }
      newStatus.stage = 'isWaiting';
    }
    newStatus.lastUpdate = timestamp;
    newStatus.area = steps[activeStep + 1];

    finishStage(order.id, newStages, newStatus);

    setStatus(JSON.parse(JSON.stringify(newStatus)));
    setStages(JSON.parse(JSON.stringify(newStages)));

    handleComplete();
  };

  const handleCompleteOrder = () => {
    const newStatus = order.status;
    const newStages = order.stages;
    const dateUpdate = Timestamp.now();
    newStages[steps[activeStep]].isDelivered = dateUpdate;
    newStatus.lastUpdate = dateUpdate;
    newStatus.stage = 'isDelivered';
    
    finishOrder(order.id, newStages, newStatus);

    setStatus(JSON.parse(JSON.stringify(newStatus)));
    setStages(JSON.parse(JSON.stringify(newStages)));
    
    handleComplete();
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
              {parsePhrase(status.area, status.stage)}
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
              {parseDate(status.lastUpdate)}
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
                {parsePhrase(label)}
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
        {
          activeStep !== steps.length &&
          (completed[activeStep] ? (
            <Typography variant="caption" sx={{ display: 'inline-block' }}>
              {
                parsePhrase(steps[activeStep]) + " completed on " + parseDate(stages[steps[activeStep]][(activeStep < totalSteps() - 1 ? 'isFinish' : 'isDelivered')])
              }
            </Typography>
          ) : (completedSteps() === totalSteps() - 1) ? (
            <Button onClick={handleCompleteOrder}>
              Finish Order
            </Button>
          ) : (status.stage === 'isWaiting') ? (
            <Button onClick={handleStartStage}>
              Start Job
            </Button>
          ) : (
            <Button onClick={handleCompleteStage}>
              Complete {parsePhrase(steps[activeStep])}
            </Button>
          )
          )
        }
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
