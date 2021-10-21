import React from 'react';
import {
  Button,
  Card,
  CardActions,
  Container,
  Grid,
  Step,
  StepContent,
  StepLabel,
  Stepper,
} from '@mui/material';
import SubmitButton from './FormUI/SubmitButton';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import CustomerDetailsForm from './FormSection/CustomerDetailsForm';
import OrderDetailsForm from './FormSection/OrderDetailsForm';

const initialFormState = {
  customerName: '',
  customerIdDocument: '',
  contactName: '',
  contactSurname: '',
  contactPhone: '',
  contactEmail: '',
  customerAddress: '',
  customerSuburb: '',
  customerCity: '',
  customerPostalCode: '',
  orderDetails: '',
  orderDeadline: '',
  orderArea: [],
  orderTotalFee: '',
  orderPaidFee: '',
  orderToPaidFee: '',
};

const formSchemaValidation = Yup.object().shape({
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
  customerPostalCode: Yup.number()
    .integer()
    .typeError('Please enter a valid postal code')
    .required('Required'),
  orderDetails: Yup.string()
    .required('Required'),
  orderDeadline: Yup.date()
    .min(new Date(), 'This date has passed')
    .typeError('Invalid date')
    .required('Required'),
  orderArea: Yup.array()
    .min(1, 'At least one option must be selected'),
  orderTotalFee: Yup.string()
    .required('Required'),
  orderPaidFee: Yup.string(),
  orderToPaidFee: Yup.string(),
});

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

  return (
    <Container>
      <Formik
        initialValues={{ ...initialFormState }}
        validationSchema={formSchemaValidation}
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
                            {activeStep === steps.length - 1 ? (
                              <SubmitButton
                                sx={{ mt: 1, mr: 1 }}
                              >
                                Create Work Order
                              </SubmitButton>
                            ) : (
                              <Button
                                variant="contained"
                                onClick={handleNext}
                                sx={{ mt: 1, mr: 1 }}
                              >
                                Continue
                              </Button>
                            )}
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
        </Form>
      </Formik>
    </Container>
  );
}

export default WorkOrderForm;
