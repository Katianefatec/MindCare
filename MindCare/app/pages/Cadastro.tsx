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
// import React, { useState } from "react";
// import { SafeAreaView, View, ScrollView, Image, Text, TextInput, Pressable, Alert } from "react-native";
// import { FontAwesome } from '@expo/vector-icons';
// import { signInWithEmailAndPassword, sendPasswordResetEmail } from 'firebase/auth';
// import loginStyles from './styles/LoginStyles';
// import { auth } from '../config/firebaseConfig';

// interface LoginProps {  
//   navigation?: any;
// }

// const Login = (props: LoginProps) => {
//   const [email, setEmail] = useState("");
//   const [password, setPassword] = useState("");
//   const [errorMessage, setErrorMessage] = useState("");

//   const handleLogin = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then(() => {
//         Alert.alert("Sucesso", "Login realizado com sucesso!");
//       })
//       .catch(error => {
//         if (error.code === 'auth/user-not-found') {
//           setErrorMessage("Usuário não cadastrado.");
//         } else {
//           setErrorMessage(error.message);
//         }
//       });
//   };

//   const handlePasswordReset = () => {
//     sendPasswordResetEmail(auth, email)
//       .then(() => {
//         Alert.alert("Sucesso", "Email de recuperação enviado!");
//       })
//       .catch(error => {
//         setErrorMessage(error.message);
//       });
//   };

//   const navigateToCadastro = () => {
//     // Navegar para a tela de registro
//   };

//   return (
//     <SafeAreaView style={loginStyles.safeAreaView}>
//       <ScrollView style={loginStyles.scrollView}>
//         <View style={loginStyles.container}>
//           <Image source={require('../../assets/images/LogoMindCare.png')} resizeMode={"stretch"} style={loginStyles.mainImage} />
//           <View style={loginStyles.inputContainer}>
//             <FontAwesome name="envelope" size={15} color="#000" style={loginStyles.icon} />
//             <TextInput
//               placeholder="E-mail ou nome de usuário"
//               value={email}
//               onChangeText={setEmail}
//               style={loginStyles.input}
//             />
//           </View>
//           <View style={loginStyles.inputContainer}>
//             <FontAwesome name="lock" size={17} color="#000" style={loginStyles.icon} />
//             <TextInput
//               placeholder="Senha"
//               value={password}
//               onChangeText={setPassword}
//               secureTextEntry
//               style={loginStyles.input}
//             />
//           </View>
//           {errorMessage ? <Text style={loginStyles.errorMessage}>{errorMessage}</Text> : null}
//           <Pressable onPress={handleLogin} style={loginStyles.loginButton}>
//             <Text style={loginStyles.loginButtonText}>ENTRAR</Text>
//           </Pressable>
//           <Text onPress={handlePasswordReset} style={loginStyles.linkText}>Esqueceu sua senha? Clique aqui</Text>
//           <Text onPress={navigateToRegister} style={loginStyles.linkText}>Não possui conta? Clique aqui</Text>
//         </View>
//       </ScrollView>
//     </SafeAreaView>
//   );
// };

// export default Login;