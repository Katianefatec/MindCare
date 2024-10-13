import React, { useEffect, useState } from "react";
import { SafeAreaView, View, ScrollView, Text, TextInput, TouchableOpacity, Alert } from "react-native";
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import cadastroStyles from './styles/CadastroStyles';
import DatePicker from '../components/navigation/DatePicker';
import GenderPicker from '../components/navigation/GenderPicker'; 
import { auth, db } from '../config/firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { useRouter } from 'expo-router';

const EditarPerfil = () => {
  const [email, setEmail] = useState('');  
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState<{ day: number; month: number; year: number } | null>(null);
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (user) {
        const userDoc = await getDoc(doc(db, "users", user.uid));
        if (userDoc.exists()) {
          const userData = userDoc.data();
          setEmail(userData.email);
          setName(userData.name);
          if (userData.birthDate) {
            const [day, month, year] = userData.birthDate.split('-').map(Number);
            setBirthDate({ day, month, year });
          }
          setGender(userData.gender);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          name,
          email,
          birthDate: birthDate ? `${birthDate.day}-${birthDate.month}-${birthDate.year}` : '',
          gender,
          userId: user.uid,
          date: new Date().toLocaleString(),
        });
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
        // router.push('/pages/Login');
      }
    } catch (error) {
      setErrorMessage('Erro ao atualizar perfil: ' + (error as any).message);
    }
  };

  return (
    <SafeAreaView style={cadastroStyles.container2}>
      <Text style={cadastroStyles.title}>Editar Perfil</Text>    
      <ScrollView style={cadastroStyles.scrollView}>
        <View style={cadastroStyles.column2}>
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
              placeholder="E-mail"
              placeholderTextColor="#82997E"
              value={email}
              onChangeText={setEmail}
            />
          </View>          
          <Text style={cadastroStyles.text2}>Data de nascimento:</Text>
          <DatePicker 
            onDateChange={(date) => setBirthDate(date)} 
            initialDate={birthDate || undefined} 
            selectedDay={birthDate?.day || 0}
            selectedMonth={birthDate?.month || 0}
            selectedYear={birthDate?.year || 0}
          />
          <Text style={cadastroStyles.text4}>Gênero:</Text>
          <GenderPicker 
            onGenderChange={setGender} 
            selectedGender={gender}
          />
          {errorMessage ? <Text style={cadastroStyles.errorMessage}>{errorMessage}</Text> : null}
          <TouchableOpacity style={cadastroStyles.view} onPress={handleUpdateProfile}>
            <Text style={cadastroStyles.text5}>SALVAR</Text>
          </TouchableOpacity>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default EditarPerfil;