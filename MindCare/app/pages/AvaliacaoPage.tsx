import React, { useState } from 'react';
import { Text, View, ScrollView } from 'react-native';
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
    "04. Senti falta de ar em alguns momentos, mesmo sem ter feito nenhum esforço físico",
    "05. Achei difícil ter iniciativa para fazer as coisas",
    "06. Tive a tendência de reagir de forma exagerada às situações",
    "07. Senti tremores (por exemplo, nas mãos)",
    "08. Senti que estava muito nervoso(a)",
    "09. Preocupei-me com situações em que eu pudesse entrar em pânico e parecesse ridículo (a)",
    "10. Senti que não tinha nada pelo que esperar no futuro",
    "11. Senti-me agitado (a)",
    "12. Senti que estava prestes a entrar em pânico",
    "13. Tive dificuldade em relaxar",
    "14. Fui intolerante com as coisas que me impediam de continuar o que eu estava fazendo",
    "15. Não consegui me entusiasmar com nada",
    "16. Senti que não tinha valor como pessoa",    
    "17.  Senti que estava um pouco emotivo(a)/sensível demais",
    "18. Não consegui vivenciar nenhum sentimento positivo",
    "19. Sabia que meu coração estava alterado mesmo não tendo feito nenhum esforço físico (ex. aumento da frequência cardíaca, disritmia cardíaca)",
    "20. Senti medo sem motivo",
    "21. Senti que a vida não tinha sentido para mim",
    "22.  Senti-me depressivo (a) e sem ânimo",
];

const Avaliacao = ({ navigation }: { navigation: NavigationProp<any> }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [scores, setScores] = useState<Record<number, number>>({});
    const [showInstructions, setShowInstructions] = useState(true);

    const updateScores = (questionId: number, optionValue: number) => {
        setScores(prevScores => ({ ...prevScores, [questionId]: optionValue }));
        console.log(`Updated scores:`, scores);
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
                <Instrucoes onConcluir={() => setShowInstructions(false)} />
            ) : (
                <ScrollView contentContainerStyle={avaliacaoStyles.scrollViewContent}>
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
                    
                </ScrollView>
                
            )}
            <BottomBar />
        </View>
    );
};

export default Avaliacao;