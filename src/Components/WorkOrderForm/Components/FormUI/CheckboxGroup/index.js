import React from 'react';
import {
  Checkbox,
  FormControl,
  FormControlLabel,
  FormGroup,
  FormHelperText,
  FormLabel
} from '@mui/material';
import { useField, useFormikContext } from 'formik';

const CheckboxGroupWrapper = ({
  name,
  legend,
  checkboxItems,
  ...otherProps
}) => {
  const { values } = useFormikContext();
  const [field, meta] = useField(name);

  const configCheckbox = {
    ...field,
    ...otherProps
  }

  const configFormControl = {
    variant: 'standard',
    component: 'fieldset'
  };

  if (meta && meta.touched && meta.error) {
    configFormControl.error = true;
  }

  return (
    <FormControl {...configFormControl}>
      <FormLabel component="legend">{legend}</FormLabel>
      <FormGroup>
        {
          checkboxItems.map(item => (
            <FormControlLabel
              control={
                <Checkbox
                  {...configCheckbox}
                  value={item.name}
                  checked={values.orderArea.includes(item.name)}
                />
              }
              label={item.label}
              key={item.name}
            />
          ))
        }
      </FormGroup>
      {
        configFormControl.error ?
          <FormHelperText>At least one option must be selected</FormHelperText> :
          null
      }
    </FormControl>
  );
};

export default CheckboxGroupWrapper;
