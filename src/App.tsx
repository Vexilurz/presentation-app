import React from 'react';
import Layout from './components/core/Layout';
import { AppRoutes } from './pages/AppRoutes';

function App() {
  return (
    <div>
      <Layout>
        <AppRoutes />
      </Layout>
    </div>
  );
}

export default App;
