import React, { useState } from 'react';
import { View, Text, ScrollView, TouchableOpacity, Image, Linking } from 'react-native';
import { WebView } from 'react-native-webview';
import aprenderStyles from '../../pages/calma/css/AprenderStyles';  
import meditarStyles from '../../pages/calma/css/MeditarStyles';

const Aprendendo = () => {
  const [currentLink, setCurrentLink] = useState<string | null>(null);

  const aprendendoOptions = [
    {
      title: 'Como cuidar da saúde mental',
      link: 'https://www.psitto.com.br/blog/como-cuidar-da-saude-mental/', 
      image: require('../../../assets/images/como-cuidar.png'),
    },
    {
      title: '7 dicas para sua saúde mental',
      link: 'https://vidasaudavel.einstein.br/como-cuidar-da-saude-mental/', 
      image: require('../../../assets/images/7dicas.png'),
    },
    {
      title: 'Diálogo sobre depressão',
      link: 'https://www.janssen.com/brasil/falarinspiravida?utm_source=google_search&utm_medium=search_Ketchum_Neurologia_FIV&gclid=Cj0KCQjw8--2BhCHARIsAF_w1gyGEYad21jbyXw8TawK8zTHEQcEpr5P7WhZIWU5vM-zdxEQGUEu-20aAte2EALw_wcB', 
      image: require('../../../assets/images/inspiraVida.png'),
    },
    {
      title: 'Como controlar a ansiedade',
      link: 'https://www.youtube.com/embed/7o1kkoyWDk0', 
    },
  ];

  const handleOptionPress = (link: string) => {
    if (link.includes('youtube.com/embed/')) {
      setCurrentLink(link);
    } else {
      Linking.openURL(link);
    }
  };

  return (
    <ScrollView contentContainerStyle={aprenderStyles.scrollViewContent}>
      <View style={aprenderStyles.aprendendoOptions}>
        {aprendendoOptions.map((option, index) => (
          <TouchableOpacity
            key={index}
            style={aprenderStyles.aprendendoOption}
            onPress={() => handleOptionPress(option.link)}
          >
            {option.link.includes('youtube.com/embed/') ? (
              <View style={meditarStyles.meditationOption}>
                <WebView
                  style={meditarStyles.webView}
                  source={{ uri: option.link }}
                  javaScriptEnabled={true}
                  domStorageEnabled={true}
                />
                <Text style={meditarStyles.meditationTitle}>{option.title}</Text>
              </View>
            ) : (
              <>
                <Image
                  source={option.image} 
                  style={aprenderStyles.previewImage}
                />
                <Text style={aprenderStyles.aprendendoTitle}>{option.title}</Text>
              </>
            )}
          </TouchableOpacity>
        ))}  
      </View>
      {currentLink && (
        <WebView
          style={{ flex: 1, height: 300 }}
          source={{ uri: currentLink }}
          javaScriptEnabled={true}
          domStorageEnabled={true}
        />
      )}
    </ScrollView>
  );
};

export default Aprendendo;