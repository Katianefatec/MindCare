import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import reflexaoStyles from '../styles/ReflexaoStyles';
import { router } from 'expo-router';

const reflexaoRoutes = {
  'Vida': '/pages/reflexoes/ReflexaoVida',
  'Amor': '/pages/reflexoes/ReflexaoAmor',
  'Família': '/pages/reflexoes/ReflexaoFamilia',
  'Trabalho': '/pages/reflexoes/ReflexaoTrabalho',
  
};

const Reflexao = () => {
  const reflexoes = [
    { name: 'Vida', style: reflexaoStyles.vida },
    { name: 'Amor', style: reflexaoStyles.amor },
    { name: 'Família', style: reflexaoStyles.familia },
    { name: 'Trabalho', style: reflexaoStyles.trabalho },        
  ];

  const handleReflexaoPress = (reflexaoName: keyof typeof reflexaoRoutes) => {
      console.log(`Opção ${reflexaoName} pressionada!`);     
      router.push(reflexaoRoutes[reflexaoName] as any);
  };

  return (
    <View style={reflexaoStyles.reflexao}>
      {reflexoes.map((reflexao) => (
        <TouchableOpacity 
          key={reflexao.name} 
          style={reflexaoStyles.reflexaoButton} 
          onPress={() => handleReflexaoPress(reflexao.name as keyof typeof reflexaoRoutes)}
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