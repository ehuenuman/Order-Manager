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
import { Form, Formik } from 'formik';
import * as Yup from 'yup';

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

const INITIAL_FORM_STATE = {
  customerName: '',
  customerIdDocument: '',
  contactName: '',
  contactSurname: '',
  contactPhone: '',
  contactEmail: '',
  customerAddress: '',
  customerSuburb: '',
  customerCity: '',
  cutomerPostalCode: '',
  orderDetails: '',
  orderDeadline: '',
  orderTotalFee: '',
  orderPaidFee: '',
  orderToPayFee: '',
};

const FORM_VALIDATION = Yup.object().shape({
  customerName: Yup.string()
    .required('Required'),
  customerIdDocument: Yup.string()
    .required('Required'),
  contactName: Yup.string()
    .required('Required'),
  contactSurname: Yup.string()
    .required('Required'),
  contactPhone: Yup.number()
    .integer()
    .typeError('Please enter a valid phone number')
    .required('Required'),
  contactEmail: Yup.string()
    .email('Invalid email')
    .required('Required'),
  customerAddress: Yup.string()
    .required('Required'),
  customerSuburb: Yup.string()
    .required('Required'),
  customerCity: Yup.string()
    .required('Required'),
  cutomerPostalCode: Yup.number()
    .integer()
    .typeError('Please enter a valid postal code')
    .required('Required'),
});

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
      <Formik
        initialValues={{ ...INITIAL_FORM_STATE }}
        validationSchema={FORM_VALIDATION}
        onSubmit={values => {
          console.log(values);
        }}
      >
        <Form>
          <Stepper activeStep={activeStep} orientation="vertical">
            {steps.map((step, index) => (
              <Step key={step.label}>
                <StepLabel>
                  {step.label}
                </StepLabel>
                <StepContent>
                  <Card>
                    {step.content}
                    <CardActions sx={{ mb: 2 }}>
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
        </Form>
      </Formik>
    </Container>
  );
}

export default WorkOrderForm;