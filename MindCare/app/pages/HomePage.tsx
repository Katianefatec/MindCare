import React, { useEffect, useState } from 'react';
import { ImageBackground, Text, View } from 'react-native';
import EmojiGrid from '../components/navigation/EmojiGrid';
import BottomBar from '../components/navigation/BottomBar';
import homePageStyles from './styles/HomePageStyles';
import { auth, db } from '../config/firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

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
        <Text style={homePageStyles.greeting}>Bom dia, {userName}!</Text>
        <Text style={homePageStyles.question}>Qual o sentimento de hoje?</Text>

        <EmojiGrid />

        <BottomBar /> 
      </View>
    </ImageBackground>
  );
}

export default HomePage;