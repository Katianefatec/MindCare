import React, { useState } from "react";
import { SafeAreaView, View, ScrollView, ImageBackground, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import cadastroStyles from '../pages/styles/CadastroStyles';
import DatePicker from '../components/navigation/DatePicker';
import GenderPicker from '../components/navigation/GenderPicker'; 
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { FirebaseError } from 'firebase/app';
import { db, auth } from '../config/firebaseConfig';
import { collection, setDoc, doc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const Cadastro = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  const handleSignUp = async () => {
    try {
      createUserWithEmailAndPassword(auth, email, password)
      .then(async (userCredential) => {
        const user = userCredential.user;
        await setDoc(doc(db, "users", user.uid), {
        name,
        email,
        birthDate,
        gender,
        userId: user.uid,
        date: new Date().toLocaleString(),
      });
      Alert.alert('Sucesso', 'Usuário criado com sucesso!');
      router.push('/pages/Login');
    });
    } catch (error) {
      const firebaseError = error as FirebaseError;
      if (firebaseError.code === 'auth/email-already-in-use') {
        setErrorMessage('Este endereço de e-mail já está em uso.');
      } else if ((error as FirebaseError).code === 'auth/invalid-email') {
        setErrorMessage('Este endereço de e-mail é inválido.');
      } else {
        setErrorMessage((error as any).message);
      }
    }
  };

  return (
    <SafeAreaView style={cadastroStyles.container}>
      <ImageBackground
        source={require('../../assets/images/fundoCadastro.png')}
        style={cadastroStyles.backgroundImage}
      >
        <ScrollView style={cadastroStyles.scrollView}>
          <View style={cadastroStyles.column}>
            <View style={cadastroStyles.row}>
              <FontAwesome name="user" size={20} color="#82997E" style={cadastroStyles.icon} />
              <TextInput
                style={cadastroStyles.input}
                placeholder="Nome completo"
                placeholderTextColor="#82997E"
                value={name}
                onChangeText={setName}
              />
            </View>
            <View style={cadastroStyles.row2}>
              <MaterialCommunityIcons name="email" size={20} color="#82997E" style={cadastroStyles.icon} />
              <TextInput
                style={cadastroStyles.input}
                placeholder="Celular ou e-mail"
                placeholderTextColor="#82997E"
                value={email}
                onChangeText={setEmail}
              />
            </View>
            <View style={cadastroStyles.row3}>
              <FontAwesome name="lock" size={20} color="#82997E" style={cadastroStyles.icon} />
              <TextInput
                style={cadastroStyles.input}
                placeholder="Senha"
                placeholderTextColor="#82997E"
                secureTextEntry
                value={password}
                onChangeText={setPassword}
              />
            </View>
            <Text style={cadastroStyles.text2}>
              {"Data de nascimento:"}
            </Text>
            <DatePicker onDateChange={(date) => setBirthDate(`${date.day}-${date.month}-${date.year}`)} />
            <Text style={cadastroStyles.text4}>
              {"Gênero:"}
            </Text>
            <GenderPicker onGenderChange={setGender} />
            {errorMessage ? <Text style={cadastroStyles.errorMessage}>{errorMessage}</Text> : null}
            <TouchableOpacity style={cadastroStyles.view} onPress={handleSignUp}>
              <Text style={cadastroStyles.text5}>
                {"CADASTRAR"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
      </ImageBackground>
    </SafeAreaView>
  )
}

export default Cadastro;