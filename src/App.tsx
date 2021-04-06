import { createMuiTheme, ThemeProvider } from '@material-ui/core';
import React from 'react';
import Layout from './components/core/Layout';
import { AppRoutes } from './pages/AppRoutes';

import * as colors from '@material-ui/core/colors/common';
import green from '@material-ui/core/colors/green';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: colors.default.white,
    },
    secondary: {
      main: green[500],
    },
  }
});

function App() {
  return (
    <>
      <ThemeProvider theme={theme}>
        <Layout>
          <AppRoutes />
        </Layout>
      </ThemeProvider>
    </>
  );
}

export default App;
