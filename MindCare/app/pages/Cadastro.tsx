import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, Text, TextInput, Pressable, Alert } from "react-native";
import { FontAwesome } from '@expo/vector-icons';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import { auth, db } from '../config/firebaseConfig';
import loginStyles from './styles/LoginStyles';

interface CadastroProps {  
  navigation?: any;
}

const Cadastro = (props: CadastroProps) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  const handleCadastro = () => {
    createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
          name: name,
          email: email,
        });
        Alert.alert("Sucesso", "Usuário registrado com sucesso!");
      })
      .catch(error => {
        setErrorMessage(error.message);
      });
  };

  return (
    <SafeAreaView style={loginStyles.safeAreaView}>
      <ScrollView style={loginStyles.scrollView}>
        <View style={loginStyles.container}>
          <View style={loginStyles.inputContainer}>
            <FontAwesome name="user" size={15} color="#000" style={loginStyles.icon} />
            <TextInput
              placeholder="Nome"
              value={name}
              onChangeText={setName}
              style={loginStyles.input}
            />
          </View>
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
          <Pressable onPress={handleCadastro} style={loginStyles.loginButton}>
            <Text style={loginStyles.loginButtonText}>REGISTRAR</Text>
          </Pressable>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default Cadastro;