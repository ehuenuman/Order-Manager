import React from 'react';
import { Button, Card, CardActions, CardContent, FormControl, Grid, IconButton, Input, InputAdornment, InputLabel, Stack, TextField, Typography } from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextFieldWrapper from '../WorkOrderForm/components/FormUI/TextField';
import SubmitButtonWrapper from '../WorkOrderForm/components/FormUI/SubmitButton';

const formSchemaValidation = Yup.object().shape({
  userName: Yup.string()
    .required('Required'),
  password: Yup.string()
    .required('Required'),
});

function Login({
  user,
  setUser,
  ...otherProps
}) {

  const [showPassword, setShowPassword] = React.useState(false);
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const handleChange = (prop) => (event) => {
    setUser({ ...user, [prop]: event.target.value });
  };

  return (
    <Grid
      container
      justifyContent="center"
      alignItems="center"
      sx={{ width: "100%", height: "100vh" }}
    >
      <Formik
        initialValues={{ userName: '', password: '' }}
        validationSchema={formSchemaValidation}
        onSubmit={(values, actions) => {
          setUser({
            userName: values.userName,
            password: values.password
          })
        }}
      >
        <Form>
          <Card>
            <CardContent>
              <Stack>
                <Typography variant="h5" component="div">
                  Login
                </Typography>
                <TextFieldWrapper
                  variant="standard"
                  label="User"
                  name="userName"
                  sx={{ m: 1, width: '25ch' }}
                />
                <TextFieldWrapper
                  id="standard-adornment-password"
                  name="password"
                  label="Password"
                  variant="standard"
                  type={showPassword ? 'text' : 'password'}
                  InputProps={{
                    endAdornment:
                      < InputAdornment position="end" >
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={handleClickShowPassword}
                          onMouseDown={handleMouseDownPassword}
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                  }}
                  sx={{ m: 1, width: '25ch' }}
                />
              </Stack>
            </CardContent>
            <CardActions>
              <Grid
                container
                item
                justifyContent="center"
                alignItems="center"
              >
                <SubmitButtonWrapper>
                  Login
                </SubmitButtonWrapper>
              </Grid>
            </CardActions>
          </Card>
        </Form>
      </Formik>
    </Grid >
  )
}

export default Login;
