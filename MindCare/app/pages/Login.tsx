import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Image, Text, TextInput, Pressable, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { signInWithEmailAndPassword } from 'firebase/auth';
import loginStyles from './styles/LoginStyles';
import { auth } from '../config/firebaseConfig';
import { useRouter } from 'expo-router';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then(() => {
        Alert.alert("Sucesso", "Login realizado com sucesso!");
        router.push('/pages/HomePage');
      })
      .catch(error => {
        if (error.code === 'auth/user-not-found') {
          setErrorMessage("Usuário não cadastrado.");
        } else {
          setErrorMessage(error.message);
        }
      });
  };

  const handleAlteraSenha = () => {
    router.push('/pages/AlteraSenha');
  };

  const navigateToRegister = () => {
    router.push('/pages/Cadastro');
  };

  return (
    <SafeAreaView style={loginStyles.safeAreaView}>
      <ScrollView style={loginStyles.scrollView}>
        <View style={loginStyles.container}>
          <Image source={require('../../assets/images/LogoMindCare.png')} resizeMode={"stretch"} style={loginStyles.mainImage} />
          <View style={loginStyles.inputContainer}>
            <FontAwesome name="envelope" size={15} color="#000" style={loginStyles.icon} />
            <TextInput
              placeholder="E-mail ou nome de usuário"
              value={email}
              onChangeText={setEmail}
              style={loginStyles.input}
            />
          </View>
          <View style={loginStyles.inputContainer}>
            <FontAwesome name="lock" size={17} color="#000" style={loginStyles.icon} />
            <TextInput
              placeholder="Senha"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={loginStyles.input}
            />
          </View>
          {errorMessage ? <Text style={loginStyles.errorMessage}>{errorMessage}</Text> : null}
          <Pressable onPress={handleLogin} style={loginStyles.loginButton}>
            <Text style={loginStyles.loginButtonText}>ENTRAR</Text>
          </Pressable>          
          <Text onPress={navigateToRegister} style={loginStyles.linkText}>Não possui conta? Clique aqui</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;