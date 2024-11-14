import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import avaliacaoStyles from '../styles/AvaliacaoStyles';

type RouteParams = {
    stress: string;
    anxiety: string;
    depression: string;
};

export default function Resultados() {
    const route = useRoute();
    const { stress, anxiety, depression } = route.params as RouteParams;

    console.log("Resultados recebidos:", { stress, anxiety, depression });
    if (!route.params){
        return <Text>Carregando resultados...</Text>
    }

  return (
    <View style={[avaliacaoStyles.container, styles.container]}>
      <Text style={avaliacaoStyles.greeting}>Resultados da Avaliação</Text>
      <Text style={styles.resultText}>Stress: {stress}</Text>
      <Text style={styles.resultText}>Ansiedade: {anxiety}</Text>
      <Text style={styles.resultText}>Depressão: {depression}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#41ACBB',
  },
  resultText: {
    fontSize: 18,
    marginVertical: 10,
    color: 'white',
  },
});