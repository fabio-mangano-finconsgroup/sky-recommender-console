import React from 'react';
import { signIn, signOut } from '../providers/auth/AuthProvider';

export function useProvideAuth() {
  const [isAuth, setIsAuth] = React.useState(false);

  const signin = async () => {
    await signIn();
    setIsAuth(true);
  };

  const signout = async () => {
    await signOut();
    setIsAuth(false);
  };

  return {
    isAuth,
    signin,
    signout,
  };
}
