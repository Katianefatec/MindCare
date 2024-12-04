import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where, getDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../../../config/firebaseConfig';
import VideoPage from './VideoPage';
import { createDailyRoom } from '../../../config/dayliConfig';

type Message = {
  _id: string;
  text: string;
  senderId: string;
  receiverId: string;
  createdAt: Date;
};

const ChatPage = () => {
  const { professionalId, chatId } = useLocalSearchParams();
  const [messages, setMessages] = useState<Message[]>([]);
  const [newMessage, setNewMessage] = useState('');
  const [isInCall, setIsInCall] = useState(false);
  const [roomUrl, setRoomUrl] = useState<string | null>(null);

  useEffect(() => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Usuário não autenticado");
      return;
    }

    const q = query(
      collection(db, 'messages'),
      where('chatId', '==', chatId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map(doc => {
        const data = doc.data();
        return {
          _id: doc.id,
          text: data.text,
          senderId: data.senderId,
          receiverId: data.receiverId,
          createdAt: data.createdAt ? data.createdAt.toDate() : new Date(),
        };
      });
      setMessages(messages);
    });

    return () => unsubscribe();
  }, [chatId]);

  useEffect(() => {
    const getRoomUrl = async () => {
      const roomDoc = await getDoc(doc(db, 'videoRooms', chatId as string));
      if (roomDoc.exists()) {
        setRoomUrl(roomDoc.data().url);
      } else {
        const newRoomUrl = await createDailyRoom(chatId as string);
        setRoomUrl(newRoomUrl);
      }
    };

    getRoomUrl();
  }, [chatId]);

  const handleSend = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Usuário não autenticado");
      return;
    }
    if (newMessage.trim()) {
      try {
        await addDoc(collection(db, 'messages'), {
          text: newMessage,
          senderId: user.uid,
          receiverId: professionalId,
          chatId: chatId,
          createdAt: serverTimestamp(),
          type: 'user',
        });

        const chatRef = doc(db, 'chats', chatId as string);
        await updateDoc(chatRef, {
          lastMessage: newMessage,
          lastMessageTime: serverTimestamp(),
          participants: [user.uid, professionalId],
          lastSender: user.uid,
        });

        setNewMessage('');
      } catch (error) {
        console.error("Erro ao enviar mensagem:", error);
      }
    }
  };

  return (
    <View style={styles.container}>
      {isInCall ? (
        roomUrl ? (
          <VideoPage
            roomId={chatId as string}
            roomUrl={roomUrl}
            onEndCall={() => setIsInCall(false)}
          />
        ) : (
          <Text>Carregando URL da sala...</Text>
        )
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity
              style={styles.videoButton}
              onPress={() => setIsInCall(true)}
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
            <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
              <Icon name="send" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
        </>
      )}
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