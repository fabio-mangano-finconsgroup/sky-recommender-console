import React from 'react';
import { Formik, Form } from 'formik';
import PropTypes from 'prop-types';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';
import TextInput from '../form/text-input/TextInput';
import { Typography } from '@mui/material';
import { SignInFormWrapper } from './SignInForm.styled';

const initialValues = {
  username: '',
  password: '',
};

const SignInForm = ({ onSubmit }) => {
  return (
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <Typography variant="h4">Sign in</Typography>
          </Grid>
          <Grid item xs={12}>
            <TextInput name="username" label="username" size="small" />{' '}
          </Grid>
          <Grid item xs={12}>
            <TextInput
              name="password"
              label="password"
              type="password"
              size="small"
            />
          </Grid>
          <Grid item xs={12}>
            <Button type="submit" variant="contained">
              Login
            </Button>
          </Grid>
        </Grid>
      </Form>
    </Formik>
  );
};

export default SignInForm;
