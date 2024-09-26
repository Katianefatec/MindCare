import React from 'react';
import { ImageBackground, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { router } from 'expo-router';
import BottomBar from '../../components/navigation/BottomBar';
import reflexaoPageStyles from '../styles/ReflexaoPageStyles';
import { FontAwesome } from '@expo/vector-icons';

const ReflexaoView = () => {
  const reflexoes = [
    { date: '06/09/2024, às 13:50', text: 'Não existem atalhos. O ingrediente do sucesso é o trabalho!' },
    { date: '07/09/2024, às 14:30', text: 'A persistência é o caminho do êxito.' },
    // Adicione mais reflexões conforme necessário
  ];

  const handleAdd = () => {
    router.push('/pages/reflexoes/ReflexaoBase');
  };

  const handleBack = () => {
    router.push('/pages/reflexoes/ReflexaoPage');
  };

  return (
    <ImageBackground 
      source={require('../../../assets/images/fundoReflexao.png')}
      style={reflexaoPageStyles.backgroundImage}
    >
      <View style={reflexaoPageStyles.container}>
        
        <View style={reflexaoPageStyles.header}>
          <TouchableOpacity onPress={handleBack} style={reflexaoPageStyles.iconLeft}>
            <FontAwesome name="arrow-left" size={24} color="gray" />
          </TouchableOpacity>
          <Text style={reflexaoPageStyles.greeting}>Armazenamento de Reflexões</Text>
          <TouchableOpacity onPress={handleAdd} style={reflexaoPageStyles.iconRight}>
            <FontAwesome name="plus" size={24} color="gray" />
          </TouchableOpacity>
        </View>
        
        <ScrollView style={reflexaoPageStyles.scrollView}>
          {reflexoes.map((reflexao, index) => (
            <View key={index} style={reflexaoPageStyles.card}>
              <Text style={reflexaoPageStyles.dateText}>{reflexao.date}</Text>
              <Text style={reflexaoPageStyles.reflexaoText}>{reflexao.text}</Text>
            </View>
          ))}
        </ScrollView>
        
        <BottomBar /> 
      </View>
    </ImageBackground>
  );
};

export default ReflexaoView;