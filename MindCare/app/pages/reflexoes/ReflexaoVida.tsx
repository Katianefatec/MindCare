import React from 'react';
import { Text, View } from 'react-native';
import { useReflexao } from '../../context/ReflexaoContext';

interface Reflexao {
  text: string;
}

const ReflexaoVida = () => {
  const { reflexoes }: { reflexoes: Reflexao[] } = useReflexao();

  return (
    <View>
      <Text>Vida</Text>
      {reflexoes.map((reflexao: Reflexao, index: number) => (
        <Text key={index}>{reflexao.text}</Text>
      ))}
    </View>
  );
};

export default ReflexaoVida;