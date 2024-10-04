import { MaterialCommunityIcons, FontAwesome } from '@expo/vector-icons';
import DateTimePicker from '@react-native-community/datetimepicker';
import React, { useState } from 'react';
import { ImageBackground, Platform, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { db, auth } from '../../config/firebaseConfig';
import BottomBar from '../../components/navigation/BottomBar';
import Reflexao from '../../components/navigation/Reflexao';
import reflexaoPageStyles from '../styles/ReflexaoPageStyles';

const ReflexaoPage = () => {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);


  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'android');
    setDate(currentDate);
    console.log(`Data selecionada: ${currentDate}`);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  const handleSearch = async () => {
    const user = auth.currentUser;
    if (!user) {
      console.error("Usuário não autenticado");
      return;
      }
    };

  return (
    <ImageBackground 
      source={require('../../../assets/images/fundoReflexao.png')}
      style={reflexaoPageStyles.backgroundImage}
    >
      <View style={reflexaoPageStyles.searchContainer}>
          <TextInput
            style={reflexaoPageStyles.searchInput}
            placeholder="Buscar inspiração"
            value={search}
            onChangeText={setSearch}
          />
          <TouchableOpacity onPress={showDatepicker}>
            <MaterialCommunityIcons name="calendar" size={24} color="#000" style={reflexaoPageStyles.calendarioIcon} />
          </TouchableOpacity>
          <TouchableOpacity onPress={handleSearch}>
            <FontAwesome name="search" size={24} color="#000" style={reflexaoPageStyles.searchIcon} />
          </TouchableOpacity>
        </View>
        {show && (
          <DateTimePicker
            testID="dateTimePicker"
            value={date}
            mode="date"
            display="default"
            onChange={onChange}
          />
        )}
        
      <View style={reflexaoPageStyles.container}>
        
        <Text style={reflexaoPageStyles.greeting}>O que te inspira?</Text>
        <Reflexao/>
        <BottomBar /> 
      </View>
    </ImageBackground>
  );
}

export default ReflexaoPage;