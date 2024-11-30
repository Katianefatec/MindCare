import { useRouter } from 'expo-router';
import { collection, getDocs, orderBy, query, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../../config/firebaseConfig';

type User = {
  id: string;
  lastMessage: string;
  lastMessageDate: Date;
};

const ProfessionalDashboard = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [selectedUser, setSelectedUser] = useState<string | null>(null);
  type Message = {
    id: string;
    text: string;
    createdAt: Date;
  };
  
  const [chatHistory, setChatHistory] = useState<Message[]>([]);
  const [searchQuery, setSearchQuery] = useState('');
  const router = useRouter();

  // Buscar lista de usuários que conversaram com o profissional
  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const professional = auth.currentUser;
        if (professional) {
          const messagesRef = collection(db, 'messages');
          const q = query(
            messagesRef,
            where('professionalId', '==', professional.uid),
            orderBy('createdAt', 'desc')
          );

          const querySnapshot = await getDocs(q);
          const uniqueUsers = new Map();

          querySnapshot.docs.forEach(doc => {
            const data = doc.data();
            if (!uniqueUsers.has(data.userId)) {
              uniqueUsers.set(data.userId, {
                id: data.userId,
                lastMessage: data.text,
                lastMessageDate: data.createdAt.toDate(),
              });
            }
          });

          setUsers(Array.from(uniqueUsers.values()));
        } else {
          console.error('Professional is not authenticated');
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  // Buscar histórico de chat do usuário selecionado
  const fetchChatHistory = async (userId: string) => {
    try {
      const messagesRef = collection(db, 'messages');
      const professional = auth.currentUser;
      if (!professional) {
        console.error('Professional is not authenticated');
        return;
      }
      const q = query(
        messagesRef,
        where('userId', '==', userId),
        where('professionalId', '==', professional.uid),
        orderBy('createdAt', 'desc')
      );

      const querySnapshot = await getDocs(q);
      const messages = querySnapshot.docs.map(doc => ({
        id: doc.id,
        text: doc.data().text,
        createdAt: doc.data().createdAt.toDate(),
      }));

      setChatHistory(messages);
      setSelectedUser(userId);
    } catch (error) {
      console.error('Erro ao buscar histórico:', error);
    }
  };

  const filteredUsers = users.filter(user => 
    user.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleChat = (userId: string) => {
    router.push({
      pathname: './components/navigation/ChatPageProfissional',
      params: { userId }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.sidebar}>
        <TextInput
          style={styles.searchInput}
          placeholder="Buscar nas conversas..."
          value={searchQuery}
          onChangeText={setSearchQuery}
        />
        <FlatList
          data={filteredUsers}
          keyExtractor={item => item.id}
          renderItem={({ item }) => (
            <TouchableOpacity
              style={[
                styles.userItem,
                selectedUser === item.id && styles.selectedUser
              ]}
              onPress={() => handleChat(item.id)}
            >
              <Text style={styles.userName}>Usuário {item.id}</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage}
              </Text>
            </TouchableOpacity>
          )}
        />
      </View>

      <View style={styles.chatHistory}>
        {selectedUser ? (
          <FlatList
            data={chatHistory}
            keyExtractor={item => item.id}
            renderItem={({ item }) => (
              <View style={styles.messageContainer}>
                <Text style={styles.messageText}>{item.text}</Text>
                <Text style={styles.messageDate}>
                  {item.createdAt.toLocaleString()}
                </Text>
              </View>
            )}
          />
        ) : (
          <Text style={styles.noSelection}>
            Selecione um usuário para ver o histórico
          </Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
  },
  sidebar: {
    width: '30%',
    borderRightWidth: 1,
    borderRightColor: '#ccc',
  },
  searchInput: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  userItem: {
    padding: 15,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  selectedUser: {
    backgroundColor: '#e6e6e6',
  },
  userName: {
    fontWeight: 'bold',
    marginBottom: 5,
  },
  lastMessage: {
    color: '#666',
    fontSize: 12,
  },
  chatHistory: {
    flex: 1,
    padding: 15,
  },
  messageContainer: {
    padding: 10,
    marginBottom: 10,
    backgroundColor: '#f5f5f5',
    borderRadius: 5,
  },
  messageText: {
    marginBottom: 5,
  },
  messageDate: {
    fontSize: 12,
    color: '#666',
  },
  noSelection: {
    textAlign: 'center',
    color: '#666',
    marginTop: 20,
  },
});

export default ProfessionalDashboard;