import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, ScrollView } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { router } from 'expo-router';
import BottomBar from '../../components/navigation/BottomBar';
import reflexaoPageStyles from '../styles/ReflexaoPageStyles';
import { FontAwesome } from '@expo/vector-icons';
import { db } from '../../config/firebaseConfig';
import { collection, query, where, getDocs } from 'firebase/firestore';

interface Reflexao {
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
          fetchedReflexoes.push(doc.data() as Reflexao);
        });
        setReflexoes(fetchedReflexoes);
      } catch (error) {
        console.error("Erro ao buscar reflexões: ", error);
      }
    };

    fetchReflexoes();
  }, [title]);

  const handleAdd = () => {
    router.push('/pages/reflexoes/ReflexaoBase');
  };

  const handleBack = () => {
    router.push('/pages/reflexoes/ReflexaoPage');
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
            </View>
          ))}
        </ScrollView>
        
        <BottomBar /> 
      </View>
    </ImageBackground>
  );
};

export default ReflexaoViewBase;