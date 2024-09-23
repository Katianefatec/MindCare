import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import EmojiGrid from '../components/navigation/EmojiGrid';
import BottomBar from '../components/navigation/BottomBar';
import homePageStyles from './styles/HomePageStyles';

const HomePage = () => {
  return (
    <ImageBackground 
      source={require('../../assets/images/fundoHome.png')}
      style={homePageStyles.backgroundImage}
    >
      <View style={homePageStyles.container}>
        <Text style={homePageStyles.greeting}>Bom dia, Gerson!</Text>
        <Text style={homePageStyles.question}>Qual o sentimento de hoje?</Text>

        <EmojiGrid />

        <BottomBar /> 
      </View>
    </ImageBackground>
  );
}

export default HomePage;

