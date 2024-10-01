import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import BottomBar from '../components/navigation/BottomBar';
import homePage2Styles from './styles/HomePage2Styles';
import Calma from '../components/navigation/calma';


const CalmaPage = () => {
  return (
    <ImageBackground 
      source={require('../../assets/images/fundoHome.png')}
      style={homePage2Styles.backgroundImage}
    >
      <View style={homePage2Styles.container}>
        <Text style={homePage2Styles.greeting}>Como você se acalma?</Text>
        <Calma />
        <BottomBar /> 
      </View>
    </ImageBackground>
  );
}

export default CalmaPage;