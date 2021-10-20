import React from 'react';
import {
  CardContent,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel,
  Grid,
  InputAdornment,
  Stack,
  Typography
} from '@mui/material';
import PropTypes from 'prop-types';
import NumberFormat from "react-number-format";
import TextField from '../FormUI/TextField';

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
          <TextField
            name="orderDeadline"
            label="Deadline"
            type="date"
          />
        </Grid>
        <Grid item xs="auto">
          <FormControl>
            <FormLabel component="legend">
              Work type
            </FormLabel>
            <FormGroup>
              <FormControlLabel control={<Checkbox id="desing" value="design" />} label="Design" />
              <FormControlLabel control={<Checkbox id="print" value="print" />} label="Print" />
              <FormControlLabel control={<Checkbox id="production" value="production" />} label="Production" />
              <FormControlLabel control={<Checkbox id="installation" value="installation" />} label="Installation" />
            </FormGroup>
            <FormHelperText>Select at least one.</FormHelperText>
          </FormControl>
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
