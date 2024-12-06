import musicaStyles from '../../pages/calma/css/MusicaStyles';
import React from 'react';
import { View, Text, ScrollView } from 'react-native';
import { WebView } from 'react-native-webview';

const Musica = () => {
    const musicaOptions = [
      {
        title: 'Música clássica relaxante',
        link: 'https://www.youtube.com/embed/imA0OQzDrFE', 
      },

      {
        title: 'Sonata Patética',
        link: 'https://www.youtube.com/embed/WG6bC0-sr3o', 
      },
      {
        title: 'The Four Seasons',
        link: 'https://www.youtube.com/embed/exS1BGnn-_w', 
      },
      
      {
        title: 'Chopin',
        link: 'https://www.youtube.com/embed/cKC_sh1QGy0', 
      },
      {
        title: 'Una Mattina',
        link: 'https://www.youtube.com/embed/-8X_aMT5z0A', 
      },
      {
        title: 'Time To Say Goodbye',
        link: 'https://www.youtube.com/embed/qjzJYa7tHLs', 
      },
    ];
  
    return (
      <ScrollView contentContainerStyle={musicaStyles.scrollViewContent}>
        <View style={musicaStyles.musicaOptions}>
          {musicaOptions.map((option, index) => (
            <View key={index} style={musicaStyles.musicaOption}>
              <WebView
                style={musicaStyles.webView}
                source={{ uri: option.link }}
                javaScriptEnabled={true}
                domStorageEnabled={true}
              />
              <Text style={musicaStyles.musicaTitle}>{option.title}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    );
  };
  
  export default Musica;