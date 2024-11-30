// ApoioPage.tsx

import { useRouter } from 'expo-router';
import { collection, getDocs } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Linking, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../../config/firebaseConfig';
import BottomBar from '../components/navigation/BottomBar';
import ApoioPage from './styles/ApoioPageStyles';

const Apoio = () => {
  const [search, setSearch] = useState('');
  const [professionals, setProfessionals] = useState([]);
  const router = useRouter();

  useEffect(() => {
    const fetchProfessionals = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'professionals'));
        const professionalsList = querySnapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setProfessionals(professionalsList);
      } catch (error) {
        console.error('Erro ao buscar profissionais:', error);
      }
    };
    fetchProfessionals();
  }, []);

  const openWhatsApp = (phone) => {
    const url = `https://wa.me/${phone}`;
    Linking.openURL(url).catch((err) => console.error("Não foi possível abrir o WhatsApp", err));
  };

  const handleChat = (professionalId, professionalPhone) => {
    router.push({
      pathname: '/components/navigation/ChatPage',
      params: { professionalId, professionalPhone }
    });
  };

  return (
    <View style={[ApoioPage.container, { backgroundColor: '#41ACBB' }]}>
      <View style={ApoioPage.searchContainer}>
        <TextInput
          style={ApoioPage.searchInput}
          placeholder="Buscar profissional"
          value={search}
          onChangeText={setSearch}
        />
      </View>
      <FlatList
        contentContainerStyle={{ paddingBottom: 40 }}
        data={professionals.filter((item) =>
          item.name.toLowerCase().includes(search.toLowerCase())
        )}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={ApoioPage.professionalContainer}>
            <Text style={ApoioPage.professionalName}>{item.name}</Text>
            <Text style={ApoioPage.professionalSpecialty}>{item.specialty}</Text>
            <Text style={ApoioPage.professionalContact}>{item.email}</Text>
            <View style={ApoioPage.contactButtons}>
              <TouchableOpacity
                style={ApoioPage.whatsappButton}
                onPress={() => openWhatsApp(item.phone)}
              >
                <Icon name="whatsapp" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={ApoioPage.chatButton}
                onPress={() => handleChat(item.id, item.phone)}
              >
                <Icon name="comments" size={20} color="#fff" />
              </TouchableOpacity>
            </View>
          </View>
        )}
      />
      <BottomBar />
    </View>
  );
};

export default Apoio;