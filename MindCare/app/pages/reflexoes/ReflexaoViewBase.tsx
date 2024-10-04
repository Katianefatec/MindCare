import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, ScrollView, Modal, TextInput } from 'react-native';
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
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [search, setSearch] = useState('');
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [isStartDatePicker, setIsStartDatePicker] = useState(true);
  const [startDate, setStartDate] = useState(new Date());
  const [endDate, setEndDate] = useState(new Date());

  const onChangeDate = (event: any, selectedDate: Date | undefined) => {
    const currentDate = selectedDate || (isStartDatePicker ? startDate : endDate);
    setShowDatePicker(false);
    if (isStartDatePicker) {
      setStartDate(currentDate);
    } else {
      setEndDate(currentDate);
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

  const handleDelete = async () => {
    if (!selectedId) return;

    const user = auth.currentUser;
    if (!user) {
      console.error("Erro: Usuário não autenticado.");
      setModalVisible(false);
      return;
    }

    try {
      console.log(`Tentando excluir documento com ID: ${selectedId}`);
      await deleteDoc(doc(db, 'reflexoes', selectedId));
      console.log(`Documento com ID: ${selectedId} excluído com sucesso.`);
      setReflexoes(reflexoes.filter(reflexao => reflexao.id !== selectedId));
      setModalVisible(false);
    } catch (error) {
      console.error("Erro ao excluir reflexão: ", error);
      setModalVisible(false);
    }
  };

  const confirmDelete = (id: string) => {
    setSelectedId(id);
    setModalVisible(true);
  };

  const handleSearch = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Usuário não autenticado");
      return;
    }

    try {
      const startFormattedDate = startDate.toLocaleDateString('pt-BR');
      const endFormattedDate = endDate.toLocaleDateString('pt-BR');
      const q = query(
        collection(db, 'reflexoes'),
        where('category', '==', title),
        where('userId', '==', user.uid),
        where('date', '>=', startFormattedDate),
        where('date', '<=', endFormattedDate)
      );
      const querySnapshot = await getDocs(q);
      const fetchedReflexoes: Reflexao[] = [];
      querySnapshot.forEach((doc) => {
        const data = doc.data() as Reflexao;
        if (data.text.includes(search)) {
          fetchedReflexoes.push({ id: doc.id, date: data.date, text: data.text });
        }
      });
      setReflexoes(fetchedReflexoes);
    } catch (error) {
      console.error("Erro ao buscar reflexões: ", error);
    }
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
        <TouchableOpacity onPress={() => { setIsStartDatePicker(true); setShowDatePicker(true); }}>
          <MaterialCommunityIcons name="calendar" size={24} color="#000" style={reflexaoPageStyles.calendarioIcon} />
        </TouchableOpacity>
        {/* <TouchableOpacity onPress={() => { setIsStartDatePicker(false); setShowDatePicker(true); }}>
          <MaterialCommunityIcons name="calendar" size={24} color="#000" style={reflexaoPageStyles.calendarioIcon} />
        </TouchableOpacity> */}
        <TouchableOpacity onPress={handleSearch}>
          <FontAwesome name="search" size={24} color="#000" style={reflexaoPageStyles.searchIcon} />
        </TouchableOpacity>
      </View>
      {showDatePicker && (
        <DateTimePicker
          testID="dateTimePicker"
          value={isStartDatePicker ? startDate : endDate}
          mode="date"
          display="default"
          onChange={onChangeDate}
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

        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            setModalVisible(!modalVisible);
          }}
        >
          <View style={reflexaoPageStyles.centeredView}>
            <View style={reflexaoPageStyles.modalView}>
              <Text style={reflexaoPageStyles.modalText}>Excluir reflexão?</Text>
              <View style={reflexaoPageStyles.buttonContainer}>
                <TouchableOpacity onPress={() => setModalVisible(false)} style={reflexaoPageStyles.modalButton}>
                  <Text style={reflexaoPageStyles.modalButtonText}>Não</Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={handleDelete} style={[reflexaoPageStyles.modalButton, reflexaoPageStyles.modalButtonDelete]}>
                  <Text style={reflexaoPageStyles.modalButtonText}>Sim</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </Modal>
      </View>
    </ImageBackground>
  );
};

export default ReflexaoViewBase;