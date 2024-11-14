import React, { useState } from 'react';
import { Text, View } from 'react-native';
import BottomBar from '../components/navigation/BottomBar';
import Questionario from '../components/navigation/Avaliacao';
import { NavigationProp } from '@react-navigation/native';
import calculateResults from '../components/navigation/CalculoAvaliacao';
import avaliacaoStyles from '../components/styles/AvaliacaoStyles';
import Instrucoes from '../components/navigation/InstrucoesAvaliacao';
import { router } from 'expo-router';




const questions = [
    "01. Achei difícil me acalmar",
    "02. Senti minha boca seca",
    "03. Não consegui vivenciar nenhum sentimento positivo",
    // ... demais perguntas
];

const Avaliacao = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState<Record<number, number>>({});
    const [showInstructions, setShowInstructions] = useState(true);

    const updateScores = (questionId: number, optionValue: number) => {
        setScores(prevScores => ({ ...prevScores, [questionId]: optionValue }));
    };

    const handleNextQuestion = () => {
      if (currentQuestion < questions.length - 1) {
        setCurrentQuestion(prevQuestion => prevQuestion + 1);
      } else {
        const results = calculateResults(scores);
        router.push({
          pathname: '/components/navigation/Resultado', 
          params: { results: JSON.stringify(results) }, 
        });
      }
    };

    const handlePreviousQuestion = () => {
        if (currentQuestion > 0) {
            setCurrentQuestion(prevQuestion => prevQuestion - 1);
        }
    };


    return (
        <View style={[avaliacaoStyles.container, { backgroundColor: '#41ACBB' }]}>
             {showInstructions ? (
                <Instrucoes  onConcluir={() => setShowInstructions(false)} />
                
            ) : (
                <>
                    <Text style={avaliacaoStyles.greeting}>Avaliação</Text>
                    {currentQuestion < questions.length ? (
                        <Questionario
                            questionText={questions[currentQuestion]}
                            questionId={currentQuestion + 1}
                            updateScores={updateScores}
                            isLastQuestion={currentQuestion === questions.length - 1}
                            onNext={handleNextQuestion}
                            onPrevious={currentQuestion > 0 ? handlePreviousQuestion : undefined}
                        />
                    ) : (
                        <Text>Questionário concluído! Navegue para a tela de resultados.</Text>
                    )}
                    <BottomBar />
                </>
            )}


        </View>
    );
};

export default Avaliacao;