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
          console.error('Erro ao obter permissões de mídia:', error);
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
    const checkPermissions = async () => {
      const { status: cameraStatus } = await Camera.getCameraPermissionsAsync();
      console.log('Permissão da câmera:', cameraStatus);
    };
    checkPermissions();
  }, []);

  useEffect(() => {
    let callTimeout: NodeJS.Timeout;

    const joinCall = async () => {
      if (!roomUrl) return;

      console.log('joinCall chamada com a URL:', roomUrl); // Log da URL

      const call = DailyIframe.createCallObject();

      try {
        await call.join({ url: roomUrl });
      } catch (error) {
        console.error('Erro ao entrar na sala:', error);
      }
      callRef.current = call;

      call.on('joined-meeting', () => {
        console.log('Usuário entrou na chamada!');
        setIsJoined(true);
      });

      call.on('participant-joined', (participant) => {
        console.log('Outro participante entrou na chamada:', participant);
      });

      call.on('left-meeting', () => {
        console.log('Usuário saiu da chamada!');
        setIsJoined(false);
        onEndCall();
      });

      call.on('error', (error) => {
        console.error('Erro na chamada:', error);

        let mensagemErro = 'Ocorreu um erro na chamada.';
        if (error.errorMsg.includes('network')) {
          mensagemErro = 'Erro de rede. Verifique sua conexão com a internet.';
        } else if (error.errorMsg.includes('media')) {
          mensagemErro = 'Erro na câmera ou microfone. Verifique as permissões e configurações.';
        }

        alert(mensagemErro);
      });

      try {
        await call.join({ url: roomUrl });
      } catch (error) {
        console.error('Erro ao entrar na sala:', error);
      }

      // Timeout para lidar com falhas na conexão
      callTimeout = setTimeout(() => {
        if (!isJoined) {
          console.warn('Tempo limite excedido para entrar na chamada.');
          alert('Erro: Não foi possível conectar à chamada. Tente novamente mais tarde.');
          onEndCall(); // Encerra a chamada
        }
      }, 30000); // 30 segundos
    };

    console.log('VideoPage montado.');

    if (hasPermission && roomUrl) {    
      joinCall();
    }
    

    return () => {
      clearTimeout(callTimeout); // Limpa o timeout ao sair da chamada
      if (callRef.current) {
        callRef.current.leave();
        callRef.current.destroy();
      }
    };
  }, [roomUrl, hasPermission, onEndCall]);

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