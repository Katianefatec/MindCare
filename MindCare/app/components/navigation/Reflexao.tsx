import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import reflexaoStyles from '../styles/ReflexaoStyles';
import { router } from 'expo-router';


const Reflexao = () => {
  const reflexoes = [
    { name: 'Vida', style: reflexaoStyles.vida },
    { name: 'Amor', style: reflexaoStyles.amor },
    { name: 'Família', style: reflexaoStyles.familia },
    { name: 'Trabalho', style: reflexaoStyles.trabalho },        
  ];

  const handleReflexaoPress = (reflexaoName: string) => {
    console.log(`Opção ${reflexaoName} pressionada!`);     
    switch (reflexaoName) {
      case 'Vida':
        router.push(`/pages/ReflexaoVida`);
        break;
      case 'Amor':
        router.push(`/pages/ReflexaoAmor`);
        break;
      case 'Família':
        router.push(`/pages/ReflexaoFamilia`);
        break;
      case 'Trabalho':
        router.push(`/pages/ReflexaoTrabalho`);
        break;
    }    
  };

  return (
    <View style={reflexaoStyles.reflexao}>
      {reflexoes.map((reflexao) => (
        <TouchableOpacity 
          key={reflexao.name} 
          style={reflexaoStyles.reflexaoButton} 
          onPress={() => handleReflexaoPress(reflexao.name)}
        >
          <View style={[reflexaoStyles.reflexaoBox, reflexao.style]}>            
            <Text style={reflexaoStyles.reflexaoLabel}>{reflexao.name}</Text>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default Reflexao;