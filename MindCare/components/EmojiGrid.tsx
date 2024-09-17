import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet, Text } from 'react-native';

const EmojiGrid = () => {
  const emojis = [
    { name: 'Alegria', image: require('../assets/images/alegria.png') },
    { name: 'Calma', image: require('../assets/images/calma.png') },
    { name: 'Amor', image: require('../assets/images/amor.png') },
    { name: 'Cansaco', image: require('../assets/images/cansaco.png') },    
    { name: 'Medo', image: require('../assets/images/medo.png') },
    { name: 'Tristeza', image: require('../assets/images/tristeza.png') },
    { name: 'Aflição', image: require('../assets/images/aflicao.png') },
    { name: 'Raiva', image: require('../assets/images/raiva.png') },
  ];

  const handleEmojiPress = (emojiName) => {
    console.log(`Emoji ${emojiName} pressionado!`);     
  };

  return (
    <View style={styles.emojiGrid}>
      {emojis.map((emoji) => (
        <TouchableOpacity 
          key={emoji.name} 
          style={styles.emojiButton} 
          onPress={() => handleEmojiPress(emoji.name)}
        >
          <Image source={emoji.image} style={styles.emojiImage} />
          <Text style={styles.emojiLabel}>{emoji.name}</Text>
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  emojiGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    marginTop: 20,
  },
  emojiButton: {
    alignItems: 'center',
    marginBottom: 10,
  },
  emojiImage: {
    width: 50,
    height: 50,
  },
  emojiLabel: {
    fontSize: 12,
    marginTop: 5,
  },
});

export default EmojiGrid;