import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, ScrollView, Alert, TextInput } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { useRoute } from '@react-navigation/native';
import BottomBar from '../../components/navigation/BottomBar';
import reflexaoPageStyles from '../styles/ReflexaoPageStyles';
import { FontAwesome, MaterialCommunityIcons } from '@expo/vector-icons';
import { db, auth } from '../../config/firebaseConfig';
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
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [show, setShow] = useState(false);
  const [date, setDate] = useState(new Date());

  const showDatepicker = () => {
    setShow(true);
  };

  const onChange = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || date;
    setShow(false);
    setDate(currentDate);
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
        const q = query(
          collection(db, 'reflexoes'),
          where('category', '==', title),
          where('userId', '==', user.uid)
        );
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
          <TouchableOpacity onPress={showDatepicker}>
            <MaterialCommunityIcons name="calendar" size={24} color="#000" style={reflexaoPageStyles.calendarioIcon} />
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        
      <View style={reflexaoPageStyles.container2}>
        
        <Text style={reflexaoPageStyles.greeting2}>Reflexões sobre {title}</Text>
        
        <ScrollView style={reflexaoPageStyles.scrollView}>
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