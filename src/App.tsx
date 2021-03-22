import React from 'react';
import Layout from './components/core/Layout';
import { AppRoutes } from './pages/AppRoutes';

function App() {
  return (
    <>
      <Layout>
        <AppRoutes />
      </Layout>
    </>
  );
}

export default App;
