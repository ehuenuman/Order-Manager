import React from 'react';
import { TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/lab';
import DateAdapter from '@mui/lab/AdapterDateFns';
import { useField, useFormikContext } from 'formik';

const DatePickerWrapper = ({
  name,
  label,
  ...otherProps
}) => {
  const { setFieldValue } = useFormikContext();
  const [field, meta] = useField(name);
  const [date, setDate] = React.useState('');

  const handleChange = newDate => {
    setFieldValue(name, newDate);
    setDate(newDate);
  }

  const configDatePicker = {
    label: label,
    inputFormat: 'dd/MM/yyyy',
    value: date,
    minDate: new Date(),
    onChange: handleChange
  }

  const configTextField = {
    ...field,
    ...otherProps,
    error: false
  }

  if (meta && meta.touched && meta.error) {
    configTextField.error = true;
    configTextField.helperText = meta.error;
  }

  return (
    <LocalizationProvider dateAdapter={DateAdapter}>
      <DatePicker
        {...configDatePicker}
        renderInput={(params) => <TextField {...params} {...configTextField} />}
      />
    </LocalizationProvider>
  );
};

export default DatePickerWrapper;
