import React, { useState, useEffect } from 'react';
import { View } from 'react-native';
import RNPickerSelect from 'react-native-picker-select';
import cadastroStyles from '../../pages/styles/CadastroStyles';

const days = Array.from({ length: 31 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }));
const months = Array.from({ length: 12 }, (_, i) => ({ label: `${i + 1}`, value: i + 1 }));
const years = Array.from({ length: 100 }, (_, i) => ({ label: `${2023 - i}`, value: 2023 - i }));

interface DatePickerProps {
  onDateChange: (date: { day?: number; month?: number; year?: number }) => void;
  initialDate?: { day: number; month: number; year: number };
  selectedDay: number;
  selectedMonth: number;
  selectedYear: number;
}

const DatePicker: React.FC<DatePickerProps> = ({ onDateChange, initialDate, selectedDay,  selectedMonth, selectedYear }) => {

  const [day, setDay] = useState<number | null>(initialDate ? selectedDay : null);
  const [month, setMonth] = useState<number | null>(initialDate ? selectedMonth : null);
  const [year, setYear] = useState<number | null>(initialDate ? selectedYear : null);

  useEffect(() => {
    if (day !== null && month !== null && year !== null) {
      onDateChange({ day, month, year });
    }
  }, [day, month, year]);

  const handleDateChange = (value: number | null, type: 'day' | 'month' | 'year') => {
    if (type === 'day') setDay(value);
    if (type === 'month') setMonth(value);
    if (type === 'year') setYear(value);
  };

  return (
    <View style={cadastroStyles.row4}>
      <View style={cadastroStyles.datePickerItem}>
        <RNPickerSelect
          onValueChange={(value) => handleDateChange(value, 'day')}
          items={days}
          placeholder={{ label: 'Dia', value: null }}
          value={selectedDay}
          style={{
            inputIOS: cadastroStyles.inputIOS,
            inputAndroid: cadastroStyles.inputAndroid,
          }}
          useNativeAndroidPickerStyle={false}
        />
      </View>
      <View style={cadastroStyles.datePickerItem}>
        <RNPickerSelect
          onValueChange={(value) => handleDateChange(value, 'month')}
          items={months}
          placeholder={{ label: 'Mês', value: null }}
          value={selectedMonth}
          style={{
            inputIOS: cadastroStyles.inputIOS,
            inputAndroid: cadastroStyles.inputAndroid,
          }}
          useNativeAndroidPickerStyle={false}
        />
      </View>
      <View style={cadastroStyles.datePickerItem}>
        <RNPickerSelect
          onValueChange={(value) => handleDateChange(value, 'year')}
          items={years}
          placeholder={{ label: 'Ano', value: null }}
          value={selectedYear}
          style={{
            inputIOS: cadastroStyles.inputIOS,
            inputAndroid: cadastroStyles.inputAndroid,
          }}
          useNativeAndroidPickerStyle={false}
        />
      </View>
    </View>
  );
};

export default DatePicker;