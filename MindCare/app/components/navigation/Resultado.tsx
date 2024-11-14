import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

type RouteParams = {
    stress: number;
    anxiety: number;
    depression: number;
    
};

export default function Resultados() {
    const route = useRoute();
    const { stress, anxiety, depression } = route.params as RouteParams;

    console.log("Resultados recebidos:", { stress, anxiety, depression });
    if (!route.params){
        return <Text>Carregando resultados...</Text>
    }

  return (
    <View>
      <Text>Stress: {stress}</Text>
      <Text>Ansiedade: {anxiety}</Text>
      <Text>Depressão: {depression}</Text>
      
      
    </View>
  );
}