import Momento from '../components/navigation/Momento';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import BottomBar from '../components/navigation/BottomBar';
import homePage2Styles from './styles/HomePage2Styles';

const Apoio = () => {
  return (
    <ImageBackground 
      source={require('../../assets/images/fundoHome.png')}
      style={homePage2Styles.backgroundImage}
    >
      <View style={homePage2Styles.container}>
        <Text style={homePage2Styles.greeting}>Pesquise o profissional</Text>
        <Momento/>
        <BottomBar /> 
      </View>
    </ImageBackground>
  );
}

export default Apoio;