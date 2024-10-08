import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import cadastroStyles from '../../pages/styles/CadastroStyles';


interface GenderPickerProps {

    onGenderChange: (value: string) => void;
  
  }
  
const genders = [
  { label: 'Feminino', value: 'F' },
  { label: 'Masculino', value: 'M' },
  { label: 'Outro', value: 'O' },
];

const GenderPicker: React.FC<GenderPickerProps> = ({ onGenderChange }) => {
  return (
    <View style={cadastroStyles.pickerContainer}>
      <RNPickerSelect
        onValueChange={onGenderChange}
        items={genders}
        placeholder={{ label: 'Selecione o gênero', value: null }}
        
        style={{
          inputIOS: cadastroStyles.inputIOS,
          inputAndroid: cadastroStyles.inputAndroid,
          placeholder: {
            color: '#82997E',
          },
        }}
        useNativeAndroidPickerStyle={false}
      />
    </View>
  );
};

export default GenderPicker;