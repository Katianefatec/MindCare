import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import momentoStyles from '../styles/MomentoStyles';
import { router } from 'expo-router';

const Momento = () => {
  const momentos = [
    { name: 'Reflexão', icon: 'lightbulb-outline', color: '#FFD720' },
    { name: 'Calma', icon: 'spa', color: '#ADD8E8' },
    { name: 'Avaliação', icon: 'clipboard-check-outline', color: '#FF91A0' },
    { name: 'Apoio', icon: 'hand-heart-outline', color: '#77DD77' },       
  ];

  const handleMomentoPress = (momentoName: string) => {
    console.log(`Opção ${momentoName} pressionada!`); 
    switch (momentoName) {
      case 'Reflexão':
        router.push('/pages/reflexoes/ReflexaoPage');
        break;
      case 'Calma':
        router.push('/pages/calma/CalmaPage');
        break;
      case 'Avaliação':
        router.push('/pages/AvaliacaoPage');
        break;
      case 'Apoio':
        router.push('/pages/ApoioPage');
        break;
    }    
  };


  return (
    <View style={momentoStyles.momento}>
      {momentos.map((momento) => (
        <TouchableOpacity 
          key={momento.name} 
          style={momentoStyles.momentoButton} 
          onPress={() => handleMomentoPress(momento.name)}
        >
          <View style={momentoStyles.momentoBox}>
            <MaterialCommunityIcons name={momento.icon as keyof typeof MaterialCommunityIcons.glyphMap} size={50} color={momento.color} />
            <Text style={momentoStyles.momentoLabel}>{momento.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Momento;