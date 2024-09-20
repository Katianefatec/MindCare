import React from 'react';
import { View, TouchableOpacity, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; 
import momentoStyles from './styles/MomentoStyles';

const Momento = () => {
  const momentos = [
    { name: 'Reflexão', icon: 'lightbulb-outline', color: '#FFD700' },
    { name: 'Calma', icon: 'meditation', color: '#00BFFF' },
    { name: 'Avaliação', icon: 'clipboard-check-outline', color: '#FF69B4' },
    { name: 'Apoio', icon: 'hand-heart-outline', color: '#A9A9A9' },        
  ];

  const handleMomentoPress = (momentoName) => {
    console.log(`Emoji ${momentoName} pressionado!`);     
  };

  return (
    <View style={momentoStyles.momento}>
      {momentos.map((emoji) => (
        <TouchableOpacity 
          key={emoji.name} 
          style={momentoStyles.emojiButton} 
          onPress={() => handleMomentoPress(emoji.name)}
        >
          <View style={momentoStyles.emojiBox}>
            <MaterialCommunityIcons name={emoji.icon} size={50} color={emoji.color} />
            <Text style={momentoStyles.emojiLabel}>{emoji.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Momento;