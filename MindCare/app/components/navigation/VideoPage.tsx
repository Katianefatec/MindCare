import React, { useEffect, useRef, useState } from 'react';
import { StyleSheet, Text, TouchableOpacity, View, Platform } from 'react-native';
import { Camera } from 'expo-camera';
import DailyIframe, { DailyCall } from '@daily-co/daily-js';

interface VideoPageProps {
  roomId: string;
  onEndCall: () => void;
  roomUrl: string;
}

const VideoPage: React.FC<VideoPageProps> = ({ roomId, onEndCall, roomUrl }) => {
  const callRef = useRef<DailyCall | null>(null);
  const [isJoined, setIsJoined] = useState(false);
  const [hasPermission, setHasPermission] = useState<boolean | null>(null);

  useEffect(() => {
    const getPermissions = async () => {
      if (Platform.OS === 'web') {
        try {
          const stream = await navigator.mediaDevices.getUserMedia({ video: true, audio: true });
          setHasPermission(true);
        } catch (error) {
          setHasPermission(false);
        }
      } else {
        const { status: cameraStatus } = await Camera.requestCameraPermissionsAsync();
        const { status: audioStatus } = await Camera.requestMicrophonePermissionsAsync();
        setHasPermission(cameraStatus === 'granted' && audioStatus === 'granted');
      }
    };

    getPermissions();
  }, []);

  useEffect(() => {
    const joinCall = async () => {
      if (!roomUrl) return;

      const call = DailyIframe.createCallObject();
      callRef.current = call;

      call.on('joined-meeting', () => setIsJoined(true));
      call.on('left-meeting', () => {
        setIsJoined(false);
        onEndCall();
      });

      await call.join({ url: roomUrl });
    };

    if (hasPermission && roomUrl) {
      joinCall();
    }

    return () => {
      if (callRef.current) {
        callRef.current.leave();
        callRef.current.destroy();
      }
    };
  }, [roomUrl, hasPermission]);

  if (hasPermission === null) {
    return <View />;
  }

  if (hasPermission === false) {
    return <Text>Sem acesso à câmera ou microfone</Text>;
  }

  return (
    <View style={styles.container}>
      <Text style={styles.text}>{isJoined ? 'Conectado' : 'Conectando...'}</Text>
      <TouchableOpacity style={styles.endCallButton} onPress={onEndCall}>
        <Text style={styles.buttonText}>Encerrar Chamada</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
  },
  endCallButton: {
    backgroundColor: '#FF0000',
    padding: 10,
    borderRadius: 5,
  },
  buttonText: {
    color: '#FFF',
    fontWeight: 'bold',
  },
});

export default VideoPage;