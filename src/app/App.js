import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import CssBaseline from '@mui/material/CssBaseline';
import AdapterDateFns from '@mui/lab/AdapterDateFns';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { AlertContextProvider } from '../notifications/AlertProvider';
import AppLayout from '../layouts/AppLayout';
import Notification from '../notifications/Notification';
import Home from '../pages/home/Home';
import NoMatch from '../pages/no-match/NoMatch';

/**
 * The entry point component of the application.
 */
const App = () => {
  return (
    <Router basename={`${process.env.REACT_APP_BASENAME}`}>
      <CssBaseline />
      <LocalizationProvider dateAdapter={AdapterDateFns}>
        <AlertContextProvider>
          <AppLayout>
            <Switch>
              <Route exact from="/" component={Home} />
              <Route path="*">
                <NoMatch />
              </Route>
            </Switch>
          </AppLayout>
          <Notification />
        </AlertContextProvider>
      </LocalizationProvider>
    </Router>
  );
};

export default App;
