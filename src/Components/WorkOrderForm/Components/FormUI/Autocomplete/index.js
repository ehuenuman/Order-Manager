import React from "react";
import { Autocomplete, Box, TextField } from '@mui/material';
import { useField, useFormikContext } from "formik";

const AutocompleteWrapper = ({
  name,
  label,
  customers,
  ...otherProps
}) => {

  const [field, meta] = useField(name);
  const configAutocomplete = {
    ...field,
    ...otherProps,
    fullWidth: true,
    variant: 'outlined'
  }
  if (meta && meta.touched && meta.error) {
    configAutocomplete.error = true;
    configAutocomplete.helperText = meta.error;
  }

  const { setFieldValue } = useFormikContext();
  const [inputValue, setInputValue] = React.useState('');
  const [open, setOpen] = React.useState(false);
  const [option, setOption] = React.useState(false);

  React.useEffect(() => {
    if (typeof option === 'string') {
      setOption(customers.filter(value => value.name === inputValue)[0]);
    } else {
      if (option === false) {
        setFieldValue("customerId", '');
        setFieldValue("customerIdDocument", '');
        setFieldValue("contactName", '');
        setFieldValue("contactSurname", '');
        setFieldValue("contactPhone", '');
        setFieldValue("contactEmail", '');
        setFieldValue("customerAddress", '');
        setFieldValue("customerSuburb", '');
        setFieldValue("customerCity", '');
        setFieldValue("customerPostalCode", '');
      } else {
        setFieldValue("customerId", option.id);
        setFieldValue("customerIdDocument", option.bin);
        setFieldValue("contactName", option.contact.name);
        setFieldValue("contactSurname", option.contact.surname);
        setFieldValue("contactPhone", option.contact.phone);
        setFieldValue("contactEmail", option.contact.email);
        setFieldValue("customerAddress", option.address.line1);
        setFieldValue("customerSuburb", option.address.suburb);
        setFieldValue("customerCity", option.address.city);
        setFieldValue("customerPostalCode", option.address.postalCode);
      }
    }
  }, [option]);

  return (
    <Autocomplete
      id="autocomplete-customerName"
      freeSolo
      open={open}
      options={customers}
      renderInput={(params) => <TextField {...params} {...configAutocomplete} label={label} />}
      inputValue={inputValue}
      onInputChange={(event, newInput, reason) => {
        setInputValue(newInput);
        setFieldValue(name, newInput);
        (newInput.length > 1) ? setOpen(true) : setOpen(false);
        switch (reason) {
          case 'reset':
            setOption(newInput);
            break;
          case 'clear':
            setOption(false);
            break;
          default:
            break;
        };
      }}
      onClose={(event, reason) => setOpen(false)}
      getOptionLabel={(option) => {
        // Value selected with enter, right from the input
        if (typeof option === 'string') {
          return option;
        }
        // Add "xxx" option created dynamically
        if (option.inputValue) {
          return option.inputValue;
        }
        // Regular option
        return option.name;
      }}
      renderOption={(props, option) => (
        <Box
          component="li"
          {...props}
          onClick={(event) => {
            setInputValue(option.name);
            setFieldValue(name, option.name);
            setOption(option);
            setOpen(false);
          }}
        >
          {option.name}
        </Box>
      )}
    />
  );
};

export default AutocompleteWrapper;
