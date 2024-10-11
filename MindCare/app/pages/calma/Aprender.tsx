import Aprendendo from "@/app/components/navigation/Aprendendo";
import BottomBar from "@/app/components/navigation/BottomBar";
import React from "react";
import { Text, View } from "react-native";
import aprenderStyles from "./css/AprenderStyles";



const Aprender = () => {
  return (
    <View style={[aprenderStyles.container, { backgroundColor: '#41ACBB' }]}>
      <Text style={aprenderStyles.greeting}>Que tal aprender um pouco sobre saúde mental?</Text>      
      <Aprendendo />
      <BottomBar />
    </View>
  );
};

export default Aprender;