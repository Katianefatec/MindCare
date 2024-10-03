import React, { useState } from 'react';
import { ImageBackground, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';
import BottomBar from '../../components/navigation/BottomBar';
import reflexaoPageStyles from '../styles/ReflexaoPageStyles';
import { FontAwesome } from '@expo/vector-icons';
import { db, auth } from '../../config/firebaseConfig';
import { collection, addDoc } from 'firebase/firestore';

interface ReflexaoBaseProps {
  title: string;
}

const ReflexaoBase = ({ title }: ReflexaoBaseProps) => {
  const [text, setText] = useState('');

  const handleSave = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Usuário não autenticado");
      return;
    }
    try {
      await addDoc(collection(db, 'reflexoes'), {
        category: title,
        text: text,
        userId: user.uid,
        date: new Date().toLocaleString(),
      });
      console.log(`Texto salvo: ${text}`);
      router.push({ pathname: `/pages/reflexoes/ReflexaoViewBase`, params: { title } });
    } catch (error) {
      console.error("Erro ao salvar reflexão: ", error);
    }
  };

  const handleClose = () => {    
    router.push('/pages/reflexoes/ReflexaoPage');
  };

  return (
    <ImageBackground 
      source={require('../../../assets/images/fundoReflexao.png')}
      style={reflexaoPageStyles.backgroundImage}
    >
      <View style={reflexaoPageStyles.container}>
        
        <Text style={reflexaoPageStyles.greeting}>{title}</Text>
        
        <View style={reflexaoPageStyles.card}>
          <TouchableOpacity onPress={handleClose} style={reflexaoPageStyles.iconLeft}>
            <FontAwesome name="times" size={24} color="red" />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSave} style={reflexaoPageStyles.iconRight}>
            <FontAwesome name="check-square" size={24} color="green" />
          </TouchableOpacity>
          <TextInput
            style={reflexaoPageStyles.textInput}
            placeholder="Digite aqui seu texto"
            placeholderTextColor="#4A4A4A"
            multiline
            value={text}
            onChangeText={setText}
          />
        </View>
        
        <BottomBar /> 
      </View>
    </ImageBackground>
  );
};

export default ReflexaoBase;