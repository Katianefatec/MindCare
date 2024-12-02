import { useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../../../config/firebaseConfig';

type Message = {
  _id: string;
  text: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
};

const ChatPage = () => {
  const router = useRouter();
  const { professionalId } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Usuário não autenticado");
      return;
    }

    const chatId = [user.uid, professionalId].sort().join('_'); // Gera um ID único para o chat

    const q = query(
      collection(db, 'messages'), // Certifique-se de que a coleção está correta
      where('chatId', '==', chatId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => ({
        _id: doc.id,
        text: doc.data().text,
        senderId: doc.data().senderId,
        receiverId: doc.data().receiverId,
        createdAt: doc.data().createdAt.toDate(),
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
          
          // Primeiro, envia a mensagem
          await addDoc(collection(db, 'messages'), {
            text: newMessage,
            senderId: user.uid,
            receiverId: professionalId,
            chatId: chatId,
            createdAt: serverTimestamp(), // Usar serverTimestamp ao invés de new Date()
          });
  
          // Atualiza o documento do chat
          const chatRef = doc(db, 'chats', chatId);
          await updateDoc(chatRef, {
            lastMessage: newMessage,
            lastMessageTime: serverTimestamp()
          });
  
          setNewMessage('');
        } catch (error) {
          console.error("Erro ao enviar mensagem: ", error);
        }
      }
    };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity
          style={styles.videoButton}
          // onPress={handleVideoCall}
        >
          <Icon name="video-camera" size={20} color="#fff" />
        </TouchableOpacity>
      </View>
      <FlatList
        data={messages}
        keyExtractor={item => item._id}
        renderItem={({ item }) => {
          const currentUser = auth.currentUser;
          if (!currentUser) {
            return null;
          }
          return (
            <View style={item.senderId === currentUser.uid ? styles.myMessage : styles.theirMessage}>
              <Text>{item.text}</Text>
            </View>
          );
        }}
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
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
  },
  videoButton: {
    backgroundColor: '#41ACBB',
    padding: 10,
    borderRadius: 50,
  },
  myMessage: {
    backgroundColor: '#41ACBB',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignSelf: 'flex-end',
  },
  theirMessage: {
    backgroundColor: '#f0f0f0',
    padding: 10,
    margin: 10,
    borderRadius: 10,
    alignSelf: 'flex-start',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
  },
  input: {
    flex: 1,
    padding: 10,
    backgroundColor: '#f0f0f0',
    borderRadius: 50,
  },
  sendButton: {
    backgroundColor: '#41ACBB',
    padding: 10,
    borderRadius: 50,
    marginLeft: 10,
  },
  
});

export default ChatPage;