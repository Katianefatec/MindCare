import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

import calmaStyles from './css/CalmaStyles';
import Calma from  '../../components/navigation/Calma'
import BottomBar from '../../components/navigation/BottomBar';



const CalmaPage = () => {
  return (
    <ImageBackground 
      source={require('../../../assets/images/fundoCalma.png')}
      style={calmaStyles.backgroundImage}    >
      <View style={calmaStyles.container}>
        <Text style={calmaStyles.greeting}>O que te acalma?</Text>
        <Calma />
        <BottomBar /> 
      </View>
    </ImageBackground>
  );
}

export default CalmaPage;