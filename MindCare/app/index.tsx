import React from 'react';
import { StyleSheet, Text, View, ImageBackground } from 'react-native';
import EmojiGrid from '../components/EmojiGrid';
import BottomBar from '../components/navigation/BottomBar'; // Importe o componente BottomBar

export default function Page() {
  return (
    <ImageBackground 
      source={require('../assets/images/fundoHome.png')}
      style={styles.backgroundImage}
    >
      <View style={styles.container}>
        <Text style={styles.greeting}>Bom dia, Gerson!</Text>
        <Text style={styles.question}>Qual o sentimento de hoje?</Text>

        <EmojiGrid />

        <BottomBar /> 
      </View>
    </ImageBackground>
  );
}

const styles = StyleSheet.create({
  backgroundImage: {
    flex: 1,
    resizeMode: 'cover', 
    justifyContent: 'center',
  },
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingHorizontal: 24, 
  },
  greeting: {
    fontSize: 32, 
    fontWeight: "bold",
    marginBottom: 10,
    color: 'white', 
  },
  question: {
    fontSize: 24, 
    marginBottom: 20,
    color: 'white', 
  },
});