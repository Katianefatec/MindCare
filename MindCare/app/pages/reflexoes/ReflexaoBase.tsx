// app/pages/reflexoes/ReflexaoBase.tsx
import React, { useState } from 'react';
import { ImageBackground, Text, View, TextInput, Pressable } from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native'; // Importe useNavigation e useRoute
import BottomBar from '../../components/navigation/BottomBar';
import reflexaoPageStyles from '../styles/ReflexaoPageStyles';
import { FontAwesome } from '@expo/vector-icons';
import { useReflexao } from '../../context/ReflexaoContext';
import { ReflexaoVida } from '../../classes/ReflexaoVida'; // Importe as classes de reflexão
import { ReflexaoAmor } from '../../classes/ReflexaoAmor';
import { ReflexaoFamilia } from '../../classes/ReflexaoFamilia';
import { ReflexaoTrabalho } from '../../classes/ReflexaoTrabalho';

const ReflexaoBase = () => {
  const [texto, setTexto] = useState('');
  const { adicionarReflexao } = useReflexao();
  const navigation = useNavigation(); // Use o hook useNavigation
  const route = useRoute(); // Use o hook useRoute
  const { categoria } = route.params as { categoria: string }; // Acesse a categoria

  const handleSave = () => {
    let novaReflexao;

    // Lógica para determinar o tipo de Reflexao com base na categoria:
    switch (categoria) {
      case 'Vida':
        novaReflexao = new ReflexaoVida(texto);
        break;
      case 'Amor':
        novaReflexao = new ReflexaoAmor(texto);
        break;
      case 'Família':
        novaReflexao = new ReflexaoFamilia(texto);
        break;
      case 'Trabalho':
        novaReflexao = new ReflexaoTrabalho(texto);
        break;
      default:
        console.error('Categoria inválida!');
        return; 
    }

    adicionarReflexao(novaReflexao.obterReflexao())
      .then(() => {
        navigation.goBack(); // Navega de volta após salvar
      })
      .catch((error: any) => {
        console.error('Erro ao salvar reflexão:', error);
      });
  };

  return (
    <ImageBackground
      source={require('../../../assets/images/fundoReflexao.png')}
      style={reflexaoPageStyles.backgroundImage}
    >
      <View style={reflexaoPageStyles.container}>
        <Text style={reflexaoPageStyles.greeting}>{categoria}</Text>

        <View style={reflexaoPageStyles.card}>
          <Pressable 
            onPress={() => navigation.goBack()} 
            style={reflexaoPageStyles.iconLeft}
          >
            <FontAwesome name="times" size={24} color="red" />
          </Pressable>
          <Pressable onPress={handleSave} style={reflexaoPageStyles.iconRight}>
            <FontAwesome name="check-square" size={24} color="green" />
          </Pressable>
          <TextInput
            style={reflexaoPageStyles.textInput}
            placeholder={`Digite aqui sua reflexão sobre ${categoria}`}
            placeholderTextColor="#4A4A4A"
            multiline
            value={texto}
            onChangeText={setTexto}
          />
        </View>

        <BottomBar /> 
      </View>
    </ImageBackground>
  );
};

export default ReflexaoBase;