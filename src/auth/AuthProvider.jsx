import React from 'react';
import { useProvideAuth } from '../hooks/useProvideAuth';

export const authContext = React.createContext();

const AuthProvider = ({ children }) => {
  const auth = useProvideAuth();
  return <authContext.Provider value={auth}>{children}</authContext.Provider>;
};

export default AuthProvider;
