import React, { useState, useEffect, useRef } from 'react';
import { View, Button, StyleSheet, Text } from 'react-native';
import { RTCView, mediaDevices, RTCPeerConnection, RTCSessionDescription } from 'react-native-webrtc';
import { db } from '../../config/firebaseConfig';
import { doc, setDoc, getDoc, collection, onSnapshot, addDoc } from 'firebase/firestore';

const configuration = { iceServers: [{ urls: 'stun:stun.l.google.com:19302' }] };

const VideoCallPage = () => {
  const [localStream, setLocalStream] = useState(null);
  const [remoteStream, setRemoteStream] = useState(null);
  const pc = useRef(null);
  const connecting = useRef(false);

  useEffect(() => {
    startLocalStream();
  }, []);

  const startLocalStream = async () => {
    const isFrontCamera = true;
    const devices = await mediaDevices.enumerateDevices();

    const facing = isFrontCamera ? 'front' : 'environment';
    const videoSourceId = devices.find(
      (device) => device.kind === 'videoinput' && device.facing === facing
    );

    const constraints = {
      audio: true,
      video: {
        mandatory: {
          minWidth: 500, // Provide your own width, height and frame rate here
          minHeight: 300,
          minFrameRate: 30,
        },
        facingMode: isFrontCamera ? 'user' : 'environment',
        optional: videoSourceId ? [{ sourceId: videoSourceId.deviceId }] : [],
      },
    };

    const newStream = await mediaDevices.getUserMedia(constraints);
    setLocalStream(newStream);
  };

  const createOffer = async () => {
    pc.current = new RTCPeerConnection(configuration);
    addPCEventListeners();

    localStream.getTracks().forEach(track => {
      pc.current.addTrack(track, localStream);
    });

    const offer = await pc.current.createOffer();
    await pc.current.setLocalDescription(offer);

    const callRef = doc(db, 'calls', 'callID');
    await callRef.set({ offer: pc.current.localDescription.toJSON() });

    // Escutar por resposta
    callRef.onSnapshot(async snapshot => {
      const data = snapshot.data();
      if (!pc.current.currentRemoteDescription && data && data.answer) {
        const answerDesc = new RTCSessionDescription(data.answer);
        await pc.current.setRemoteDescription(answerDesc);
      }
    });

    // Troca de candidatos ICE
    callRef.collection('calleeCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          await pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  const createAnswer = async () => {
    const callRef = doc(db, 'calls', 'callID');
    const callData = (await callRef.get()).data();

    pc.current = new RTCPeerConnection(configuration);
    addPCEventListeners();

    localStream.getTracks().forEach(track => {
      pc.current.addTrack(track, localStream);
    });

    await pc.current.setRemoteDescription(new RTCSessionDescription(callData.offer));

    const answer = await pc.current.createAnswer();
    await pc.current.setLocalDescription(answer);

    await callRef.update({ answer: pc.current.localDescription.toJSON() });

    // Troca de candidatos ICE
    callRef.collection('callerCandidates').onSnapshot(snapshot => {
      snapshot.docChanges().forEach(async change => {
        if (change.type === 'added') {
          const candidate = new RTCIceCandidate(change.doc.data());
          await pc.current.addIceCandidate(candidate);
        }
      });
    });
  };

  const addPCEventListeners = () => {
    pc.current.onicecandidate = event => {
      if (event.candidate) {
        const candidate = event.candidate.toJSON();
        const callRef = doc(db, 'calls', 'callID');
        const candidatesCollection = connecting.current ? 'calleeCandidates' : 'callerCandidates';
        callRef.collection(candidatesCollection).add(candidate);
      }
    };

    pc.current.onaddstream = event => {
      setRemoteStream(event.stream);
    };
  };

  return (
    <View style={styles.container}>
      <View style={styles.videoContainer}>
        {localStream && (
          <RTCView
            streamURL={localStream.toURL()}
            style={styles.localVideo}
          />
        )}
        {remoteStream && (
          <RTCView
            streamURL={remoteStream.toURL()}
            style={styles.remoteVideo}
          />
        )}
      </View>
      <View style={styles.buttonContainer}>
        <Button title="Fazer Chamada" onPress={createOffer} />
        <Button title="Atender Chamada" onPress={createAnswer} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: { flex: 1 },
  videoContainer: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  localVideo: {
    width: 100,
    height: 150,
    position: 'absolute',
    top: 10,
    right: 10,
    backgroundColor: 'black',
  },
  remoteVideo: {
    width: '100%',
    height: '100%',
    backgroundColor: 'black',
  },
  buttonContainer: { flexDirection: 'row', justifyContent: 'space-around', margin: 10 },
});

export default VideoCallPage;