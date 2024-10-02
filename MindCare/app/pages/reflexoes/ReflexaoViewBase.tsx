import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import BottomBar from '../../components/navigation/BottomBar';
import reflexaoPageStyles from '../styles/ReflexaoPageStyles';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../../config/firebaseConfig';
import { collection, query, where, getDocs, deleteDoc, doc } from 'firebase/firestore';

interface Reflexao {
  id: string;
  date: string;
  text: string;
}

interface RouteParams {
  title: string;
}

const ReflexaoViewBase: React.FC = () => {
  const route = useRoute();
  const { title } = route.params as RouteParams;
  const [reflexoes, setReflexoes] = useState<Reflexao[]>([]);

  useEffect(() => {    
    if (!title) {
      console.error("Title is undefined");
      return;
    }

    const fetchReflexoes = async () => {
      try {
        const q = query(collection(db, 'reflexoes'), where('category', '==', title));
        const querySnapshot = await getDocs(q);
        const fetchedReflexoes: Reflexao[] = [];
        querySnapshot.forEach((doc) => {
          fetchedReflexoes.push({ id: doc.id, ...doc.data() } as Reflexao);
        });
        setReflexoes(fetchedReflexoes);
      } catch (error) {
        console.error("Erro ao buscar reflexões: ", error);
      }
    };

    fetchReflexoes();
  }, [title]);
  
  const handleDelete = (id: string) => {
    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja excluir esta reflexão?",
      [
        {
          text: "Cancelar",
          style: "cancel"
        },
        {
          text: "Excluir",
          onPress: async () => {
            try {
              await deleteDoc(doc(db, 'reflexoes', id));
              setReflexoes(reflexoes.filter(reflexao => reflexao.id !== id));
            } catch (error) {
              console.error("Erro ao excluir reflexão: ", error);
            }
          },
          style: "destructive"
        }
      ]
    );
  };

  return (
    <ImageBackground 
      source={require('../../../assets/images/fundoReflexao.png')}
      style={reflexaoPageStyles.backgroundImage}
    >
      <View style={reflexaoPageStyles.container}>
        
        <Text style={reflexaoPageStyles.greeting}>{title}</Text>
        
        <ScrollView style={reflexaoPageStyles.scrollView}>
          {reflexoes.map((reflexao, index) => (
            <View key={index} style={reflexaoPageStyles.cardView}>
              <Text style={reflexaoPageStyles.dateText}>{reflexao.date}</Text>
              <Text style={reflexaoPageStyles.reflexaoText}>{reflexao.text}</Text>
              <TouchableOpacity onPress={() => handleDelete(reflexao.id)} style={reflexaoPageStyles.deleteButton}>
                <FontAwesome name="times" size={24} color="red" />
              </TouchableOpacity>
            </View>
          ))}
        </ScrollView>
        
        <BottomBar /> 
      </View>
    </ImageBackground>
  );
};

export default ReflexaoViewBase;