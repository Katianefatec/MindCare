import meditarStyles from '@/app/pages/calma/css/MeditarStyles';
import React from 'react';
import { View, TouchableOpacity, Text, Linking, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

const Meditacao = () => {
    const meditationOptions = [
      {
        title: 'Meditação para iniciantes',
        link: 'https://www.youtube.com/embed/32UM11dSves', 
      },
      {
        title: 'Limpeza Mental',
        link: 'https://www.youtube.com/embed/xEvdvXoSa3U', 
      },
      {
        title: 'Meditação - 15 Minutos',
        link: 'https://www.youtube.com/embed/A-_MfC5Mk9Y', 
      },
      {
        title: 'Meditação - 10 Minutos',
        link: 'https://www.youtube.com/embed/QQkRN4tjHns', 
      },
      {
        title: 'Som da paz interior',
        link: 'https://www.youtube.com/embed/a98zkXRKeCs', 
      },
      {
        title: 'Frequência de cura',
        link: 'https://www.youtube.com/embed/zTm0l-BhzNg', 
      },
    ];
  
    return (
      <ScrollView contentContainerStyle={meditarStyles.scrollViewContent}>
        <View style={meditarStyles.meditationOptions}>
          {meditationOptions.map((option, index) => (
            <View key={index} style={meditarStyles.meditationOption}>
              <WebView
                style={meditarStyles.webView}
                source={{ uri: option.link }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
              />
              <Text style={meditarStyles.meditationTitle}>{option.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };
  
  export default Meditacao;