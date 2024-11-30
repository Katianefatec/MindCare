import { useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, collection, onSnapshot, orderBy, query } from 'firebase/firestore';
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

const ChatPageProfissional = () => {
  const router = useRouter();
  const { userId } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const professional = auth.currentUser;
    if (!professional) {
      console.error("Profissional não autenticado");
      return;
    }

    const chatId = [professional.uid, userId].sort().join('_'); // Gera um ID único para o chat

    const q = query(
      collection(db, 'chats', chatId, 'messages'),
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
  }, [userId]);

  const handleSend = async () => {
    const professional = auth.currentUser;
    if (!professional) {
      console.error("Profissional não autenticado");
      return;
    }
    if (newMessage.trim()) {
      try {
        const chatId = [professional.uid, userId].sort().join('_');
        await addDoc(collection(db, 'chats', chatId, 'messages'), {
          text: newMessage,
          senderId: professional.uid,
          receiverId: userId,
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
      params: { userId }
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
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  videoButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
  },
  input: {
    flex: 1,
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginRight: 10,
  },
  sendButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: '#dcf8c6',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
  theirMessage: {
    alignSelf: 'flex-start',
    backgroundColor: '#f1f1f1',
    padding: 10,
    borderRadius: 5,
    marginVertical: 5,
  },
});

export default ChatPageProfissional;