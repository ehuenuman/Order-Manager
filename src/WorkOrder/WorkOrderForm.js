import React from 'react';
import {
  Button,
  Card,
  CardActions,
  Container,
  Grid,
  Paper,
  Step,
  StepContent,
  StepLabel,
  Stepper,
  Typography
} from '@mui/material';
import CustomerDetailsForm from './CustomerDetailsForm';
import OrderDetailsForm from './OrderDetailsForm';

const steps = [
  {
    label: 'Customer details',
    content: <CustomerDetailsForm />,
  },
  {
    label: 'Order details',
    content: <OrderDetailsForm />
  }
];

function WorkOrderForm() {
  const [activeStep, setActiveStep] = React.useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  const handleReset = () => {
    setActiveStep(0);
  };

  return (
    <Container>
      <form>
        <Stepper activeStep={activeStep} orientation="vertical">
          {steps.map((step, index) => (
            <Step key={step.label}>
              <StepLabel>
                {step.label}
              </StepLabel>
              <StepContent>
                <Card>
                  {step.content}
                  <CardActions sx={{mb: 2}}>
                    <Grid container spacing={2} justifyContent="flex-end">
                      <Grid item xs="auto">
                        <div>
                          <Button
                            variant="contained"
                            onClick={handleNext}
                            sx={{ mt: 1, mr: 1 }}
                            type={index === steps.length - 1 ? 'submit' : 'button'}
                          >
                            {index === steps.length - 1 ? 'Create Work Order' : 'Continue'}
                          </Button>
                          <Button
                            disabled={index === 0}
                            onClick={handleBack}
                            sx={{ mt: 1, mr: 1 }}
                          >
                            Back
                          </Button>
                        </div>
                      </Grid>
                    </Grid>
                  </CardActions>
                </Card>
              </StepContent>
            </Step>
          ))}
        </Stepper>
        {activeStep === steps.length && (
        <Paper square elevation={0} sx={{ p: 3 }}>
          <Typography>All steps completed - you&apos;re finished</Typography>
          <Button onClick={handleReset} sx={{ mt: 1, mr: 1 }}>
            Reset
          </Button>
        </Paper>
      )}
      </form>
    </Container>
  );
}

export default WorkOrderForm;