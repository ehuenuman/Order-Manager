import React from 'react';
import { Button } from '@mui/material';
import { useFormikContext } from 'formik';

const SubmitButtonWrapper = ({
  children,
  ...otherProps
}) => {
  const { submitForm } = useFormikContext();

  const handleSubmit = () => {
    submitForm();
  }

  const configButton = {
    ...otherProps,
    variant: 'contained',
    onClick: handleSubmit,
  }

  return (
    <Button {...configButton}>
      {children}
    </Button>
  )
}

export default SubmitButtonWrapper;