import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import avaliacaoStyles from '../styles/AvaliacaoStyles';


interface InstrucoesProps {
    onConcluir: () => void;
}

const Instrucoes: React.FC<InstrucoesProps> = ({ onConcluir }) => {


    return (
        <View style={avaliacaoStyles.container}>
            <Text style={avaliacaoStyles.greeting}>Instruções</Text>
            <Text>Leia cuidadosamente cada uma das perguntas e responda considerando o que você sentiu apenas nos últimos sete dias (na última semana).</Text>
  

            <TouchableOpacity onPress={onConcluir} style={avaliacaoStyles.avaliacaoButton}>
                <Text style={avaliacaoStyles.avaliacaoButtonText}>OK</Text>
            </TouchableOpacity>
        </View>
    );
};

export default Instrucoes;