import React from 'react';
import {
  CardContent,
  FormLabel,
  Grid,
  InputAdornment,
  Stack
} from '@mui/material';
import NumberFormat from "react-number-format";
import PropTypes from 'prop-types';
import TextField from './FormUI/TextField';
import DatePicker from './FormUI/DatePicker';
import CheckboxGroup from './FormUI/CheckboxGroup';
import { useFormikContext } from 'formik';

const NumberFormatMoney = React.forwardRef((props, ref) => {
  const { onChange, ...other } = props;

  return (
    <NumberFormat
      {...other}
      getInputRef={ref}
      onValueChange={(fees) => {
        onChange({
          target: {
            name: props.name,
            value: fees.value,
          },
        });
      }}
      thousandSeparator
      isNumericString
    />
  );
});

NumberFormatMoney.propTypes = {
  name: PropTypes.string.isRequired,
  onChange: PropTypes.func.isRequired,
};

function OrderDetailsForm() {
  const checkboxItems = [
    { name: 'orderAreaDesign', label: 'Design' },
    { name: 'orderAreaPrint', label: 'Print' },
    { name: 'orderAreaWorkshop', label: 'Workshop' },
    { name: 'orderAreaInstallation', label: 'Installation' }
  ];

  const {
    values: { orderTotalFee, orderPaidFee },
    setFieldValue
  } = useFormikContext();

  const handleChangeFee = (event) => {
    setFieldValue(event.target.name, event.target.value);
    event.target.name === 'orderTotalFee' ?
      setFieldValue('orderToPaidFee', event.target.value - orderPaidFee) :
      setFieldValue('orderToPaidFee', orderTotalFee - event.target.value)
  };

  return (
    <CardContent>
      <Grid container spacing={2} justifyContent="space-around">
        <Grid item xs={12}>
          <TextField
            name="orderDetails"
            label="Details"
            placeholder="Enter details about the new work"
            multiline
            rows={6}
          />
        </Grid>
        <Grid item xs="auto">
          <DatePicker
            name="orderDeadline"
            label="Deadline"
          />
        </Grid>
        <Grid item xs="auto">
          <CheckboxGroup
            name="orderArea"
            legend="Type of work"
            checkboxItems={checkboxItems}
          />
        </Grid>
        <Grid item xs="auto">
          <Stack spacing={2}>
            <FormLabel component="legend">
              Services Fee
            </FormLabel>
            <TextField
              name="orderTotalFee"
              label="Total"
              onChange={handleChangeFee}
              InputProps={{
                inputComponent: NumberFormatMoney,
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                endAdornment: <InputAdornment position="end">Inc. GST</InputAdornment>,
              }}
            />
            <TextField
              name="orderPaidFee"
              label="Paid"
              onChange={handleChangeFee}
              InputProps={{
                inputComponent: NumberFormatMoney,
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                endAdornment: <InputAdornment position="end">Inc. GST</InputAdornment>,
              }}
            />
            <TextField
              name="orderToPaidFee"
              label="To Pay"
              helperText="Amount that must be paid to deliver the work"
              disabled
              InputProps={{
                inputComponent: NumberFormatMoney,
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                endAdornment: <InputAdornment position="end">Inc. GST</InputAdornment>,
              }}
            />
          </Stack>
        </Grid>

      </Grid>
    </CardContent>
  )
}

export default OrderDetailsForm;
