import React from 'react';
import { Text, View, ImageBackground } from 'react-native';
import BottomBar from '../BottomBar';
import homePage2Styles from '../styles/HomePage2Styles';
import Momento from '../Momento';

const HomePage2 = () => {
  return (
    <ImageBackground 
      source={require('../../assets/images/fundoHome.png')}
      style={homePage2Styles.backgroundImage}
    >
      <View style={homePage2Styles.container}>
        <Text style={homePage2Styles.greeting}>O que o momento pede?</Text>        

        <Momento />

        <BottomBar /> 
      </View>
    </ImageBackground>
  );
}

export default HomePage2;

