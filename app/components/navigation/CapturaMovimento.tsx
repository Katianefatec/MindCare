import React, { useState, useEffect } from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { Accelerometer } from 'expo-sensors';
import * as Notifications from 'expo-notifications';

interface HeartRateCameraProps {
  onMeasurementComplete: () => void;
}

const HeartRateCamera: React.FC<HeartRateCameraProps> = ({ onMeasurementComplete }) => {
  const [heartRate, setHeartRate] = useState<number | null>(null);
  const [lastReadings, setLastReadings] = useState<number[]>([]);
  const [isMeasuring, setIsMeasuring] = useState<boolean>(true);

  const peakThreshold = 0.5; // Sensibilidade para detectar movimento significativo
  const measurementDuration = 10000; // Duração da medição (10 segundos)
  const minInterval = 300; // Intervalo mínimo entre picos (ms)
  const stressThreshold = 3; // Quantidade mínima de picos para detectar estresse

  useEffect(() => {
    // Solicitar permissão para enviar notificações
    const requestPermissions = async () => {
      const { status } = await Notifications.requestPermissionsAsync();
      if (status !== 'granted') {
        alert('Você precisa permitir notificações para usar esse recurso.');
      }
    };

    requestPermissions();

    let startTime = Date.now();

    const subscription = Accelerometer.addListener((accelerometerData) => {
      const magnitude = Math.sqrt(
        accelerometerData.x ** 2 +
        accelerometerData.y ** 2 +
        accelerometerData.z ** 2
      );

      const currentTime = Date.now();

      if (magnitude > peakThreshold) {
        const lastTime = lastReadings[lastReadings.length - 1] || 0;
        if (currentTime - lastTime > minInterval) {
          setLastReadings((prev) => [...prev, currentTime]);
        }
      }

      if (currentTime - startTime > measurementDuration) {
        setIsMeasuring(false);
        subscription.remove();
      }
    });

    Accelerometer.setUpdateInterval(50); // Atualiza a cada 50ms

    return () => subscription.remove();
  }, [lastReadings]);

  useEffect(() => {
    if (!isMeasuring && lastReadings.length > 1) {
      const intervals = lastReadings.map((_, i, arr) =>
        i > 0 ? arr[i] - arr[i - 1] : null
      ).filter((val) => val !== null) as number[];

      const validIntervals = intervals.filter(
        (interval) => interval >= minInterval && interval <= 1500 // Filtro para intervalos válidos
      );

      if (validIntervals.length >= stressThreshold) {
        setHeartRate(null); // Indicando que um padrão de estresse foi detectado

        // Enviar notificação
        sendStressNotification();
      } else {
        const averageInterval = validIntervals.reduce((a, b) => a + b, 0) / validIntervals.length;
        const calculatedHeartRate = Math.floor(60000 / averageInterval); // bpm
        setHeartRate(calculatedHeartRate);
      }
    }
  }, [isMeasuring, lastReadings]);

  // Função para enviar notificação de estresse
  const sendStressNotification = async () => {
    console.log("Enviando notificação de estresse...");
    await Notifications.scheduleNotificationAsync({
      content: {
        title: "Padrão de Estresse Detectado!",
        body: "Detectamos movimentos que podem indicar estresse. Tente realizar exercícios de respiração ou meditação.",
      },
      trigger: null, // Notificação será enviada imediatamente
    });
  };
  

  return (
    <View style={styles.container}>
      {isMeasuring ? (
        <Text style={styles.text}>Medindo... Por favor, mantenha o dispositivo estável.</Text>
      ) : (
        <Text style={styles.text}>
          Frequência Cardíaca Estimada: {heartRate ? `${heartRate} bpm` : 'Padrão de estresse detectado!'}
        </Text>
      )}
      {!isMeasuring && (
        <Button title="Concluir Medição" onPress={onMeasurementComplete} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 18,
    marginBottom: 20,
    textAlign: 'center',
  },
});

export default HeartRateCamera;
