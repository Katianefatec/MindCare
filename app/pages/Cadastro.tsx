import { Picker } from '@react-native-picker/picker';
import { useRouter } from 'expo-router';
import { FirebaseError } from 'firebase/app';
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { doc, setDoc } from 'firebase/firestore';
import React, { useEffect, useState } from "react";
import {
  ImageBackground,
  Modal,
  SafeAreaView,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View
} from "react-native";
import { Calendar } from 'react-native-calendars';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
import { auth, db } from '../../config/firebaseConfig';
import cadastroStyles from '../pages/styles/CadastroStyles';

const Cadastro = () => {
   // Log para debug
  
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [birthDate, setBirthDate] = useState(''); // Simplificar para string
  const [day, setDay] = useState('');
  const [month, setMonth] = useState('');
  const [year, setYear] = useState('');
  const [gender, setGender] = useState('');
  const [errorMessage, setErrorMessage] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showCalendar, setShowCalendar] = useState(false);
  const [calendarDate, setCalendarDate] = useState(new Date().toISOString().split('T')[0]);
  const [selectedYear, setSelectedYear] = useState(new Date().getFullYear());
  const router = useRouter();

  // Adicionar para capturar erros na renderização
  useEffect(() => {
    console.log('Componente Cadastro montado');
    return () => console.log('Componente Cadastro desmontado');
  }, []);

  // Função para atualizar a data completa quando os campos mudam
  useEffect(() => {
    if (day && month && year) {
      const formattedDate = `${day.padStart(2, '0')}/${month.padStart(2, '0')}/${year}`;
      setBirthDate(formattedDate);
    }
  }, [day, month, year]);

  // Sincronizar selectedYear com o calendário
  useEffect(() => {
    if (showCalendar) {
      const currentCalendarYear = new Date(calendarDate).getFullYear();
      setSelectedYear(currentCalendarYear);
    }
  }, [showCalendar, calendarDate]);

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

  // Função para gerar lista de anos (de 1930 até o ano atual)
  const generateYearOptions = () => {
    const currentYear = new Date().getFullYear();
    const years = [];
    for (let year = currentYear; year >= 1930; year--) {
      years.push(year);
    }
    return years;
  };

  // Função para validar campos antes do cadastro
  const validateFields = () => {
    if (!name.trim()) {
      setErrorMessage('Por favor, preencha seu nome completo.');
      return false;
    }
    
    if (!email.trim()) {
      setErrorMessage('Por favor, preencha seu e-mail.');
      return false;
    }
    
    if (!password.trim()) {
      setErrorMessage('Por favor, preencha sua senha.');
      return false;
    }
    
    if (password.length < 6) {
      setErrorMessage('A senha deve ter pelo menos 6 caracteres.');
      return false;
    }
    
    if (!day || !month || !year) {
      setErrorMessage('Por favor, preencha sua data de nascimento completa.');
      return false;
    }
    
    // Validar se a data é válida
    const dayNum = parseInt(day);
    const monthNum = parseInt(month);
    const yearNum = parseInt(year);
    
    if (dayNum < 1 || dayNum > 31) {
      setErrorMessage('Dia inválido. Digite um valor entre 1 e 31.');
      return false;
    }
    
    if (monthNum < 1 || monthNum > 12) {
      setErrorMessage('Mês inválido. Digite um valor entre 1 e 12.');
      return false;
    }
    
    if (yearNum < 1930 || yearNum > new Date().getFullYear()) {
      setErrorMessage('Ano inválido. Digite um ano entre 1930 e o ano atual.');
      return false;
    }
    
    // Validar se a data existe (ex: 31 de fevereiro)
    const testDate = new Date(yearNum, monthNum - 1, dayNum);
    if (testDate.getDate() !== dayNum || testDate.getMonth() !== monthNum - 1) {
      setErrorMessage('Data inválida. Verifique o dia e mês informados.');
      return false;
    }
    
    if (!gender) {
      setErrorMessage('Por favor, selecione seu gênero.');
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
      case 'auth/email-already-in-use':
        return 'Este e-mail já está cadastrado. Tente fazer login ou use outro e-mail.';
      case 'auth/invalid-email':
        return 'E-mail inválido. Verifique o formato do seu e-mail.';
      case 'auth/weak-password':
        return 'Senha muito fraca. Use pelo menos 6 caracteres com letras e números.';
      case 'auth/operation-not-allowed':
        return 'Cadastro não permitido no momento. Tente novamente mais tarde.';
      case 'auth/network-request-failed':
        return 'Erro de conexão. Verifique sua internet e tente novamente.';
      case 'auth/too-many-requests':
        return 'Muitas tentativas. Aguarde alguns minutos antes de tentar novamente.';
      case 'auth/user-disabled':
        return 'Esta conta foi desativada. Entre em contato com o suporte.';
      case 'auth/invalid-credential':
        return 'Credenciais inválidas. Verifique seus dados e tente novamente.';
      default:
        return 'Erro inesperado no cadastro. Tente novamente ou entre em contato com o suporte.';
    }
  };
  

  const handleSignUp = async () => {
    // Limpar mensagem de erro anterior
    setErrorMessage('');
    
    // Validar campos antes de enviar
    if (!validateFields()) {
      return;
    }
    
    setIsLoading(true);
    
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      console.log('Usuário criado no Firebase Auth');
      
      const user = userCredential.user;
      await setDoc(doc(db, "users", user.uid), {
        name: name.trim(),
        email: email.trim().toLowerCase(),
        birthDate,
        gender,
        userId: user.uid,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString(),
      });    
      
      console.log('Documento criado no Firestore');
      router.push('/pages/Login');
    } catch (error) {
      console.error('Erro ao cadastrar usuário:', error);
      const firebaseError = error as FirebaseError;
      
      // Usar nossa função de tradução de erros
      const errorMessage = getFirebaseErrorMessage(firebaseError.code);
      setErrorMessage(errorMessage);
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
              fontSize: 32,
              fontWeight: 'bold',
              color: '#FFF',
              textShadowColor: 'rgba(0, 0, 0, 0.3)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 3,
              letterSpacing: 2
            }}>
              Criar Conta
            </Text>
            <Text style={{
              fontSize: 16,
              color: '#FFF',
              marginTop: 8,
              textAlign: 'center',
              opacity: 0.9,
              textShadowColor: 'rgba(0, 0, 0, 0.2)',
              textShadowOffset: { width: 1, height: 1 },
              textShadowRadius: 2
            }}>
              Junte-se ao MindCare e cuide do seu bem-estar
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
              onPress={handleSignUp}
              disabled={isLoading}
            >
              <Text style={cadastroStyles.text5}>
                {isLoading ? "CADASTRANDO..." : "CADASTRAR"}
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
              
              {/* Seletor de Ano */}
              <View style={{
                marginBottom: 15,
                paddingHorizontal: 10,
              }}>
                <Text style={{
                  fontSize: 14,
                  fontWeight: 'bold',
                  color: '#19484F',
                  marginBottom: 8,
                  textAlign: 'center',
                }}>
                  Navegar para o ano:
                </Text>
                <View style={{
                  backgroundColor: '#f0f0f0',
                  borderRadius: 8,
                  borderWidth: 1,
                  borderColor: '#ddd',
                }}>
                  <Picker
                    selectedValue={selectedYear}
                    onValueChange={(itemValue) => {
                      setSelectedYear(itemValue);
                      navigateToYear(itemValue);
                    }}
                    style={{
                      height: 50,
                      color: '#19484F',
                    }}
                    itemStyle={{
                      fontSize: 16,
                      color: '#19484F',
                    }}
                  >
                    {generateYearOptions().map((year) => (
                      <Picker.Item
                        key={year}
                        label={year.toString()}
                        value={year}
                      />
                    ))}
                  </Picker>
                </View>
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
}

export default Cadastro;