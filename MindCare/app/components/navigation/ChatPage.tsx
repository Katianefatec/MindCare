// ChatPage.tsx

import React, { useState, useEffect } from 'react';
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native';
import { db, auth } from '../../config/firebaseConfig';
import { collection, addDoc, query, orderBy, where, onSnapshot } from 'firebase/firestore';
import { useLocalSearchParams, useRouter } from 'expo-router';
import Icon from 'react-native-vector-icons/FontAwesome';

const ChatPage = () => {
  const router = useRouter();
  const { professionalId } = useLocalSearchParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Usuário não autenticado");
      return;
    }

    const chatId = [user.uid, professionalId].sort().join('_'); // Gera um ID único para o chat

    const q = query(
      collection(db, 'chats', chatId, 'messages'),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => ({
        _id: doc.id,
        ...doc.data(),
      }));
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [professionalId]);

  const handleSend = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Usuário não autenticado");
      return;
    }
    if (newMessage.trim()) {
      try {
        const chatId = [user.uid, professionalId].sort().join('_');
        await addDoc(collection(db, 'chats', chatId, 'messages'), {
          text: newMessage,
          senderId: user.uid,
          receiverId: professionalId,
          createdAt: new Date(),
        });
        setNewMessage('');
      } catch (error) {
        console.error("Erro ao enviar mensagem: ", error);
      }
    }
  };

  const handleVideoCall = () => {
    router.push({
      pathname: '/components/navigation/VideoPage',
      params: { professionalId }
    });
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.videoButton}
          onPress={handleVideoCall}
        >
          <Icon name="video-camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => (
          <View style={item.senderId === auth.currentUser.uid ? styles.myMessage : styles.theirMessage}>
            <Text>{item.text}</Text>
          </View>
        )}
        inverted
      />
      <View style={styles.inputContainer}>
        <TextInput
          style={styles.input}
          value={newMessage}
          onChangeText={setNewMessage}
          placeholder="Digite sua mensagem"
        />
        <TouchableOpacity
          style={styles.sendButton}
          onPress={handleSend}
        >
          <Icon name="send" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (seus estilos)
});

export default ChatPage;