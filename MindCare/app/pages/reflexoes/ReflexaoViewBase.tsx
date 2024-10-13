import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import { useRoute } from '@react-navigation/native';
import { Calendar, DateData } from 'react-native-calendars';
import BottomBar from '../../components/navigation/BottomBar';
import reflexaoPageStyles from '../styles/ReflexaoPageStyles';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { db, auth } from '../../config/firebaseConfig';
import moment from 'moment';
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
  const [search, setSearch] = useState('');
  const [markedDates, setMarkedDates] = useState<{ [key: string]: { startingDay?: boolean; endingDay?: boolean; color: string; textColor: string } }>({});
  const [startDate, setStartDate] = useState<string | null>(null);
  const [endDate, setEndDate] = useState<string | null>(null);
  const [showCalendar, setShowCalendar] = useState(false);

  const onDayPress = (day: DateData) => {
    if (!startDate || (startDate && endDate)) {
      setStartDate(day.dateString);
      setEndDate(null);
      setMarkedDates({
        [day.dateString]: { startingDay: true, color: '#50cebb', textColor: 'white' }
      });
    } else {
      const newMarkedDates = { ...markedDates };
      const start = new Date(startDate);
      const end = new Date(day.dateString);
      const range = [];

      if (start < end) {
        for (let d = start; d <= end; d.setDate(d.getDate() + 1)) {
          range.push(new Date(d));
        }
      } else {
        for (let d = end; d <= start; d.setDate(d.getDate() + 1)) {
          range.push(new Date(d));
        }
      }

      range.forEach((d, index) => {
        const dateString = d.toISOString().split('T')[0];
        newMarkedDates[dateString] = {
          color: '#50cebb',
          textColor: 'white',
          startingDay: index === 0,
          endingDay: index === range.length - 1
        };
      });

      setStartDate(startDate);
      setEndDate(day.dateString);
      setMarkedDates(newMarkedDates);
      setShowCalendar(false); 
    }
  };

  useEffect(() => {
    if (!title) {
      console.error("Title is undefined");
      return;
    }

    const fetchReflexoes = async () => {
      const user = auth.currentUser;
      if (!user) {
        console.error("Usuário não autenticado");
        return;
      }

      try {
        let q = query(
          collection(db, 'reflexoes'),
          where('category', '==', title),
          where('userId', '==', user.uid)
        );

        // Busca por palavra-chave (usando ">=" e "<=")
        if (search) {
          q = query(q, where('text', '>', search), where('text', '<', search + '\uf8ff')); 
        }

        // Filtro por data (usando moment.js)
        if (startDate && endDate) {
          const startTimestamp = moment(startDate, 'DD/MM/YYYY HH:mm:ss').valueOf();
          const endTimestamp = moment(endDate, 'DD/MM/YYYY HH:mm:ss').valueOf();
          q = query(q, where('date', '>=', startTimestamp), where('date', '<=', endTimestamp));
        }

        const querySnapshot = await getDocs(q);
        const fetchedReflexoes: Reflexao[] = [];
        querySnapshot.forEach((doc) => {
          fetchedReflexoes.push({ id: doc.id, ...doc.data() } as Reflexao); // Não precisa converter a data para timestamp aqui
        });
        setReflexoes(fetchedReflexoes);
      } catch (error) {
        console.error("Erro ao buscar reflexões: ", error);
      }
    };

    fetchReflexoes();
  }, [title, search, startDate, endDate]); 
  const handleDelete = async (id: string) => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Erro: Usuário não autenticado.");
      return;
    }

    try {
      console.log(`Tentando excluir documento com ID: ${id}`);
      await deleteDoc(doc(db, 'reflexoes', id));
      console.log(`Documento com ID: ${id} excluído com sucesso.`);
      setReflexoes(reflexoes.filter(reflexao => reflexao.id !== id));
    } catch (error) {
      console.error("Erro ao excluir reflexão: ", error);
    }
  };

  const confirmDelete = (id: string) => {
    Alert.alert(
      "Excluir reflexão",
      "Você tem certeza que deseja excluir esta reflexão?",
      [
        {
          text: "Não",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Sim", onPress: () => handleDelete(id) }
      ],
      { cancelable: false }
    );
  };

  return (
    <ImageBackground 
      source={require('../../../assets/images/fundoReflexao.png')}
      style={reflexaoPageStyles.backgroundImage}
    >
      <View style={reflexaoPageStyles.searchContainer}>
        <TextInput
          style={reflexaoPageStyles.searchInput}
          placeholder="Buscar inspiração"
          value={search}
          onChangeText={setSearch}
        />
        <TouchableOpacity onPress={() => setShowCalendar(!showCalendar)}>
          <MaterialCommunityIcons name="calendar" size={24} color="#000" style={reflexaoPageStyles.calendarioIcon} />
        </TouchableOpacity>
      </View>
      {showCalendar && (
        <Calendar
          markingType={'period'}
          markedDates={markedDates}
          onDayPress={onDayPress}
        />
      )}
      <View style={reflexaoPageStyles.container2}>
        <Text style={reflexaoPageStyles.greeting2}>Reflexões sobre {title}</Text>
        <ScrollView style={reflexaoPageStyles.scrollView} contentContainerStyle={{ paddingBottom: 70 }}>
          {reflexoes.map((reflexao, index) => (
            <View key={index} style={reflexaoPageStyles.cardView}>
              <Text style={reflexaoPageStyles.dateText}>{reflexao.date}</Text>
              <Text style={reflexaoPageStyles.reflexaoText}>{reflexao.text}</Text>
              <TouchableOpacity onPress={() => confirmDelete(reflexao.id)} style={reflexaoPageStyles.deleteButton}>
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