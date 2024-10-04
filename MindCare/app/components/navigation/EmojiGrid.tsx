import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import emojiGridStyles from '../styles/EmojiGridStyles'; // Importe o estilo

const EmojiGrid = () => {
  const router = useRouter(); // Use o hook de navegação

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

  const handleEmojiPress = (emojiName: string) => {
    console.log(`Emoji ${emojiName} pressionado!`);
    router.push('/pages/HomePage2'); 
  };

  return (
    <View style={emojiGridStyles.emojiGrid}>
      {emojis.map((emoji) => (
        <TouchableOpacity 
          key={emoji.name} 
          style={emojiGridStyles.emojiButton} 
          onPress={() => handleEmojiPress(emoji.name)}
        >
          <View style={emojiGridStyles.emojiBox}>
            <MaterialCommunityIcons name={emoji.icon as keyof typeof MaterialCommunityIcons.glyphMap} size={40} color={emoji.color} />
            <Text style={emojiGridStyles.emojiLabel}>{emoji.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default EmojiGrid;