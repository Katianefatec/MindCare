import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

import homePage2Styles from '../styles/HomePage2Styles';
import Calma from  '../../components/navigation/Calma'
import BottomBar from '@/app/components/navigation/BottomBar';
import homePageStyles from '../styles/HomePageStyles';


const CalmaPage = () => {
  return (
    <ImageBackground 
      source={require('../../../assets/images/fundoCalma.png')}
      style={homePageStyles.backgroundImage}    >
      <View style={homePageStyles.container}>
        <Text style={homePage2Styles.greeting}>O que te acalma?</Text>
        <Calma />
        <BottomBar /> 
      </View>
    </ImageBackground>
  );
}

export default CalmaPage;