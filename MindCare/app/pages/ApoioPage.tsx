import { useRouter } from 'expo-router';
import { 
  collection, 
  getDocs,   
  doc,
  query, 
  where, 
  serverTimestamp,
  setDoc
} from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, Linking, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { db } from '../../config/firebaseConfig';
import BottomBar from '../components/navigation/BottomBar';
import ApoioPage from './styles/ApoioPageStyles';
import { getAuth } from 'firebase/auth';

const Apoio = () => {
  const [search, setSearch] = useState('');
  const [professionals, setProfessionals] = useState([]);
  const router = useRouter();
  const auth = getAuth();

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

  const handleChat = async (professionalId) => {
    try {
      const user = auth.currentUser;
      if (!user) {
        console.error("Usuário não autenticado");
        return;
      }
  
      console.log("Verificando chat existente...");
  
      // Procura chat existente
      const chatsRef = collection(db, 'chats');
      const chatQuery = query(
        chatsRef,
        where('participants', 'array-contains', user.uid)
      );
      
      const querySnapshot = await getDocs(chatQuery);
      let chatId;
  
      // Verifica se já existe um chat
      const existingChat = querySnapshot.docs.find(doc => {
        const data = doc.data();
        return data.participants && data.participants.includes(professionalId);
      });
  
      if (existingChat) {
        console.log("Chat existente encontrado");
        chatId = existingChat.id;
      } else {
        console.log("Criando novo chat...");
        const newChatRef = doc(chatsRef);
        chatId = newChatRef.id;
        
        const chatData = {
          participants: [user.uid, professionalId],
          createdAt: serverTimestamp(),
          lastMessage: '',
          lastMessageTime: serverTimestamp(),
          createdBy: user.uid
        };
  
        await setDoc(newChatRef, chatData);
        console.log("Novo chat criado");
      }
  
      console.log("Navegando para o chat...");
      router.push({
        pathname: '/components/navigation/ChatPage',
        params: { professionalId, chatId }
      });
  
    } catch (error) {
      console.error("Erro ao iniciar chat:", error);
      if (error.code === 'permission-denied') {
        console.error("Erro de permissão ao acessar o Firestore");
      }
    }
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
                onPress={() => handleChat(item.id)}
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