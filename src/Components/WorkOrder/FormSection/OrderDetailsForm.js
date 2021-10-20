import React from 'react';
import {
  CardContent,
  FormLabel,
  Grid,
  InputAdornment,
  Stack,
  Typography
} from '@mui/material';
import NumberFormat from "react-number-format";
import PropTypes from 'prop-types';
import TextField from '../FormUI/TextField';
import DateTimePicker from '../FormUI/DateTimePicker';
import Checkbox from '../FormUI/Checkbox';

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
  const [fees, setFees] = React.useState({
    orderTotalFee: "",
    orderPaidFee: "",
  });

  const handleChangeFee = (event) => {
    setFees({ ...fees, [event.target.name]: event.target.value });
  };

  return (
    <CardContent>
      <Typography variant="h4" gutterBottom>
        Order Details
      </Typography>
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
          <DateTimePicker
            name="orderDeadline"
            label="Deadline"
          />
        </Grid>
        <Grid item xs="auto">
          <Stack spacing={0}>
            <Checkbox
              name="orderAreaDesign"
              legend="Type of Work"
              label="Design"
            />
            <Checkbox
              name="orderAreaPrint"
              label="Print"
            />
            <Checkbox
              name="orderAreaProduction"
              label="Production"
            />
            <Checkbox
              name="orderAreaInstallation"
              label="Installation"
            />
          </Stack>
        </Grid>
        <Grid item xs="auto">
          <Stack spacing={2}>
            <FormLabel>
              Services Fee
            </FormLabel>
            <TextField
              name="orderTotalFee"
              label="Total"
              value={fees.orderTotalFee}
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
              value={fees.orderPaidFee}
              onChange={handleChangeFee}
              InputProps={{
                inputComponent: NumberFormatMoney,
                startAdornment: <InputAdornment position="start">$</InputAdornment>,
                endAdornment: <InputAdornment position="end">Inc. GST</InputAdornment>,
              }}
            />
            <TextField
              name="orderPaidFee"
              label="To Pay"
              value={fees.orderTotalFee - fees.orderPaidFee}
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
