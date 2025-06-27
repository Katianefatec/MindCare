import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useRef, useState } from "react";
import { Animated, Image, Pressable, SafeAreaView, ScrollView, Text, TextInput, View } from "react-native";
import { auth } from '../../config/firebaseConfig';
import loginStyles from './styles/LoginStyles';

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(1)).current;

  // Função para validar campos antes do login
  const validateFields = () => {
    if (!email.trim()) {
      setErrorMessage('Por favor, preencha seu e-mail.');
      return false;
    }
    
    if (!password.trim()) {
      setErrorMessage('Por favor, preencha sua senha.');
      return false;
    }
    
    // Validar formato de e-mail
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setErrorMessage('Por favor, digite um e-mail válido.');
      return false;
    }
    
    return true;
  };

  // Função para traduzir erros do Firebase
  const getFirebaseErrorMessage = (errorCode: string) => {
    switch (errorCode) {
      case 'auth/user-not-found':
        return 'Usuário não encontrado. Verifique seu e-mail ou crie uma conta.';
      case 'auth/wrong-password':
        return 'Senha incorreta. Tente novamente ou redefina sua senha.';
      case 'auth/invalid-email':
        return 'E-mail inválido. Verifique o formato do seu e-mail.';
      case 'auth/user-disabled':
        return 'Esta conta foi desativada. Entre em contato com o suporte.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas de login. Aguarde alguns minutos antes de tentar novamente.';
      case 'auth/network-request-failed':
        return 'Erro de conexão. Verifique sua internet e tente novamente.';
      case 'auth/invalid-credential':
        return 'Credenciais inválidas. Verifique seu e-mail e senha.';
      case 'auth/user-token-expired':
        return 'Sessão expirada. Faça login novamente.';
      default:
        return 'Erro inesperado no login. Tente novamente ou entre em contato com o suporte.';
    }
  };

  const handleLogin = async () => {
    // Limpar mensagem de erro anterior
    setErrorMessage('');
    
    // Validar campos antes de enviar
    if (!validateFields()) {
      return;
    }

    setIsLoading(true);

    try {
      // Animação do botão
      await new Promise<void>((resolve) => {
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
        ]).start(() => resolve());
      });

      // Fazer login
      await signInWithEmailAndPassword(auth, email.trim().toLowerCase(), password);
      router.push('/pages/HomePage');
    } catch (error) {
      console.error('Erro ao fazer login:', error);
      const firebaseError = error as FirebaseError;
      
      // Usar nossa função de tradução de erros
      const errorMessage = getFirebaseErrorMessage(firebaseError.code);
      setErrorMessage(errorMessage);
    } finally {
      setIsLoading(false);
    }
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
            <FontAwesome name="envelope" size={15} color="#82997E" style={loginStyles.icon} />
            <TextInput
              placeholder="E-mail"
              placeholderTextColor="#82997E"
              value={email}
              onChangeText={setEmail}
              style={loginStyles.input}
              keyboardType="email-address"
              autoCapitalize="none"
              autoComplete="email"
            />
          </View>
          <View style={loginStyles.inputContainer}>
            <FontAwesome name="lock" size={17} color="#82997E" style={loginStyles.icon} />
            <TextInput
              placeholder="Senha"
              placeholderTextColor="#82997E"
              value={password}
              onChangeText={setPassword}
              secureTextEntry
              style={loginStyles.input}
              autoComplete="password"
            />
          </View>
          {errorMessage ? <Text style={loginStyles.errorMessage}>{errorMessage}</Text> : null}
          <Animated.View style={{ opacity: fadeAnim }}>
            <Pressable 
              onPress={handleLogin} 
              style={[
                loginStyles.loginButton,
                isLoading && { opacity: 0.7, backgroundColor: '#15404A' }
              ]}
              disabled={isLoading}
            >
              <Text style={loginStyles.loginButtonText}>
                {isLoading ? "ENTRANDO..." : "ENTRAR"}
              </Text>
            </Pressable>
          </Animated.View>
          <Text onPress={navigateToRegister} style={loginStyles.linkText}>Não possui conta? Clique aqui</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Login;