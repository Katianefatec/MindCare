import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import calmaStyles from '../styles/CalmaStyles';
import { router } from 'expo-router';

const Calma = () => {
  const tecnicas = [
    { name: 'Aprender', icon: 'book-outline', color: '#FFD700' },
    { name: 'Ouvir', icon: 'headphones', color: '#00BFFF' },
    { name: 'Meditar', icon: 'meditation', color: '#FF69B4' },
    { name: 'Respirar', icon: 'lungs', color: '#D8BFD8' },      
  ];

  const handleTecnicaPress = (tecnicaName: string) => {
    console.log(`Opção ${tecnicaName} pressionada!`); 
    switch (tecnicaName) {
      case 'Aprender':
        router.push('/pages/calma/Aprender');
        break;
      case 'Ouvir':
        router.push('/pages/calma/Ouvir');
        break;
      case 'Meditar':
        router.push('/pages/calma/Meditar');
        break;
      case 'Respirar':
        router.push('/pages/calma/Respirar');
        break;
    }    
  };

  return (
    <View style={calmaStyles.calma}>
      {tecnicas.map((tecnica) => (
        <TouchableOpacity 
          key={tecnica.name} 
          style={calmaStyles.calmaButton} 
          onPress={() => handleTecnicaPress(tecnica.name)}
        >
          <View style={calmaStyles.calmaBox}>
            <MaterialCommunityIcons name={tecnica.icon as keyof typeof MaterialCommunityIcons.glyphMap} size={50} color={tecnica.color} />
            <Text style={calmaStyles.calmaLabel}>{tecnica.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Calma;