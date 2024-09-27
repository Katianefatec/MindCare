import React, { createContext, useState, useContext, useEffect } from 'react';
import { collection, addDoc, onSnapshot, query, orderBy, doc, getDoc } from 'firebase/firestore';
import { db } from '../config/firebaseConfig';
import { Reflexao } from '../models/Reflexao';

const ReflexaoContext = createContext<any>(null);

export const ReflexaoProvider: React.FC<any> = ({ children }) => {
  const [reflexoes, setReflexoes] = useState<Reflexao[]>([]);

  useEffect(() => {
    const carregarReflexoes = async () => {
      const q = query(collection(db, 'reflexoes'), orderBy('data', 'desc'));
      onSnapshot(q, (snapshot) => {
        setReflexoes(
          snapshot.docs.map((doc) => ({ id: doc.id, ...doc.data() } as Reflexao)),
        );
      });
    };

    carregarReflexoes();
  }, []);

  const adicionarReflexao = async (reflexao: Reflexao) => {
    try {
      const docRef = await addDoc(collection(db, 'reflexoes'), reflexao);
      console.log('Reflexão adicionada com ID:', docRef.id);
    } catch (e) {
      console.error('Erro ao adicionar reflexão:', e);
    }
  };

  const obterReflexaoPorId = async (id: string): Promise<Reflexao | null> => {
    try {
      const docRef = doc(db, 'reflexoes', id);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        return { id: docSnap.id, ...docSnap.data() } as Reflexao;
      } else {
        console.log('Reflexão não encontrada!');
        return null;
      }
    } catch (error) {
      console.error('Erro ao obter reflexão:', error);
      return null;
    }
  };

  return (
    <ReflexaoContext.Provider value={{ reflexoes, adicionarReflexao, obterReflexaoPorId }}>
      {children}
    </ReflexaoContext.Provider>
  );
};

export const useReflexao = () => {
  const context = useContext(ReflexaoContext);
  if (!context) {
    throw new Error('useReflexao deve ser usado dentro de um ReflexaoProvider');
  }
  return context;
};