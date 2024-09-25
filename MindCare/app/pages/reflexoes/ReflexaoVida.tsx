import React, { useState } from 'react';
import { ImageBackground, Platform, Text, View, TextInput, TouchableOpacity } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import BottomBar from '../../components/navigation/BottomBar';
import reflexaoPageStyles from '../styles/ReflexaoPageStyles';
import { FontAwesome } from '@expo/vector-icons';

const ReflexaoVida = () => {
  const [text, setText] = useState('');
  const navigation = useNavigation();

  const handleSave = () => {
    
    console.log(`Texto salvo: ${text}`);
   
    navigation.navigate('pages/HomePage');
  };

  const handleClose = () => {
    // Navigate back to ReflexaoPage
    navigation.navigate('pages/reflexoes/ReflexaoPage');
  };

  return (
    <ImageBackground 
      source={require('../../../assets/images/fundoReflexao.png')}
      style={reflexaoPageStyles.backgroundImage}
    >
      <View style={reflexaoPageStyles.container}>
        
        <Text style={reflexaoPageStyles.greeting}>Vida</Text>
        
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
}

export default ReflexaoVida;