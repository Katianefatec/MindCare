import { MaterialCommunityIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { addDoc, collection } from 'firebase/firestore';
import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../../config/firebaseConfig';
import emojiGridStyles from '../styles/EmojiGridStyles';

const EmojiGrid = () => {
  const router = useRouter(); 

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

  const handleEmojiPress = async (emojiName: string) => {
    console.log(`Emoji ${emojiName} pressionado!`);    
    
    const user = auth.currentUser;
    if (user) {
      try {
        await addDoc(collection(db, 'emotions'), {
          userId: user.uid,
          emotion: emojiName,
          timestamp: new Date(),
        });
        console.log('Escolha da emoção salva com sucesso!');
      } catch (error) {
        console.error('Erro ao salvar a escolha da emoção:', error);
      }
    }

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