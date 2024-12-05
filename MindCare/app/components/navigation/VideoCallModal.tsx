import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform, Alert } from 'react-native';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../../config/firebaseConfig';
import { Linking } from 'react-native';

const VideoCallModal = ({ visible, notification, onClose }: { visible: boolean; notification: any; onClose: (url?: string | null) => void }) => {
  if (!visible || !notification) return null;

  const handleAcceptCall = async () => {
    try {
      // Marcar a notificação como processada
      await updateDoc(doc(db, 'notifications', notification.id), {
        processed: true,
      });

      // Abrir a sala de vídeo na web
      if (Platform.OS === 'web') {
        Linking.openURL(notification.roomUrl).catch((err) => console.error("Não foi possível abrir a URL", err));
      } else {
        // Abrir a sala de vídeo no app usando WebView
        onClose(notification.roomUrl);
      }
    } catch (error) {
      console.error('Erro ao aceitar a chamada:', error);
    }
  };

  const handleDeclineCall = async () => {
    try {
      // Marcar a notificação como processada
      await updateDoc(doc(db, 'notifications', notification.id), {
        processed: true,
      });
      console.log('Chamada recusada');
      onClose(null);
    } catch (error) {
      console.error('Erro ao recusar a chamada:', error);
    }
  };

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Você tem uma chamada de vídeo. Deseja atender?</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={[styles.modalButton, styles.declineButton]} onPress={handleDeclineCall}>
            <Text style={styles.modalButtonText}>Recusar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.acceptButton]} onPress={handleAcceptCall}>
            <Text style={styles.modalButtonText}>Aceitar</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  modalContainer: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  modalText: {
    marginBottom: 20,
    fontSize: 16,
    textAlign: 'center',
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },
  modalButton: {
    padding: 10,
    borderRadius: 5,
    width: '45%',
    alignItems: 'center',
  },
  declineButton: {
    backgroundColor: '#d9534f',
  },
  acceptButton: {
    backgroundColor: '#5cb85c',
  },
  modalButtonText: {
    color: '#fff',
    fontWeight: 'bold',
  },
});

export default VideoCallModal;