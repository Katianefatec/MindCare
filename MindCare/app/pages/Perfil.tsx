import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Switch, Image } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db } from '../config/firebaseConfig'; 
import { collection, getDocs, query, where } from 'firebase/firestore';
import BottomBar from '../components/navigation/BottomBar';
import PerfilStyles from './styles/PerfilStyles';

const Perfil = () => {
  const [emotionsData, setEmotionsData] = useState<EmotionData[]>([]);

  useEffect(() => {
    const fetchEmotionsData = async () => {
      const user = auth.currentUser;
      if (user) {
        const q = query(collection(db, 'emotions'), where('userId', '==', user.uid));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          emotion: doc.data().emotion
        })) as EmotionData[];
        setEmotionsData(data);
      }
    };

    fetchEmotionsData();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('Usuário deslogado com sucesso!');
    } catch (error) {
      console.error('Erro ao deslogar:', error);
    }
  };

  return (
    <View style={PerfilStyles.container}>
      
      <Text style={PerfilStyles.title}>Perfil</Text>
      <View style={PerfilStyles.card}>
        <View style={PerfilStyles.cardItem}>
          <FontAwesome name="edit" size={24} color="black" />
          <Text style={PerfilStyles.cardText}>Editar perfil</Text>
        </View>
        <View style={PerfilStyles.cardItem}>
          <FontAwesome name="bell" size={24} color="black" />
          <Text style={PerfilStyles.cardText}>Notificações</Text>
          <Switch style={PerfilStyles.switch} />
        </View>
        <View style={PerfilStyles.cardItem} onTouchEnd={handleSignOut}>
          <FontAwesome name="sign-out" size={24} color="black" />
          <Text style={PerfilStyles.cardText}>Sair</Text>
        </View>
      </View>
      <ChartCard emotionsData={emotionsData} />
      <BottomBar />
    </View>
  );
};

interface EmotionData {
  emotion: string;
}

interface ChartCardProps {
  emotionsData: EmotionData[];
}

const ChartCard: React.FC<ChartCardProps> = ({ emotionsData }) => {
  const emotionCounts = emotionsData.reduce((acc: { [key: string]: number }, emotion) => {
    acc[emotion.emotion] = (acc[emotion.emotion] || 0) + 1;
    return acc;
  }, {});

  return (
    <View style={PerfilStyles.chartCard}>
      <Text style={PerfilStyles.chartTitle}>Ranking das emoções</Text>
      <Text style={PerfilStyles.chartSubtitle}>(dias x sentimento)</Text>
      <FontAwesome name="calendar" size={24} color="black" style={PerfilStyles.calendarIcon} />
      <Image source={{ uri: 'https://placehold.co/300x200' }} style={PerfilStyles.chartImage} />
      <View style={PerfilStyles.emojis}>
        {Object.keys(emotionCounts).map(emotion => (
          <View key={emotion} style={PerfilStyles.emojiItem}>
            <Text style={PerfilStyles.emojiLabel}>{emotion}</Text>
            <Text style={PerfilStyles.emojiCount}>{emotionCounts[emotion]}</Text>
          </View>
        ))}
      </View>
    </View>
  );
};



export default Perfil;