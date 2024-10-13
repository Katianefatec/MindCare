import React from "react";
import BottomBar from "@/app/components/navigation/BottomBar";
import Musica from "@/app/components/navigation/Musica";
import { View, Text } from "react-native";
import meditarStyles from "./css/MeditarStyles";



const Meditar = () => {
  return (
    <View style={[meditarStyles.container, { backgroundColor: '#41ACBB' }]}>
      <Text style={meditarStyles.greeting}>Musicas para a alma</Text>      
      <Musica />
      <BottomBar />
    </View>
  );
};

export default Meditar;