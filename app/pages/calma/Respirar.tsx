import React, { useState, useEffect } from 'react';
import { View, Text } from 'react-native';
import { Audio } from 'expo-av';
import Svg, { Circle } from 'react-native-svg';

import BottomBar from '../../components/navigation/BottomBar';
import respirarStyles from './css/RespirarStyles';

const Respirar = () => {
  const [time, setTime] = useState(0);
  const [breathPhase, setBreathPhase] = useState('Inspira');
  const intervalDuration = 10;
  const totalCycles = 6; 

  useEffect(() => {
    const interval = setInterval(() => {
      setTime(prevTime => {
        const newTime = prevTime + 1;
        if (newTime % intervalDuration === 0) {
          setBreathPhase(prevPhase => prevPhase === 'Inspira' ? 'Expira' : 'Inspira');
          playSound();
        }
        return newTime;
      });
    }, 1000);

    return () => clearInterval(interval);
  }, []);

  const playSound = async () => {
    try {
      const { sound } = await Audio.Sound.createAsync(
        require('../../../assets/beep-07.wav')
      );
      await sound.playAsync();
    } catch (error) {
      console.error('Erro ao reproduzir o som:', error);
    }
  };

  const calculateStrokeDashoffset = () => {
    const progress = (time % (intervalDuration * totalCycles)) / (intervalDuration * totalCycles);
    const circumference = 2 * Math.PI * 45;
    return circumference * (1 - progress);
  };

  return (
    <View style={[respirarStyles.container, { backgroundColor: '#41ACBB' }]}>
      <Text style={respirarStyles.greeting}>Respirar é preciso</Text>
      <View style={respirarStyles.progressContainer}>
        <Svg height="235" width="230" viewBox="0 0 110 118">
          <Circle
            cx="55"
            cy="55"
            r="45"
            stroke="#4A5568"
            strokeWidth="15"
            fill="none"
            opacity="0.3"
          />
          <Circle
            cx="45"
            cy="55"
            r="45"
            stroke="#2D3748"
            strokeWidth="15"
            fill="none"
            strokeDasharray="282.74" 
            strokeDashoffset={calculateStrokeDashoffset()}
            transform="rotate(-90 50 50)" 
          />
        </Svg>
        <View style={respirarStyles.textContainer}>
          <Text style={respirarStyles.phaseText}>{breathPhase}</Text>
        </View>
      </View>
      <BottomBar />
    </View>
  );
};

export default Respirar;