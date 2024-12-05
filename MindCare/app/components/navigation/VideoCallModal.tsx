import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Platform } from 'react-native';

const VideoCallModal = ({ visible, onAccept, onDecline }: { visible: boolean; onAccept: () => void; onDecline: () => void }) => {
  if (!visible) return null;

  return (
    <View style={styles.modalOverlay}>
      <View style={styles.modalContainer}>
        <Text style={styles.modalText}>Você tem uma chamada de vídeo. Deseja atender?</Text>
        <View style={styles.modalButtons}>
          <TouchableOpacity style={[styles.modalButton, styles.declineButton]} onPress={onDecline}>
            <Text style={styles.modalButtonText}>Recusar</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.modalButton, styles.acceptButton]} onPress={onAccept}>
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
