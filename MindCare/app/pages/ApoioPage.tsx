import React, { useState } from 'react';
import { View, Text, TextInput, FlatList, TouchableOpacity, Linking } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useRouter } from 'expo-router';
import BottomBar from '../components/navigation/BottomBar';
import ApoioPage from './styles/ApoioPageStyles';

const professionals = [
  { id: '1', name: 'Dr. Higor Grasselli', specialty: 'Psicólogo', contact: 'joao.silva@example.com', phone: '12974125808' },
  { id: '2', name: 'Dra. Maria Gabriela Oliveira', specialty: 'Psiquiatra', contact: 'maria.oliveira@example.com', phone: '12981956964' },
  { id: '3', name: 'Dr. José Santos', specialty: 'Psicólogo', contact: 'jose.santos@email.com', phone: '1122334455' },
  { id: '4', name: 'Dra. Ana Costa', specialty: 'Psiquiatra', contact: 'Ana.Costa@email.com', phone: '5566778899' },
];

const Apoio = () => {
  const [search, setSearch] = useState('');
  const router = useRouter();

  const openWhatsApp = (phone) => {
    const url = `https://wa.me/${phone}`;
    Linking.openURL(url).catch((err) => console.error("Não foi possível abrir o WhatsApp", err));
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
        data={professionals}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <View style={ApoioPage.professionalContainer}>
            <Text style={ApoioPage.professionalName}>{item.name}</Text>
            <Text style={ApoioPage.professionalSpecialty}>{item.specialty}</Text>
            <Text style={ApoioPage.professionalContact}>{item.contact}</Text>
            <View style={ApoioPage.contactButtons}>
              <TouchableOpacity
                style={ApoioPage.chatButton}
                onPress={() => openWhatsApp(item.phone)}
              >
                <Icon name="whatsapp" size={20} color="#fff" />
              </TouchableOpacity>
              <TouchableOpacity
                style={ApoioPage.videoCallButton}
                onPress={() => router.push('/components/navigation/VideoPage')}
              >
                <Icon name="video-camera" size={20} color="#fff" />
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