import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AlertContextProvider } from '../notifications/AlertProvider';
import AuthProvider from '../auth/AuthProvider';
import AppLayout from '../layouts/AppLayout';
import Notification from '../notifications/Notification';
import Home from '../pages/home/Home';
import Login from '../pages/login/Login';
import NoMatch from '../pages/no-match/NoMatch';
import ProtectedRoute from '../routes/ProtectedRoute';
import { AppWrapper } from './App.styled';

/**
 * The entry point component of the application.
 */
const App = () => {
  return (
    <Router basename={`${process.env.REACT_APP_BASENAME}`}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AlertContextProvider>
          <AuthProvider>
            <AppWrapper>
              <AppLayout>
                <Switch>
                  <Route path="/login">
                    <Login />
                  </Route>
                  <ProtectedRoute>
                    <Route exact from="/" component={Home} />
                  </ProtectedRoute>
                  <Route path="*">
                    <NoMatch />
                  </Route>
                </Switch>
              </AppLayout>
            </AppWrapper>
            <Notification />
          </AuthProvider>
        </AlertContextProvider>
      </LocalizationProvider>
    </Router>
  );
};

export default App;
