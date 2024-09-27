import React from 'react';
import { Text, View } from 'react-native';
import { useReflexao } from '../../context/ReflexaoContext';

const ReflexaoTrabalho = () => {
  const { reflexoes } = useReflexao();

  return (
    <View>
      <Text>Trabalho</Text>
      {reflexoes.map((reflexao, index) => (
        <Text key={index}>{reflexao.text}</Text>
      ))}
    </View>
  );
};

export default ReflexaoTrabalho;