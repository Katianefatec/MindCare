import { useRouter } from 'expo-router';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Button, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { auth, db } from '../../../config/firebaseConfig';
import loginStyles from '../styles/LoginStyles';

const ProfessionalLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleLogin = async () => {
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const userDoc = await getDoc(doc(db, 'professionals', userCredential.user.uid));
      
      if (!userDoc.exists()) {
        setErrorMessage('Acesso permitido apenas para profissionais cadastrados');
        return;
      }
      
      router.push('/pages/profissionais/ProfessionalDashboard');
    } catch (error) {
      setErrorMessage((error as Error).message);
    }
  };

  // Função para navegar para a página de cadastro de profissional
  const navigateToProfessionalRegister = () => {
    router.push('/pages/profissionais/CadastroProfissional'); // Certifique-se de que este é o caminho correto para a página de cadastro
  };

  return (
    <View style={loginStyles.container}>
      <Text style={styles.title}>Login Profissional</Text>
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        style={styles.input}
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Entrar" onPress={handleLogin} />
      <TouchableOpacity onPress={navigateToProfessionalRegister}>
        <Text style={styles.linkText}>Não possui conta? Cadastre-se aqui</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (seus estilos existentes)
  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20,
  },
  title: {
    fontSize: 24,
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    height: 40,
    borderWidth: 1,
    marginBottom: 10,
    padding: 10,
  },
  error: {
    color: 'red',
    marginBottom: 10,
  },
  linkText: {
    marginTop: 10,
    color: 'blue',
    textAlign: 'center',
  },
});

export default ProfessionalLogin;