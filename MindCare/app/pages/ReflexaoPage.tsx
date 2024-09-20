import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import BottomBar from '../../components/navigation/BottomBar';

import reflexaoPageStyles from './styles/ReflexaoPageStyles';
import Reflexao from '@/components/navigation/Reflexao';

const ReflexaoPage = () => {
  return (
    <ImageBackground 
      source={require('../../assets/images/fundoReflexao.png')}
      style={reflexaoPageStyles.backgroundImage}
    >
      <View style={reflexaoPageStyles.container}>
        <Text style={reflexaoPageStyles.greeting}>O que te inspira?</Text>
        <Reflexao/>
        <BottomBar /> 
      </View>
    </ImageBackground>
  );
}

export default ReflexaoPage;