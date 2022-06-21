import React, { useEffect } from 'react';
import {
  Alert,
  Container,
  Grid
} from '@mui/material';
import * as Yup from 'yup';
import { Form, Formik } from 'formik';
import DashboardCard from '../DashboardCard';
import SubmitButton from './components/FormUI/SubmitButton';
import CustomerDetailsForm from './components/CustomerDetailsForm';
import OrderDetailsForm from './components/OrderDetailsForm';
import { createOrder } from '../../api/services/WorkOrder';
import { useHistory } from 'react-router-dom';

const initialFormState = {
  customerId: '',
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
  customerId: Yup.string(),
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

function WorkOrderForm() {
  const [loading, setLoading] = React.useState(false);
  const [successSubmit, setSuccessSubmit] = React.useState(false);
  const [errorSubmit, setErrorSubmit] = React.useState(false);
  let history = useHistory();
  const goHome = () => {
    history.push('/');
  };

  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return (
    <Container>
      <Formik
        initialValues={{ ...initialFormState }}
        validationSchema={formSchemaValidation}
        onSubmit={(values, actions) => {
          console.log(values);
          setLoading(true);
          createOrder(values)
            .then((response) => {
              (response === 'success') && setSuccessSubmit(true);
              (response === 'error') && setErrorSubmit(true);
              actions.resetForm({
                values: initialFormState
              });
              setLoading(false);
              goHome();
            });
        }}
      >
        <Form>
          <Grid
            container
            spacing={4}
          >
            <Grid item xs={12} xl={6}>
              <DashboardCard title="Customer details">
                <CustomerDetailsForm />
              </DashboardCard>
            </Grid>
            <Grid item xs={12} xl={6}>
              <DashboardCard title="Order details">
                <OrderDetailsForm />
              </DashboardCard>
            </Grid>
            <Grid
              container
              item
              justifyContent="flex-end"
              alignItems="center"
            >
              {successSubmit && <Alert severity="success">Success! Work Order has been created</Alert>}
              {errorSubmit && <Alert severity="error">Oops! Couldn't create a new work order. Try it later!</Alert>}
              <SubmitButton
                loading={loading}
                sx={{ margin: 1 }}
              >
                Create Work Order
              </SubmitButton>
            </Grid>
          </Grid>
        </Form>
      </Formik>
    </Container>
  );
}

export default WorkOrderForm;
