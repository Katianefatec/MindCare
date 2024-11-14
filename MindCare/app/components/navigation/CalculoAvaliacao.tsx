const calculateResults = (scores: { [key: string]: number }) => {
    let stressScore = 0;
    let anxietyScore = 0;
    let depressionScore = 0;
  
    // Perguntas relacionadas a Stress (1, 2, 4, 8, 10, 21)
    const stressQuestions = ['01', '02', '04', '08', '10', '21'];
    stressQuestions.forEach(key => {
        if(scores[key] !== undefined){
            stressScore += scores[key];
        }
    })
  
    // Perguntas relacionadas a Ansiedade (7, 9, 11, 15)
    const anxietyQuestions = ['07', '09', '11', '15'];
    anxietyQuestions.forEach(key => {
        if(scores[key] !== undefined){
            anxietyScore += scores[key];
        }
    })
  
    // Perguntas relacionadas a Depressão (3, 13, 17)
    const depressionQuestions = ['03', '13', '17'];
    depressionQuestions.forEach(key => {
        if(scores[key] !== undefined){
            depressionScore += scores[key];
        }
    })
  
    // Classificação dos resultados (adapte as faixas de acordo com suas necessidades)
  
    let stressLevel: 'Suave' | 'Moderado' | 'Grave' = 'Suave';
    if (stressScore > 10 && stressScore <= 18) {
      stressLevel = 'Moderado';
    } else if (stressScore > 18) {
      stressLevel = 'Grave';
    }
  
    let anxietyLevel: 'Suave' | 'Moderado' | 'Grave' = 'Suave';
    if (anxietyScore > 6 && anxietyScore <= 12) {
      anxietyLevel = 'Moderado';
    } else if (anxietyScore > 12) {
      anxietyLevel = 'Grave';
    }
  
    let depressionLevel: 'Suave' | 'Moderado' | 'Grave' = 'Suave';
    if (depressionScore > 4 && depressionScore <= 9) {
        depressionLevel = 'Moderado';
      } else if (depressionScore > 9) {
        depressionLevel = 'Grave';
      }
  
    return {
        stress: stressLevel,
        anxiety: anxietyLevel,
        depression: depressionLevel,
        totalScore: stressScore + anxietyScore + depressionScore 
    };
  };
  
  export default calculateResults;