import React from 'react';
import { ImageBackground, Text, View } from 'react-native';

import homePage2Styles from '../styles/HomePage2Styles';
import Calma from  '../../components/navigation/Calma'
import BottomBar from '@/app/components/navigation/BottomBar';


const Respirar = () => {
  return (
   
    <View style={[homePage2Styles.container, { backgroundColor: '#41ACBB' }]}>
        <Text style={homePage2Styles.greeting}>Respirar</Text>
        <Calma />
        <BottomBar /> 
      </View>
    
  );
}

export default Respirar;