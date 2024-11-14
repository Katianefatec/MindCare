import Momento from '../components/navigation/Momento';
import React from 'react';
import { ImageBackground, Text, View } from 'react-native';
import BottomBar from '../components/navigation/BottomBar';
import homePage2Styles from './styles/HomePage2Styles';

const Apoio = () => {
  return (
    
    <View style={[homePage2Styles.container, { backgroundColor: '#41ACBB' }]}>
        <Text style={homePage2Styles.greeting}>Pesquise o profissional</Text>
        
        <BottomBar /> 
      </View>
    );
}

export default Apoio;