import React from 'react';
import ReflexaoViewBase from './ReflexaoViewBase';

const ReflexaoViewVida = () => {
  const title = "Vida"; // Definindo a variável title
  console.log("Opção Vida pressionada! Title?", title); // Adicionando log para depuração
  return <ReflexaoViewBase title={title} />;
};

export default ReflexaoViewVida;