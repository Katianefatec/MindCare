import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { ImageBackground, ScrollView, Text, View } from 'react-native';
import { auth, db } from '../../config/firebaseConfig';
import BottomBar from '../components/navigation/BottomBar';
import EmojiGrid from '../components/navigation/EmojiGrid';
import homePageStyles from './styles/HomePageStyles';

const HomePage = () => {
  const [userName, setUserName] = useState('');

  useEffect(() => {
    const fetchUserName = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, 'users', user.uid));
        if (userDoc.exists()) {
          setUserName(userDoc.data().name);
        }
      }
    };

    fetchUserName();
  }, []);

  return (
    <ImageBackground 
      source={require('../../assets/images/fundoHome.png')}
      style={homePageStyles.backgroundImage}
    >
      <View style={homePageStyles.container}>
        <ScrollView style={homePageStyles.scrollView}>
          <View>
            <Text style={homePageStyles.greeting}>Bom dia, {userName}!</Text>
            <Text style={homePageStyles.question}>Qual o sentimento de hoje?</Text>

          <EmojiGrid />
          </View>
        </ScrollView>

        <BottomBar /> 
        
      </View>
    </ImageBackground>
  );
}

export default HomePage;