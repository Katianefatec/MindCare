import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import momentoStyles from '../styles/MomentoStyles';
import { router } from 'expo-router';

const Calma = () => {
  const momentos = [
    { name: 'Aprender', icon: 'lightbulb-outline', color: '#FFD700' },
    { name: 'Ouvir', icon: 'meditation', color: '#00BFFF' },
    { name: 'Meditar', icon: 'clipboard-check-outline', color: '#FF69B4' },
    { name: 'Respirar', icon: 'hand-heart-outline', color: '#A9A9A9' },        
  ];

  const handleMomentoPress = (momentoName: string) => {
    console.log(`Opção ${momentoName} pressionada!`); 
    switch (momentoName) {
      case 'Aprender':
        router.push('/pages/reflexoes/ReflexaoPage');
        break;
      case 'Ouvir':
        router.push('/pages/calma/CalmaPage');
        break;
      case 'Meditar':
        router.push('/pages/AvaliacaoPage');
        break;
      case 'Respirar':
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

export default Calma;