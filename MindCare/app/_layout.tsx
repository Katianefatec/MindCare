// _layout.tsx
import React from 'react';
import { Stack } from 'expo-router';
import ProtectedRoute from './components/navigation/ProtegeRota';
import HomePage from './pages/HomePage';
import Toast from 'react-native-toast-message';

const Layout = () => {
  return (
    <Stack>     
        <ProtectedRoute>
          <HomePage />
        </ProtectedRoute>    
        <Toast />  
    </Stack>
  );
};

export default Layout;