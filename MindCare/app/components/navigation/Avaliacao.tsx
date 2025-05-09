import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import avaliacaoStyles from '../styles/AvaliacaoStyles';

interface QuestionarioProps {
  questionText: string;
  questionId: number;
  onNext: () => void;
  onPrevious?: () => void;
  updateScores: (questionId: number, optionValue: number) => void;
  isLastQuestion: boolean;
}

const Questionario: React.FC<QuestionarioProps> = ({ questionText, questionId, onNext, onPrevious, updateScores }) => {
  const [selectedOption, setSelectedOption] = useState<number | null>(null);

  useEffect(() => {
    setSelectedOption(null); // Reset selected option when question changes
  }, [questionId]);

  const options = [
    'Não se aplicou de maneira alguma',
    'Aplicou-se em algum grau ou por pouco tempo',
    'Aplicou-se em um grau considerável ou por uma boa parte de tempo',
    'Aplicou-se em grau elevado ou na maioria do tempo'
  ];

  const handleOptionPress = (optionValue: number) => {
    setSelectedOption(optionValue);
    updateScores(questionId, optionValue);
    console.log(`Question ${questionId}: Selected option ${optionValue}`);
  };

  return (
    <View>
    <View style={avaliacaoStyles.avaliacaoOptions}>
      <Text style={avaliacaoStyles.textQuestion}>{questionText}</Text>
      
        {options.map((option, index) => (
          <TouchableOpacity
            key={index}
            onPress={() => handleOptionPress(index)}
            style={avaliacaoStyles.optionContainer}
          >
            <View style={[avaliacaoStyles.circle, selectedOption === index && avaliacaoStyles.selectedCircle]} />
            <Text style={avaliacaoStyles.optionText}>{option}</Text>
          </TouchableOpacity>
        ))}
      </View>
      <View style={avaliacaoStyles.buttonContainer}>
        {onPrevious && (
          <TouchableOpacity onPress={onPrevious} style={avaliacaoStyles.avaliacaoButton}>
            <Text style={avaliacaoStyles.avaliacaoButtonText}>Anterior</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity onPress={onNext} style={avaliacaoStyles.avaliacaoButton}>
          <Text style={avaliacaoStyles.avaliacaoButtonText}>Próximo</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default Questionario;