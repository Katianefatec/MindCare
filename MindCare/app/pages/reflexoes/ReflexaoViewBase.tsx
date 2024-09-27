// MindCare/app/pages/reflexoes/ReflexaoViewBase.tsx
import React from 'react';
import { View, Text } from 'react-native';
import { useReflexao } from '../../context/ReflexaoContext';

interface ReflexaoViewBaseProps {
  categoria: string;
}

const ReflexaoViewBase: React.FC<ReflexaoViewBaseProps> = ({ categoria }) => {
  const { reflexoes }: { reflexoes: { text: string }[] } = useReflexao();

  return (
    <View>
      <Text>{categoria}</Text>
      {reflexoes.map((reflexao, index) => (
        <Text key={index}>{reflexao.text}</Text>
      ))}
    </View>
  );
};

export default ReflexaoViewBase;