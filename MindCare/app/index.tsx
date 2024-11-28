// index.tsx
import React from 'react';
import { Platform } from 'react-native';
import Login from './pages/Login';
import ProfessionalLogin from './pages/profissionais/ProfessionalLogin';



export default function App() {
  // Verifica se é web
  const isWeb = Platform.OS === 'web';
  
  // Retorna o componente apropriado
  return isWeb ? <ProfessionalLogin /> : <Login />;
}