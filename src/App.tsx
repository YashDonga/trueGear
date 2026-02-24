import React from 'react';
import AppRoutes from './routes/AppRoutes';
import { CurrencyProvider } from './context/CurrencyContext';
import { AuthProvider } from './context/AuthContext';
import './index.css';

const App: React.FC = () => {
  return (
    <AuthProvider>
      <CurrencyProvider>
        <AppRoutes />
      </CurrencyProvider>
    </AuthProvider>
  );
};

export default App;