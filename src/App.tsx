import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { CurrencyProvider } from './context/CurrencyContext';
import './index.css';

const App: React.FC = () => {
  return (
    <CurrencyProvider>
      <AppRoutes />
    </CurrencyProvider>
  );
};

export default App;