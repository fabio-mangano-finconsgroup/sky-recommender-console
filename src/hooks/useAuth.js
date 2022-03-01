import React from 'react';
import { authContext } from '../auth/AuthProvider';

export default function useAuth() {
  return React.useContext(authContext);
}
