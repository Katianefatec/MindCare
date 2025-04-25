import React, { useEffect, useState } from 'react';
import { FlatList, StyleSheet, Text, TextInput, TouchableOpacity, View, Platform, Alert } from 'react-native';
import { useLocalSearchParams } from 'expo-router';
import { addDoc, collection, doc, onSnapshot, orderBy, query, serverTimestamp, updateDoc, where, getDoc } from 'firebase/firestore';
import Icon from 'react-native-vector-icons/FontAwesome';
import { auth, db } from '../../../config/firebaseConfig';
import { WebView } from 'react-native-webview';
import VideoPage from './VideoPage';
import { createDailyRoom } from '../../../config/dayliConfig';
import { Camera } from 'expo-camera';

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
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

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

  // useEffect(() => {
  //   const getPermissions = async () => {
  //     if (Platform.OS === 'web') {
  //       try {
  //         const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
  //         setHasPermission(true);
  //       } catch (error) {
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

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'notifications'),
        where('receiverId', '==', auth.currentUser?.uid),
        where('type', '==', 'video-call')
      ),
      (snapshot) => {
        snapshot.forEach((doc) => {
          const notification = doc.data();
          if (!notification.processed) { // Verifica se a notificação já foi processada
            Alert.alert(
              'Chamada de vídeo',
              'Você tem uma chamada de vídeo. Deseja atender?',
              [
                { text: 'Recusar', onPress: () => handleDeclineCall(doc.id) },
                { 
                  text: 'Aceitar', 
                  onPress: () => handleAcceptCall(doc.id, notification.roomUrl)
                }
              ]
            );
          }
        });
      }
    );
  
    return () => unsubscribe();
  }, []);
 

  const handleVideoCall = async () => {
    if (hasPermission === false) {
      Alert.alert('Permissão necessária', 'Você precisa permitir o acesso à câmera e ao microfone para fazer chamadas de vídeo.');
      return;
    }

    try {
      // Cria a sala no Daily.co
      const newRoomUrl = await createDailyRoom(chatId as string);
      console.log('Nova sala criada:', newRoomUrl);

      // Salva a URL no documento do chat no Firestore
      const chatRef = doc(db, 'chats', chatId as string);
      await updateDoc(chatRef, { videoUrl: newRoomUrl });

      // Define a URL da sala no estado para exibir o VideoPage
      setRoomUrl(newRoomUrl);
      setIsInCall(true);

      // Envia notificação de chamada para o usuário
      await addDoc(collection(db, 'notifications'), {
        type: 'video-call',
        senderId: auth.currentUser?.uid,
        receiverId: professionalId,
        chatId: chatId,
        roomUrl: newRoomUrl,
        createdAt: serverTimestamp(),
        processed: false,
      });
    } catch (error) {
      console.error('Erro ao criar a sala:', error);
      // Lidar com o erro, ex: exibir uma mensagem para o usuário
    }
  };

  useEffect(() => {
    const unsubscribe = onSnapshot(
      query(
        collection(db, 'notifications'),
        where('receiverId', '==', auth.currentUser?.uid),
        where('type', '==', 'video-call')
      ),
      (snapshot) => {
        snapshot.forEach((doc) => {
          const notification = doc.data();
          if (!notification.processed) { // Verifica se a notificação já foi processada
            Alert.alert(
              'Chamada de vídeo',
              'Você tem uma chamada de vídeo. Deseja atender?',
              [
                { text: 'Recusar', onPress: () => handleDeclineCall(doc.id) },
                { 
                  text: 'Aceitar', 
                  onPress: () => handleAcceptCall(doc.id, notification.roomUrl)
                }
              ]
            );
          }
        });
      }
    );
  
    return () => unsubscribe();
  }, []);

  // const openVideoCallInApp = (roomUrl: string) => {
  //   return (
  //     <WebView
  //       source={{ uri: roomUrl }}
  //       style={{ marginTop: 20 }}
  //     />
  //   );
  // };

  const handleAcceptCall = async (notificationId: string, roomUrl: string) => {
    try {
      setRoomUrl(roomUrl);
      setIsInCall(true);
  
      // Marcar a notificação como processada
      await updateDoc(doc(db, 'notifications', notificationId), {
        processed: true,
      });
    } catch (error) {
      console.error('Erro ao aceitar a chamada:', error);
    }
  };

  const handleDeclineCall = async (notificationId: string) => {
    try {
      // Marcar a notificação como processada
      await updateDoc(doc(db, 'notifications', notificationId), {
        processed: true,
      });
      console.log('Chamada recusada');
    } catch (error) {
      console.error('Erro ao recusar a chamada:', error);
    }
  };
  

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
        <View style={styles.container2}>
        <WebView 
          source={{ uri: roomUrl }}
          style={styles.webView} 
          javaScriptEnabled={true}
          domStorageEnabled={true}
          scalesPageToFit={true}
        />
      </View>
        ) : (
          <Text>Carregando URL da sala...</Text>
        )
      ) : (
        <>
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
  container2: {
    flex: 1,
    backgroundColor: '#000', // Fundo preto para melhor visualização
  },
  webView: {
    width: '100%', // Garantir que o WebView ocupe toda a largura do container
    height: '100%', // Garantir que o WebView ocupe toda a altura do container
    marginTop: 0,
  },
});

export default ChatPage;