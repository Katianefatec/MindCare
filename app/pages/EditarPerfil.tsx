import { useRouter } from 'expo-router';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import { Alert, ImageBackground, Modal, SafeAreaView, ScrollView, Text, TextInput, TouchableOpacity, View } from "react-native";
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from '../../config/firebaseConfig';
import cadastroStyles from './styles/CadastroStyles';

const EditarPerfil = () => {
  const [email, setEmail] = useState('');  
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState('');
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date().toISOString().split('T')[0]);
  const router = useRouter();

  // Função para atualizar a data completa quando os campos mudam
  useEffect(() => {
    if (day && month && year) {
      const formattedDate = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
      setBirthDate(formattedDate);
    }
  }, [day, month, year]);

  // Função para validar e formatar entrada de dia
  const handleDayChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 2) {
      const dayNum = parseInt(numericValue);
      if (numericValue === '' || (dayNum >= 1 && dayNum <= 31)) {
        setDay(numericValue);
      }
    }
  };

  // Função para validar e formatar entrada de mês
  const handleMonthChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 2) {
      const monthNum = parseInt(numericValue);
      if (numericValue === '' || (monthNum >= 1 && monthNum <= 12)) {
        setMonth(numericValue);
      }
    }
  };

  // Função para validar e formatar entrada de ano
  const handleYearChange = (text: string) => {
    const numericValue = text.replace(/[^0-9]/g, '');
    if (numericValue.length <= 4) {
      setYear(numericValue);
    }
  };

  // Função para lidar com seleção do calendário
  const handleDateSelect = (day: any) => {
    const selectedDate = new Date(day.dateString);
    const dayNum = selectedDate.getDate().toString();
    const monthNum = (selectedDate.getMonth() + 1).toString();
    const yearNum = selectedDate.getFullYear().toString();
    
    setDay(dayNum);
    setMonth(monthNum);
    setYear(yearNum);
    setShowCalendar(false);
  };

  // Função para navegar rapidamente para um ano específico
  const navigateToYear = (targetYear: number) => {
    const currentDate = new Date(calendarDate);
    const newDate = new Date(targetYear, currentDate.getMonth(), 1);
    setCalendarDate(newDate.toISOString().split('T')[0]);
  };

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
            // Assumindo formato DD/MM/AAAA ou DD-MM-AAAA
            const dateStr = userData.birthDate.replace(/-/g, '/');
            const [dayStr, monthStr, yearStr] = dateStr.split('/');
            setDay(dayStr);
            setMonth(monthStr);
            setYear(yearStr);
          }
          setGender(userData.gender);
        }
      }
    };

    fetchUserData();
  }, []);

  const handleUpdateProfile = async () => {
    setIsLoading(true);
    setErrorMessage('');
    
    try {
      const user = auth.currentUser;
      if (user) {
        await setDoc(doc(db, "users", user.uid), {
          name: name.trim(),
          email: email.trim().toLowerCase(),
          birthDate,
          gender,
          userId: user.uid,
          updatedAt: new Date().toISOString(),
        }, { merge: true });
        Alert.alert('Sucesso', 'Perfil atualizado com sucesso!');
      }
    } catch (error) {
      setErrorMessage('Erro ao atualizar perfil: ' + (error as any).message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <SafeAreaView style={cadastroStyles.container}>
      <ImageBackground
        source={require('../../assets/images/fundoCadastro.png')}
        style={cadastroStyles.backgroundImage}
      >
        <ScrollView style={cadastroStyles.scrollView}>
          <View style={{
            alignItems: 'center',
            marginTop: 50,
            marginBottom: 0
          }}>
            <Text style={{
              fontSize: 28,
              fontWeight: 'bold',
              color: '#FFF',
              textShadowColor: 'rgba(0, 0, 0, 0.3)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
              letterSpacing: 1
            }}>
              Editar Perfil
            </Text>
            <Text style={{
              fontSize: 14,
              color: '#FFF',
              marginTop: 8,
              textAlign: 'center',
              opacity: 0.9,
              textShadowColor: 'rgba(0, 0, 0, 0.2)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2
            }}>
              Atualize suas informações pessoais
            </Text>
          </View>

          <View style={[cadastroStyles.column, { marginTop: 20 }]}>
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
                editable={false}
              />
            </View>
            
            <Text style={cadastroStyles.text2}>
              {"Data de nascimento:"}
            </Text>
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              marginBottom: 15,
              marginHorizontal: 38,
            }}>
              <View style={{
                flex: 1,
                flexDirection: 'row',
                justifyContent: 'space-between',
              }}>
                <View style={[cadastroStyles.datePickerItem, {
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  borderColor: "#000000C9",
                  borderWidth: 1,
                  paddingVertical: 9,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                }]}>
                  <TextInput
                    style={[cadastroStyles.input, { textAlign: 'center' }]}
                    placeholder="DD"
                    placeholderTextColor="#82997E"
                    value={day}
                    onChangeText={handleDayChange}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </View>
                
                <View style={[cadastroStyles.datePickerItem, {
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  borderColor: "#000000C9",
                  borderWidth: 1,
                  paddingVertical: 9,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                }]}>
                  <TextInput
                    style={[cadastroStyles.input, { textAlign: 'center' }]}
                    placeholder="MM"
                    placeholderTextColor="#82997E"
                    value={month}
                    onChangeText={handleMonthChange}
                    keyboardType="numeric"
                    maxLength={2}
                  />
                </View>
                
                <View style={[cadastroStyles.datePickerItem, {
                  flexDirection: "row",
                  alignItems: "center",
                  backgroundColor: "#FFFFFF",
                  borderColor: "#000000C9",
                  borderWidth: 1,
                  paddingVertical: 9,
                  paddingHorizontal: 14,
                  borderRadius: 8,
                }]}>
                  <TextInput
                    style={[cadastroStyles.input, { textAlign: 'center' }]}
                    placeholder="AAAA"
                    placeholderTextColor="#82997E"
                    value={year}
                    onChangeText={handleYearChange}
                    keyboardType="numeric"
                    maxLength={4}
                  />
                </View>
              </View>
              
              <TouchableOpacity
                onPress={() => setShowCalendar(true)}
                style={{
                  backgroundColor: "#FFFFFF",
                  borderColor: "#000000C9",
                  borderWidth: 1,
                  paddingVertical: 17,
                  paddingHorizontal: 15,
                  marginLeft: 10,
                  borderRadius: 8,
                }}
              >
                <FontAwesome name="calendar" size={20} color="#82997E" />
              </TouchableOpacity>
            </View>
            {birthDate && (
              <Text style={{
                color: '#FFF',
                fontSize: 14,
                textAlign: 'center',
                marginTop: 8,
                marginBottom: 10,
                opacity: 0.8
              }}>
                Data selecionada: {birthDate}
              </Text>
            )}
            
            <Text style={cadastroStyles.text4}>
              {"Gênero:"}
            </Text>
            
            <View style={cadastroStyles.row}>              
              <View style={[cadastroStyles.input, {paddingVertical: 10}]}>
                
                <TouchableOpacity 
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8
                  }}
                  onPress={() => setGender('masculino')}
                >
                  <View style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: '#82997E',
                    marginRight: 10,
                    backgroundColor: gender === 'masculino' ? '#82997E' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {gender === 'masculino' && (
                      <View style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#FFF'
                      }} />
                    )}
                  </View>
                  <Text style={{
                    color: '#82997E',
                    fontSize: 16,
                    fontWeight: gender === 'masculino' ? '600' : '400'
                  }}>Masculino</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8
                  }}
                  onPress={() => setGender('feminino')}
                >
                  <View style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: '#82997E',
                    marginRight: 10,
                    backgroundColor: gender === 'feminino' ? '#82997E' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {gender === 'feminino' && (
                      <View style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#FFF'
                      }} />
                    )}
                  </View>
                  <Text style={{
                    color: '#82997E',
                    fontSize: 16,
                    fontWeight: gender === 'feminino' ? '600' : '400'
                  }}>Feminino</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8
                  }}
                  onPress={() => setGender('nao-binario')}
                >
                  <View style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: '#82997E',
                    marginRight: 10,
                    backgroundColor: gender === 'nao-binario' ? '#82997E' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {gender === 'nao-binario' && (
                      <View style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#FFF'
                      }} />
                    )}
                  </View>
                  <Text style={{
                    color: '#82997E',
                    fontSize: 16,
                    fontWeight: gender === 'nao-binario' ? '600' : '400'
                  }}>Não binário</Text>
                </TouchableOpacity>
                
                <TouchableOpacity 
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 8
                  }}
                  onPress={() => setGender('prefiro-nao-dizer')}
                >
                  <View style={{
                    width: 16,
                    height: 16,
                    borderRadius: 8,
                    borderWidth: 2,
                    borderColor: '#82997E',
                    marginRight: 10,
                    backgroundColor: gender === 'prefiro-nao-dizer' ? '#82997E' : 'transparent',
                    justifyContent: 'center',
                    alignItems: 'center'
                  }}>
                    {gender === 'prefiro-nao-dizer' && (
                      <View style={{
                        width: 6,
                        height: 6,
                        borderRadius: 3,
                        backgroundColor: '#FFF'
                      }} />
                    )}
                  </View>
                  <Text style={{
                    color: '#82997E',
                    fontSize: 16,
                    fontWeight: gender === 'prefiro-nao-dizer' ? '600' : '400'
                  }}>Prefiro não dizer</Text>
                </TouchableOpacity>
                
              </View>
            </View>
            
            {errorMessage ? 
              <Text style={cadastroStyles.errorMessage}>{errorMessage}</Text> 
              : null}
              
            <TouchableOpacity 
              style={[
                cadastroStyles.view,
                isLoading && { opacity: 0.7, backgroundColor: '#15404A' }
              ]} 
              onPress={handleUpdateProfile}
              disabled={isLoading}
            >
              <Text style={cadastroStyles.text5}>
                {isLoading ? "SALVANDO..." : "SALVAR"}
              </Text>
            </TouchableOpacity>
          </View>
        </ScrollView>
        
        {/* Modal do Calendário */}
        <Modal
          visible={showCalendar}
          animationType="slide"
          transparent={true}
          onRequestClose={() => setShowCalendar(false)}
        >
          <View style={{
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            backgroundColor: 'rgba(0, 0, 0, 0.5)',
          }}>
            <View style={{
              backgroundColor: 'white',
              borderRadius: 10,
              padding: 20,
              margin: 20,
              width: '90%',
              maxHeight: '80%',
            }}>
              <View style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                marginBottom: 20,
              }}>
                <Text style={{
                  fontSize: 18,
                  fontWeight: 'bold',
                  color: '#19484F',
                  flex: 1,
                }}>
                  Selecione sua data de nascimento
                </Text>
                <TouchableOpacity
                  onPress={() => setShowCalendar(false)}
                  style={{
                    padding: 5,
                  }}
                >
                  <FontAwesome name="times" size={20} color="#82997E" />
                </TouchableOpacity>
              </View>
              
              <Calendar
                onDayPress={handleDateSelect}
                current={calendarDate}
                maxDate={new Date().toISOString().split('T')[0]}
                monthFormat={'MMMM yyyy'}
                hideExtraDays={true}
                firstDay={1}
                enableSwipeMonths={true}
                showScrollIndicator={true}
                hideDayNames={false}
                showWeekNumbers={false}
                disableMonthChange={false}
                hideArrows={false}
                onMonthChange={(month: any) => {
                  setCalendarDate(month.dateString);
                }}
                theme={{
                  backgroundColor: '#ffffff',
                  calendarBackground: '#ffffff',
                  textSectionTitleColor: '#b6c1cd',
                  selectedDayBackgroundColor: '#41ACBB',
                  selectedDayTextColor: '#ffffff',
                  todayTextColor: '#41ACBB',
                  dayTextColor: '#2d4150',
                  textDisabledColor: '#d9e1e8',
                  dotColor: '#00adf5',
                  selectedDotColor: '#ffffff',
                  arrowColor: '#41ACBB',
                  disabledArrowColor: '#d9e1e8',
                  monthTextColor: '#19484F',
                  indicatorColor: '#41ACBB',
                  textDayFontFamily: 'System',
                  textMonthFontFamily: 'System',
                  textDayHeaderFontFamily: 'System',
                  textDayFontWeight: '300',
                  textMonthFontWeight: 'bold',
                  textDayHeaderFontWeight: '300',
                  textDayFontSize: 16,
                  textMonthFontSize: 16,
                  textDayHeaderFontSize: 13
                }}
              />
              
              <TouchableOpacity
                onPress={() => setShowCalendar(false)}
                style={{
                  backgroundColor: '#19484F',
                  padding: 15,
                  borderRadius: 5,
                  alignItems: 'center',
                  marginTop: 20,
                }}
              >
                <Text style={{
                  color: 'white',
                  fontWeight: 'bold',
                  fontSize: 16,
                }}>
                  Fechar
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
      </ImageBackground>
    </SafeAreaView>
  );
};

export default EditarPerfil;