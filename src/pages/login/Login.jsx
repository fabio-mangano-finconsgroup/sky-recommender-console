import React from 'react';
import SignInForm from '../../components/sign-in-form/SignInForm';
import { LoginWrapper } from './Login.styled';

const Login = () => {
  return (
    <LoginWrapper>
      <SignInForm />
    </LoginWrapper>
  );
};

export default Login;
