import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Alert, Linking } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../../../config/firebaseConfig';
import VideoPage from './VideoPage';
import { createDailyRoom } from '../../../config/dayliConfig';
import { Camera } from 'expo-camera';
import VideoCallModal from './VideoCallModal';

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
  const [isInCall, setIsInCall] = useState(false);
  const [roomUrl, setRoomUrl] = useState<string | null>(null);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [currentNotification, setCurrentNotification] = useState<any>(null);

  useEffect(() => {
    const professional = auth.currentUser;
    if (!professional) {
      console.error("Usuário não autenticado");
      return;
    }

    const q = query(
      collection(db, 'messages'),
      where('chatId', '==', chatId),
      orderBy('createdAt', 'asc')
    );

    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const messages = querySnapshot.docs.map((doc) => {
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

  // useEffect(() => {
  //   const getPermissions = async () => {
  //     if (Platform.OS === 'web') {
  //       try {
  //         await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  //         setHasPermission(true);
  //       } catch {
  //         setHasPermission(false);
  //       }
  //     } else {
  //       const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
  //       const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
  //       setHasPermission(cameraStatus === 'granted' && audioStatus === 'granted');
  //     }
  //   };

  //   getPermissions();
  // }, []);

  const handleVideoCall = async () => {
    if (hasPermission === false) {
      console.error('Permissão necessária');
      return;
    }

    try {
      const newRoomUrl = await createDailyRoom(chatId as string);
      const chatRef = doc(db, 'chats', chatId as string);
      await updateDoc(chatRef, { videoUrl: newRoomUrl });

      setRoomUrl(newRoomUrl);
      setIsInCall(true);

      await addDoc(collection(db, 'notifications'), {
        type: 'video-call',
        senderId: auth.currentUser?.uid,
        receiverId: userId,
        chatId: chatId,
        roomUrl: newRoomUrl,
        createdAt: serverTimestamp(),
        processed: false,
      });
    } catch (error) {
      console.error('Erro ao criar a sala:', error);
    }
  };

  useEffect(() => {
    const processedNotifications = new Set<string>();

    const unsubscribe = onSnapshot(
      query(
        collection(db, 'notifications'),
        where('receiverId', '==', auth.currentUser?.uid),
        where('type', '==', 'video-call'),
        where('processed', '==', false)
      ),
      (snapshot) => {
        snapshot.forEach((docSnapshot) => {
          if (!processedNotifications.has(docSnapshot.id)) {
            processedNotifications.add(docSnapshot.id);
            setCurrentNotification({ ...docSnapshot.data(), id: docSnapshot.id });
            setIsModalVisible(true);
          }
        });
      }
    );

    return () => unsubscribe();
  }, []);

  const handleCloseModal = () => {
    setIsModalVisible(false);
    if (currentNotification?.roomUrl) {
      setRoomUrl(currentNotification.roomUrl);
      setIsInCall(true);
    }
  };

  const handleSend = async () => {
    const professional = auth.currentUser;
    if (!professional || !newMessage.trim()) return;

    try {
      await addDoc(collection(db, 'messages'), {
        text: newMessage,
        senderId: professional.uid,
        receiverId: userId,
        chatId: chatId,
        createdAt: serverTimestamp(),
        type: 'professional',
      });

      const chatRef = doc(db, 'chats', chatId as string);
      await updateDoc(chatRef, {
        lastMessage: newMessage,
        lastMessageTime: serverTimestamp(),
        participants: [professional.uid, userId],
        lastSender: professional.uid,
      });

      setNewMessage('');
    } catch (error) {
      console.error("Erro ao enviar mensagem:", error);
    }
  };

  return (
    <View style={styles.container}>
      <VideoCallModal
        visible={isModalVisible}
        notification={currentNotification}
        onClose={handleCloseModal}
      />
      {isInCall ? (
        roomUrl ? (
          <VideoPage
            roomId={chatId as string}
            roomUrl={roomUrl}
            onEndCall={() => {
              setIsInCall(false);
              setRoomUrl(null);
            }}
          />
        ) : (
          <Text>Carregando URL da sala...</Text>
        )
      ) : (
        <>
          <View style={styles.header}>
            <TouchableOpacity style={styles.videoButton} onPress={handleVideoCall}>
              <Icon name="video-camera" size={20} color="#fff" />
            </TouchableOpacity>
          </View>
          <FlatList
            data={messages}
            keyExtractor={(item) => item._id}
            renderItem={({ item }) => {
              const currentUser = auth.currentUser;
              if (!currentUser) return null;

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
    padding: 10,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    padding: 10,
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