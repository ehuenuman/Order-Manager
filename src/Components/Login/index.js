import React from 'react';
import {
  Alert,
  AlertTitle,
  Card,
  CardActions,
  CardContent,
  Grid,
  IconButton,
  InputAdornment,
  Stack,
  Typography
} from '@mui/material';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { Form, Formik } from 'formik';
import * as Yup from 'yup';
import TextFieldWrapper from '../WorkOrderForm/components/FormUI/TextField';
import SubmitButtonWrapper from '../WorkOrderForm/components/FormUI/SubmitButton';
import { signIn } from '../../api/services/Auth';

const formSchemaValidation = Yup.object().shape({
  userName: Yup.string()
    .email('Please write a valid email')
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
  const [signInError, setSignInError] = React.useState(false);
  const [signInMessage, setSignInMessage] = React.useState({});
  const handleClickShowPassword = () => {
    setShowPassword(!showPassword);
  };
  const handleMouseDownPassword = (event) => {
    event.preventDefault();
  };

  const submitForm = (userName, password) => {
    setSignInError(false);
    signIn(userName, password)
      .then((user) => {
        if (user.message === 'success') {
          console.log(user);
        } else {
          setSignInError(true);
          setSignInMessage(user);
        }
      });
  }

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
        onSubmit={(values, actions) => submitForm(values.userName, values.password)}
      >
        <Form>
          {
            signInError &&
            <Alert
              severity="error"
              sx={{ mb: 1 }}
            >
              {signInMessage.title}
            </Alert>
          }
          <Card>
            <CardContent>
              <Stack>
                <Typography variant="h5" component="div">
                  Login
                </Typography>
                <TextFieldWrapper
                  variant="standard"
                  label="Email"
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
                spacing={2}
                direction="column"
                justifyContent="center"
                alignItems="center"
              >
                <Grid item>
                  <SubmitButtonWrapper>
                    Login
                  </SubmitButtonWrapper>
                </Grid>
                <Grid item>
                  {
                    signInError &&
                    <Typography variant="caption" component="div">
                      {signInMessage.instructions}
                    </Typography>
                  }
                </Grid>
              </Grid>
            </CardActions>
          </Card>
        </Form>
      </Formik>
    </Grid >
  )
}

export default Login;
