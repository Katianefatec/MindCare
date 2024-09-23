import React, { useState } from 'react';
import { ImageBackground, Text, View, TextInput, TouchableOpacity, Platform } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import BottomBar from '../components/navigation/BottomBar';
import Reflexao from '../components/navigation/Reflexao';
import reflexaoPageStyles from './styles/ReflexaoPageStyles';
import reflexaoStyles from '../components/styles/ReflexaoStyles';

const ReflexaoPage = () => {
  const [search, setSearch] = useState('');
  const [date, setDate] = useState(new Date());
  const [show, setShow] = useState(false);

  const onChange = (event: any, selectedDate?: Date) => {
    const currentDate = selectedDate || date;
    setShow(Platform.OS === 'ios');
    setDate(currentDate);
    console.log(`Data selecionada: ${currentDate}`);
  };

  const showDatepicker = () => {
    setShow(true);
  };

  return (
    <ImageBackground 
      source={require('../../assets/images/fundoReflexao.png')}
      style={reflexaoPageStyles.backgroundImage}
    >
      <View style={reflexaoPageStyles.container}>
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
        <Text style={reflexaoPageStyles.greeting}>O que te inspira?</Text>
        <Reflexao/>
        <BottomBar /> 
      </View>
    </ImageBackground>
  );
}

export default ReflexaoPage;