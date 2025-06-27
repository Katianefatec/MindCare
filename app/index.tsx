import React from 'react';
import { Redirect } from 'expo-router';
import { Platform } from 'react-native';

export default function App() {
  const isWeb = Platform.OS === 'web';
  
  if (isWeb) {
    return <Redirect href="/pages/profissionais/ProfessionalLogin" />;
  } else {
    return <Redirect href="/pages/Login" />;
  }
}