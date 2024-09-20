
import { MaterialCommunityIcons } from '@expo/vector-icons';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import reflexaoStyles from '../styles/ReflexaoStyles';

const Reflexao = () => {
  const reflexoes = [
    { name: 'Amor', icon: 'heart-outline', color: '#FF0000' },
    { name: 'Calma', icon: 'meditation', color: '#00BFFF' },
    { name: 'Avaliação', icon: 'clipboard-check-outline', color: '#FF69B4' },
    { name: 'Apoio', icon: 'hand-heart-outline', color: '#A9A9A9' },        
  ];

  const handleReflexaoPress = (ReflexaoName: string) => {
    console.log(`Emoji ${ReflexaoName} pressionado!`);     
  };

  return (
    <View style={reflexaoStyles.reflexao}>
      {reflexoes.map((emoji) => (
        <TouchableOpacity 
          key={emoji.name} 
          style={reflexaoStyles.emojiButton} 
          onPress={() => handleReflexaoPress(emoji.name)}
        >
          <View style={reflexaoStyles.emojiBox}>
            <MaterialCommunityIcons name={emoji.icon!} size={50} color={emoji.color} />
            <Text style={reflexaoStyles.emojiLabel}>{emoji.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Reflexao;