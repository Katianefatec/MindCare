const calculateResults = (scores: { [key: string]: number }) => {
  let stressScore = 0;
  let anxietyScore = 0;
  let depressionScore = 0;

  // Perguntas relacionadas a Stress (1, 6, 8, 11, 12, 14, 18)
  const stressQuestions = ['01', '06', '08', '11', '12', '14', '18'];
  stressQuestions.forEach(key => {
    if (scores[key] !== undefined) {
      stressScore += scores[key];
    }
  });

  // Perguntas relacionadas a Ansiedade (2, 4, 7, 9, 15, 19, 20)
  const anxietyQuestions = ['02', '04', '07', '09', '15', '19', '20'];
  anxietyQuestions.forEach(key => {
    if (scores[key] !== undefined) {
      anxietyScore += scores[key];
    }
  });

  // Perguntas relacionadas a Depressão (3, 5, 10, 13, 16, 17, 21)
  const depressionQuestions = ['03', '05', '10', '13', '16', '17', '21'];
  depressionQuestions.forEach(key => {
    if (scores[key] !== undefined) {
      depressionScore += scores[key];
    }
  });

  // Classificação dos resultados 
  const classifyScore = (score: number, thresholds: number[]) => {
    if (score <= thresholds[0]) return 'Normal';
    if (score <= thresholds[1]) return 'Leve';
    if (score <= thresholds[2]) return 'Moderado';
    if (score <= thresholds[3]) return 'Grave';
    return 'Extremamente Grave';
  };

  const stressLevel = classifyScore(stressScore, [7, 9, 14, 18]);
  const anxietyLevel = classifyScore(anxietyScore, [4, 6, 8, 10]);
  const depressionLevel = classifyScore(depressionScore, [9, 13, 20, 27]);

  return {
    stress: stressLevel,
    anxiety: anxietyLevel,
    depression: depressionLevel,
    totalScore: stressScore + anxietyScore + depressionScore 
  };
};

export default calculateResults;