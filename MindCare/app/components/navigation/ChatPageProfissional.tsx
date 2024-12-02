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

const ChatPageProfissional = () => {
  const router = useRouter();
  const { userId, chatId } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');

  useEffect(() => {
    const professional = auth.currentUser;
    if (!professional || !chatId) {
      console.error("Profissional não autenticado ou chatId não fornecido");
      return;
    }

    const q = query(
      collection(db, 'messages'),
      where('chatId', '==', chatId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => ({
        _id: doc.id,
        text: doc.data().text,
        senderId: doc.data().senderId,
        receiverId: doc.data().receiverId,
        createdAt: doc.data().createdAt?.toDate() || new Date(),
      }));
      console.log('Mensagens carregadas:', messages.length); // Debug
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [chatId]);

  const handleSend = async () => {
    const professional = auth.currentUser;
    if (!professional) {
      console.error("Profissional não autenticado");
      return;
    }
    if (newMessage.trim()) {
      try {
        console.log('Enviando mensagem...', {
          chatId,
          professionalId: professional.uid,
          userId
        });
  
        // Primeiro, envia a mensagem
        await addDoc(collection(db, 'messages'), {
          text: newMessage,
          senderId: professional.uid,
          receiverId: userId,
          chatId: chatId,
          createdAt: serverTimestamp(),
          type: 'professional'
        });
  
        // Atualiza o documento do chat
        const chatRef = doc(db, 'chats', chatId as string);
        await updateDoc(chatRef, {
          lastMessage: newMessage,
          lastMessageTime: serverTimestamp(),
          lastSender: professional.uid
        });
  
        console.log('Mensagem enviada com sucesso');
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