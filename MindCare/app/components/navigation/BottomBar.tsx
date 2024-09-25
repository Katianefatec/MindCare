import { MaterialCommunityIcons } from '@expo/vector-icons'; // Importe a biblioteca de ícones
import { router } from 'expo-router';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';
import bottomBarStyles from '../styles/BottomBarStyles';

const BottomBar = () => {
  const icons: { name: string; icon: 'home-outline' | 'lightbulb-outline' | 'meditation' | 'hand-heart-outline' | 'account-outline'; color: string }[] = [
    { name: 'Home', icon: 'home-outline', color: '#194146' },
    { name: 'Reflexão', icon: 'lightbulb-outline', color: '#194146' },
    { name: 'CalmaMenu', icon: 'meditation', color: '#194146' },
    { name: 'Apoio', icon: 'hand-heart-outline', color: '#194146' },
    { name: 'Perfil', icon: 'account-outline', color: '#194146' },
  ];

  const handleIconPress = (iconName: string) => {
    console.log(`Ícone ${iconName} pressionado!`);

    if (iconName==='Home') {
      router.push('/pages/HomePage'); 
    }

    if (iconName === 'CalmaMenu') {
      router.push('/pages/CalmaPage'); 
    }

    if (iconName === 'Reflexão') {
      router.push(`/pages/reflexoes/ReflexaoPage`); 
    }

    if (iconName === 'Avaliacao') {
      router.push('/pages/AvaliacaoPage');     }

    if (iconName === 'Apoio') {
      router.push('/pages/ApoioPage'); 
    }

    if (iconName === 'Perfil') {
      router.push('/pages/Perfil');     }
  };

  return (
    <View style={bottomBarStyles.bottomBar}>
      {icons.map((icon) => (
        <TouchableOpacity 
          key={icon.name}           
          onPress={() => handleIconPress(icon.name)}
        >
          <MaterialCommunityIcons name={icon.icon} size={35} color={icon.color} />
          
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default BottomBar;