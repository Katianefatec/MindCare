import React from 'react';
import { Text, View } from 'react-native';
import { useReflexao } from '../../context/ReflexaoContext';

const ReflexaoFamilia = () => {
  const { reflexoes } = useReflexao();

  return (
    <View>
      <Text>Família</Text>
      {reflexoes.map((reflexao, index) => (
        <Text key={index}>{reflexao.text}</Text>
      ))}
    </View>
  );
};

export default ReflexaoFamilia;