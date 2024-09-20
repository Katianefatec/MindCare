import React from 'react';
import { Image, TouchableOpacity, View } from 'react-native';
import bottomBarStyles from '../styles/BottomBarStyles';

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
    <View style={bottomBarStyles.bottomBar}>
      {icons.map((icon) => (
        <TouchableOpacity 
          key={icon.name} 
          style={bottomBarStyles.iconButton} 
          onPress={() => handleIconPress(icon.name)}
        >
          <Image source={icon.image} style={bottomBarStyles.iconImage} />
        </TouchableOpacity>
      ))}
    </View>
  );
};


export default BottomBar;