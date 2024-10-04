import React from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import cadastroStyles from '../../pages/styles/CadastroStyles';

const days = Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }));
const months = Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }));
const years = Array.from({ length: 100 }, (_, i) => ({ label: `${2023 - i}`, value: 2023 - i }));

interface DatePickerProps {
  onDateChange: (date: { day?: number; month?: number; year?: number }) => void;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange }) => {
  const handleDateChange = (value: number | null, type: 'day' | 'month' | 'year') => {
    onDateChange({ [type]: value });
  };

  return (
    <View style={cadastroStyles.row4}>
      <View style={cadastroStyles.datePickerItem}>
        <RNPickerSelect
          onValueChange={(value) => handleDateChange(value, 'day')}
          items={days}
          placeholder={{ label: 'Dia', value: null }}
          style={{
            inputIOS: cadastroStyles.pickerSelect,
            inputAndroid: cadastroStyles.pickerSelect,
          }}
          useNativeAndroidPickerStyle={false}
        />
      </View>
      <View style={cadastroStyles.datePickerItem}>
        <RNPickerSelect
          onValueChange={(value) => handleDateChange(value, 'month')}
          items={months}
          placeholder={{ label: 'Mês', value: null }}
          style={{
            inputIOS: cadastroStyles.pickerSelect,
            inputAndroid: cadastroStyles.pickerSelect,
          }}
          useNativeAndroidPickerStyle={false}
        />
      </View>
      <View style={cadastroStyles.datePickerItem}>
        <RNPickerSelect
          onValueChange={(value) => handleDateChange(value, 'year')}
          items={years}
          placeholder={{ label: 'Ano', value: null }}
          style={cadastroStyles.pickerSelect}
          useNativeAndroidPickerStyle={false}
        />
      </View>
    </View>
  );
};

export default DatePicker;