import React, { useState, useEffect } from 'react';
import { View, Button, StyleSheet } from 'react-native';
import { Video, ResizeMode } from 'expo-av';

const VideoCallPage = () => {
  const [videoUri, setVideoUri] = useState('https://www.w3schools.com/html/mov_bbb.mp4');
  const videoRef = React.useRef<Video>(null);

  useEffect(() => {
    // Aqui você pode adicionar lógica para buscar a URL do vídeo de uma fonte externa, se necessário
  }, []);

  const handlePlayPause = () => {
    if (videoRef.current) {
      videoRef.current.getStatusAsync().then(status => {
        if (status.isLoaded && status.isPlaying) {
          videoRef.current?.pauseAsync();
        } else {
          videoRef.current?.playAsync();
        }
      });
    }
  };

  return (
    <View style={styles.container}>
      <Video
        ref={videoRef}
        source={{ uri: videoUri }}
        rate={1.0}
        volume={1.0}
        isMuted={false}
        resizeMode={ResizeMode.CONTAIN}
        shouldPlay
        style={styles.video}
      />
      <Button title="Play/Pause" onPress={handlePlayPause} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  video: {
    width: 300,
    height: 300,
  },
});

export default VideoCallPage;