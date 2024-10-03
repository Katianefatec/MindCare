import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TextInput, Pressable, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { sendPasswordResetEmail } from 'firebase/auth';
import loginStyles from './styles/LoginStyles';
import { auth } from '../config/firebaseConfig';

const AlteraSenha = () => {
  const [email, setEmail] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handlePasswordReset = () => {
    sendPasswordResetEmail(auth, email, {
      url: 'http://localhost:8081/Login', 
      handleCodeInApp: true, 
    })
      .then(() => {
        Alert.alert("Sucesso", "Email de recuperação enviado!");
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  return (
    <SafeAreaView style={loginStyles.safeAreaView}>
      <ScrollView style={loginStyles.scrollView}>
        <View style={loginStyles.container}>
          <Image source={require('../../assets/images/LogoMindCare.png')} resizeMode={"stretch"} style={loginStyles.mainImage} />
          <View style={loginStyles.inputContainer}>
            <FontAwesome name="envelope" size={15} color="#000" style={loginStyles.icon} />
            <TextInput
              placeholder="E-mail"
              value={email}
              onChangeText={setEmail}
              style={loginStyles.input}
            />
          </View>
          {errorMessage ? <Text style={loginStyles.errorMessage}>{errorMessage}</Text> : null}
          <Pressable onPress={handlePasswordReset} style={loginStyles.loginButton}>
            <Text style={loginStyles.loginButtonText}>Enviar Email de Recuperação</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default AlteraSenha;