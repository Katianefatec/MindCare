import React, { useState, useRef } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { RTCView, mediaDevices, RTCPeerConnection, RTCIceCandidate, RTCSessionDescription } from 'react-native-webrtc';

const VideoCallPage = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const localStreamRef = useRef(null);
  const remoteStreamRef = useRef(null);
  const peerConnectionRef = useRef(null);

  const startCall = async () => {
    const stream = await mediaDevices.getUserMedia({
      audio: true,
      video: true,
    });
    setLocalStream(stream);
    localStreamRef.current.srcObject = stream;

    const peerConnection = new RTCPeerConnection({
      iceServers: [
        { urls: 'stun:stun.l.google.com:19302' },
      ],
    });

    peerConnection.addStream(stream);

    peerConnection.onicecandidate = (event: any) => {
      if (event.candidate) {
        // Enviar o candidato ICE para o outro participante
      }
    };

    peerConnection.ontrack = (event: any) => {
      if (event.streams && event.streams[0]) {
        setRemoteStream(event.streams[0]);
        remoteStreamRef.current.srcObject = event.streams[0];
      }
    };

    peerConnectionRef.current = peerConnection;

    const offer = await peerConnection.createOffer({});
    await peerConnection.setLocalDescription(new RTCSessionDescription(offer));

    // Enviar a oferta para o outro participante
  };

  const handleAnswer = async (answer) => {
    const peerConnection = peerConnectionRef.current;
    if (peerConnection) {
      await peerConnection.setRemoteDescription(new RTCSessionDescription(answer));
    }
  };

  const handleCandidate = async (candidate) => {
    const peerConnection = peerConnectionRef.current;
    if (peerConnection) {
      await peerConnection.addIceCandidate(new RTCIceCandidate(candidate));
    }
  };

  return (
    <View style={styles.container}>
      <RTCView
        streamURL={localStream && localStream.toURL()}
        style={styles.localVideo}
      />
      <RTCView
        streamURL={remoteStream && remoteStream.toURL()}
        style={styles.remoteVideo}
      />
      <Button title="Iniciar Chamada" onPress={startCall} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  localVideo: {
    width: 100,
    height: 150,
    backgroundColor: 'black',
  },
  remoteVideo: {
    width: 300,
    height: 400,
    backgroundColor: 'black',
  },
});

export default VideoCallPage;