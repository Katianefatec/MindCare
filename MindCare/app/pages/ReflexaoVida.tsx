import React, { useState } from 'react';
import { ImageBackground, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import BottomBar from '../components/navigation/BottomBar';
import Reflexao from '../components/navigation/Reflexao';
import reflexaoPageStyles from './styles/ReflexaoPageStyles';


const ReflexaoVida = () => {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(`Data selecionada: ${currentDate}`);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/fundoReflexao.png')}
      style={reflexaoPageStyles.backgroundImage}
    >
      <View style={reflexaoPageStyles.container}>
        
        <Text style={reflexaoPageStyles.greeting}>Vida</Text>
        <Reflexao/>
        <BottomBar /> 
      </View>
    </ImageBackground>
  );
}

export default ReflexaoVida;