import { useRouter } from 'expo-router';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useState } from 'react';
import { Alert, Button, StyleSheet, Text, TextInput, View } from 'react-native';
import { auth, db } from '../../../config/firebaseConfig';
import loginStyles from '../styles/LoginStyles';

const CadastroProfissional = () => {
  const [name, setName] = useState('');
  const [specialty, setSpecialty] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [password, setPassword] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleRegister = async () => {
    try {
      // Criar o usuário de autenticação
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Salvar os dados do profissional no Firestore
      await setDoc(doc(db, 'professionals', user.uid), {
        id: user.uid,
        name,
        specialty,
        email,
        phone,
        dateCreated: new Date(),
      });

      Alert.alert('Sucesso', 'Cadastro realizado com sucesso!');
      router.push('/pages/profissionais/ProfessionalLogin'); 
    } catch (error) {
      console.error('Erro ao cadastrar profissional:', error);
      setErrorMessage('Erro ao cadastrar profissional.');
    }
  };

  return (
    <View style={loginStyles.container}>
      <Text style={styles.title}>Cadastro de Profissional</Text>
      <TextInput
        placeholder="Nome"
        value={name}
        onChangeText={setName}
        style={styles.input}
      />
      <TextInput
        placeholder="Especialidade"
        value={specialty}
        onChangeText={setSpecialty}
        style={styles.input}
      />
      <TextInput
        placeholder="E-mail"
        value={email}
        onChangeText={setEmail}
        style={styles.input}
        keyboardType="email-address"
      />
      <TextInput
        placeholder="Telefone"
        value={phone}
        onChangeText={setPhone}
        style={styles.input}
        keyboardType="phone-pad"
      />
      <TextInput
        placeholder="Senha"
        value={password}
        onChangeText={setPassword}
        style={styles.input}
        secureTextEntry
      />
      {errorMessage ? <Text style={styles.error}>{errorMessage}</Text> : null}
      <Button title="Cadastrar" onPress={handleRegister} />
    </View>
  );
};

const styles = StyleSheet.create({
  // ... (seus estilos)
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
    textAlign: 'center',
  },
});

export default CadastroProfissional;