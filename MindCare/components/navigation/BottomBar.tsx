import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const BottomBar = () => {
  const icons = [
    { name: 'Home', image: require('../../assets/images/botao-home.png') },
    { name: 'Diario', image: require('../../assets/images/diario.png') },    
    { name: 'Avaliacao', image: require('../../assets/images/avaliacao.png') },
    { name: 'Apoio', image: require('../../assets/images/apoio.png') },
    { name: 'Perfil', image: require('../../assets/images/perfil.png') },
    { name: 'CalmaMenu', image: require('../../assets/images/calmaMenu.png') },
  ];

  const handleIconPress = (iconName) => {
    console.log(`Ícone ${iconName} pressionado!`);

    if (iconName === 'CalmaMenu') {
      // Lógica para o botão CalmaMenu
    }

    if (iconName === 'Diario') {
      // Lógica para o botão Diário
    }

    if (iconName === 'Avaliacao') {
      // Lógica para o botão Avaliação
    }

    if (iconName === 'Apoio') {
      // Lógica para o botão Apoio
    }

    if (iconName === 'Perfil') {
      // Lógica para o botão Perfil
    }
    
   
  };

  return (
    <View style={styles.bottomBar}>
      {icons.map((icon) => (
        <TouchableOpacity 
          key={icon.name} 
          style={styles.iconButton} 
          onPress={() => handleIconPress(icon.name)}
        >
          <Image source={icon.image} style={styles.iconImage} />
        </TouchableOpacity>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  bottomBar: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
   
    paddingVertical: 10,
    backgroundColor: '#307B86', 
    position: 'absolute',
    bottom: 0,
    width: '100%',
  },
  iconButton: {
    padding: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
    tintColor: 'white',
  },
});

export default BottomBar;