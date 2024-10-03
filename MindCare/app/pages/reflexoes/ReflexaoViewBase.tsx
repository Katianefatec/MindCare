import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View, TouchableOpacity, ScrollView, Modal, StyleSheet } from 'react-native';
import { useRoute } from '@react-navigation/native';
import BottomBar from '../../components/navigation/BottomBar';
import reflexaoPageStyles from '../styles/ReflexaoPageStyles';
import { FontAwesome } from '@expo/vector-icons';
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