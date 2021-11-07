import React from 'react';
import { LoadingButton } from '@mui/lab';
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
    loadingIndicator: "Loading..."
  }

  return (
    <LoadingButton {...configButton}>
      {children}
    </LoadingButton>
  )
}

export default SubmitButtonWrapper;