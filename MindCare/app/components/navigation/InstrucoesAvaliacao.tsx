import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import avaliacaoStyles from '../styles/AvaliacaoStyles';


interface InstrucoesProps {
    onConcluir: () => void;
}

const Instrucoes: React.FC<InstrucoesProps> = ({ onConcluir }) => {


    return (
        <View style={avaliacaoStyles.container2}>
            <Text style={avaliacaoStyles.greeting}>Instruções</Text>
            <View style={avaliacaoStyles.paragraphContainer}>
        <Text style={avaliacaoStyles.text}>
          Este questionário é composto por 10 perguntas.
        </Text>
        <Text style={avaliacaoStyles.text}>
          Leia cuidadosamente cada uma das perguntas e responda considerando o que você sentiu apenas nos últimos sete dias (na última semana).
        </Text>
        <Text style={avaliacaoStyles.text}>
          Se você tiver dúvidas, peça ajuda a um profissional de saúde.
        </Text>
      </View>
       

            <TouchableOpacity onPress={onConcluir} style={avaliacaoStyles.avaliacaoButton}>
                <Text style={avaliacaoStyles.avaliacaoButtonText}>OK</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Instrucoes;