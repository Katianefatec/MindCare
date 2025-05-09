import React from "react";
import BottomBar from "../../components/navigation/BottomBar";
import Meditacao from "../../components/navigation/Meditacao";
import { View, Text } from "react-native";
import meditarStyles from "./css/MeditarStyles";



const Meditar = () => {
  return (
    <View style={[meditarStyles.container, { backgroundColor: '#41ACBB' }]}>
      <Text style={meditarStyles.greeting}>Hora de relaxar</Text>      
      <Meditacao />
      <BottomBar />
    </View>
  );
};

export default Meditar;