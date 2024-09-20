import React from 'react';
import { View, TouchableOpacity, StyleSheet, Text } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importe o conjunto de ícones que você deseja usar

const EmojiGrid = () => {
  const emojis = [
    { name: 'Alegria', icon: 'emoticon-excited-outline', color: '#FFD700' },
    { name: 'Calma', icon: 'emoticon-happy-outline', color: '#00BFFF' },
    { name: 'Amor', icon: 'emoticon-kiss-outline', color: '#FF69B4' },
    { name: 'Cansaço', icon: 'emoticon-neutral-outline', color: '#A9A9A9' },    
    { name: 'Medo', icon: 'emoticon-frown-outline', color: '#8B0000' },
    { name: 'Tristeza', icon: 'emoticon-sad-outline', color: '#1E90FF' },
    { name: 'Aflição', icon: 'emoticon-cry-outline', color: '#FF4500' },
    { name: 'Raiva', icon: 'emoticon-angry-outline', color: '#DC143C' },
  ];

  const handleEmojiPress = (emojiName) => {
    console.log(`Emoji ${emojiName} pressionado!`);     
  };

  return (
    <View style={styles.emojiGrid}>
      {emojis.map((emoji) => (
        <TouchableOpacity 
          key={emoji.name} 
          style={styles.emojiButton} 
          onPress={() => handleEmojiPress(emoji.name)}
        >
          <View style={styles.emojiBox}>
            <MaterialCommunityIcons name={emoji.icon} size={40} color={emoji.color} />
            <Text style={styles.emojiLabel}>{emoji.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  emojiButton: {
    alignItems: 'center',
    marginBottom: 10,
    width: '45%', // Ajuste a largura para garantir duas colunas
  },
  emojiBox: {
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 10,
    alignItems: 'center',
    justifyContent: 'center',
    width: 100, // Defina uma largura fixa
    height: 100, // Defina uma altura fixa
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 2,
    elevation: 2,
  },
  emojiLabel: {
    fontSize: 12,
    marginTop: 4,
  },
});

export default EmojiGrid;