import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import avaliacaoStyles from '../styles/AvaliacaoStyles';

type RouteParams = {
    stress: string;
    anxiety: string;
    depression: string;
};

const getMessage = (level: string, type: string) => {
  switch (level) {
    case 'Normal':
      return `Você está dentro da faixa normal de ${type}. Continue mantendo hábitos saudáveis.`;
    case 'Leve':
      return `Você está apresentando sintomas leves de ${type}. Tente praticar atividades relaxantes e manter uma rotina equilibrada.`;
    case 'Moderado':
      return `Você está apresentando sintomas moderados de ${type}. Considere falar com um profissional de saúde para obter orientação.`;
    case 'Grave':
      return `Você está apresentando sintomas graves de ${type}. É importante procurar ajuda profissional para lidar com esses sintomas.`;
    case 'Extremamente Grave':
      return `Você está apresentando sintomas extremamente graves de ${type}. Procure ajuda profissional imediatamente para obter suporte adequado.`;
    default:
      return '';
  }
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
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Stress: {stress}</Text>
        <Text style={styles.messageText}>{getMessage(stress, 'estresse')}</Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Ansiedade: {anxiety}</Text>
        <Text style={styles.messageText}>{getMessage(anxiety, 'ansiedade')}</Text>
      </View>
      <View style={styles.resultContainer}>
        <Text style={styles.resultText}>Depressão: {depression}</Text>
        <Text style={styles.messageText}>{getMessage(depression, 'depressão')}</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#41ACBB',
  },
  resultContainer: {
    marginVertical: 10,
  },
  resultText: {
    fontSize: 18,
    color: 'white',
  },
  messageText: {
    fontSize: 16,
    color: 'white',
    marginTop: 5,
  },
});