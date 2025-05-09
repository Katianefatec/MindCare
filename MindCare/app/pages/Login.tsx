import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from "react";
import { Animated, Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { auth } from '../../config/firebaseConfig';
import loginStyles from './styles/LoginStyles';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  const handleLogin = () => {
    Animated.sequence([
      Animated.timing(fadeAnim, {
        toValue: 0.3,
        duration: 100,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 100,
        useNativeDriver: true,
      }),
    ]).start(() => {
      signInWithEmailAndPassword(auth, email, password)
        .then(() => {        
          router.push('/pages/HomePage');
        })
        .catch(error => {
          if (error.code === 'auth/user-not-found') {
            setErrorMessage("Usuário não cadastrado.");
          } else {
            setErrorMessage(error.message);
          }
        });
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
              placeholder="E-mail"
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
          <Animated.View style={{ opacity: fadeAnim }}>
            <Pressable onPress={handleLogin} style={loginStyles.loginButton}>
              <Text style={loginStyles.loginButtonText}>ENTRAR</Text>
            </Pressable>
          </Animated.View>
          <Text onPress={navigateToRegister} style={loginStyles.linkText}>Não possui conta? Clique aqui</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;