import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import HomePage from './pages/HomePage';
import ReflexaoLayout from './ReflexaoLayout';

const Stack = createNativeStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="HomePage" component={HomePage} options={{ title: 'Home' }} />
        <Stack.Screen name="ReflexaoLayout" component={ReflexaoLayout} options={{ title: 'Reflexões' }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}