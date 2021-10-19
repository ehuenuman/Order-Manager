import React from 'react';
import PropTypes from 'prop-types';
import NumberFormat from "react-number-format";
import { CardContent, Checkbox, FormControl, FormControlLabel, FormGroup, FormHelperText, FormLabel, Grid, InputAdornment, InputLabel, OutlinedInput, Stack, Typography } from '@mui/material';
import TextField from './Components/FormUI/TextField';

const NumberFormatMoney = React.forwardRef(function NumberFormatMoney(props, ref) {
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
  const [deadline, setDeadline] = React.useState(new Date('2014-08-18T21:11:54'));
  const [fees, setFees] = React.useState({
    totalFee: "",
    paidFee: "",
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
            id="orderDescription"
            label="Details"
            placeholder="Enter details about the new work"
            multiline
            rows={6}
            required
            fullWidth
          />
        </Grid>
        <Grid item xs="auto">
          <TextField
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
            <FormControl>
              <InputLabel htmlFor="totalPrice">Total</InputLabel>
              <OutlinedInput
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                endAdornment={<InputAdornment position="end">Inc. GST</InputAdornment>}
                name="totalFee"
                label="Total"
                value={fees.totalFee}
                onChange={handleChangeFee}
                inputComponent={NumberFormatMoney}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="paid">Paid</InputLabel>
              <OutlinedInput
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                endAdornment={<InputAdornment position="end">Inc. GST</InputAdornment>}
                name="paidFee"
                label="Paid"
                value={fees.paidFee}
                onChange={handleChangeFee}
              />
            </FormControl>
            <FormControl>
              <InputLabel htmlFor="totalPrice">To pay</InputLabel>
              <OutlinedInput
                startAdornment={<InputAdornment position="start">$</InputAdornment>}
                endAdornment={<InputAdornment position="end">Inc. GST</InputAdornment>}
                label="To pay"
                value={fees.totalFee - fees.paidFee}
                disabled
              />
              <FormHelperText>
                Amount that must be paid to deliver the work.
              </FormHelperText>
            </FormControl>
          </Stack>
        </Grid>

      </Grid>
    </CardContent>
  )
}

export default OrderDetailsForm;
