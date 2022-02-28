import React from 'react';
import PropTypes from 'prop-types';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Box from '@mui/material/Box';

/**
 * Main layout of the application.
 */

const AppLayout = ({ children }) => {
  return (
    <div data-testid="app-layout">
      <AppBar data-testid="app-bar" position="static">
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography variant="h6" component="div">
              SKY Recommender Console
            </Typography>
          </Toolbar>
        </Container>
      </AppBar>
      <Box sx={{ m: 2 }} />
      <Container maxWidth="xl">{children}</Container>
    </div>
  );
};

AppLayout.propTypes = {
  /** Page component */
  children: PropTypes.node,
};

export default AppLayout;
