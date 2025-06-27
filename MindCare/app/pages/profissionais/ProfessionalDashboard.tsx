import { useRouter } from 'expo-router';
import { collection, orderBy, query, where, onSnapshot, getDoc, doc as firestoreDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../../config/firebaseConfig';

type User = {
  id: string;
  name: string;
  lastMessage: string;
  lastMessageDate: Date;
  chatId: string;
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

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const professional = auth.currentUser;
        if (professional) {
          const chatsRef = collection(db, 'chats');
          const q = query(
            chatsRef,
            where('participants', 'array-contains', professional.uid)
          );

          const unsubscribe = onSnapshot(q, async (querySnapshot) => {
            const uniqueUsers = new Map();

            for (const doc of querySnapshot.docs) {
              const chatData = doc.data();
              // Encontra o ID do outro participante (não o profissional)
              const otherParticipantId = chatData.participants.find(
                id => id !== professional.uid
              );

              if (otherParticipantId && !uniqueUsers.has(otherParticipantId)) {
                // Busca informações do usuário
                const userDocRef = firestoreDoc(db, 'users', otherParticipantId);
                const userDoc = await getDoc(userDocRef);
                const userData = userDoc.data();

                uniqueUsers.set(otherParticipantId, {
                  id: otherParticipantId,
                  name: userData?.name || 'Usuário',
                  lastMessage: chatData.lastMessage || 'Início da conversa',
                  lastMessageDate: chatData.lastMessageTime?.toDate() || chatData.createdAt?.toDate() || new Date(),
                  chatId: doc.id
                });
              }
            }

            const usersArray = Array.from(uniqueUsers.values());
            console.log('Chats encontrados:', usersArray); // Debug
            setUsers(usersArray);
          });

          return () => unsubscribe();
        }
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsers();
  }, []);

  const handleChat = (userId: string, chatId: string) => {
    router.push({
      pathname: '/components/navigation/ChatPageProfissional',
      params: { userId, chatId }
    });
  };

  const filteredUsers = users.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

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
              onPress={() => handleChat(item.id, item.chatId)}
            >
              <Text style={styles.userName}>{item.name}</Text>
              <Text style={styles.lastMessage} numberOfLines={1}>
                {item.lastMessage}
              </Text>
              {item.lastMessageDate && (
                <Text style={styles.messageDate}>
                  {item.lastMessageDate.toLocaleString()}
                </Text>
              )}
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