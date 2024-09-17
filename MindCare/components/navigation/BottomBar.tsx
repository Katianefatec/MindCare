import React from 'react';
import { View, TouchableOpacity, Image, StyleSheet } from 'react-native';

const BottomBar = () => {
  const icons = [
    { name: 'Home', image: require('../../assets/images/botao-home.png') },
    { name: 'Diario', image: require('../../assets/images/diario.png') },    
    { name: 'Lista', image: require('../../assets/images/avaliacao.png') },
    { name: 'Ajuda', image: require('../../assets/images/apoio.png') },
    { name: 'Perfil', image: require('../../assets/images/perfil.png') },
    { name: 'CalmaMenu', image: require('../../assets/images/calmaMenu.png') },
  ];

  const handleIconPress = (iconName) => {
    console.log(`Ícone ${iconName} pressionado!`);
    // Aqui você pode adicionar a lógica de navegação ou ação para cada ícone
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
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    paddingVertical: 10,
    marginTop: 20,
  },
  iconButton: {
    padding: 10,
  },
  iconImage: {
    width: 24,
    height: 24,
  },
});

export default BottomBar;