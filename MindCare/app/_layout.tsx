import { Stack } from 'expo-router';

const Layout = () => {  
  return (
    <Stack>
      <Stack.Screen name="pages/HomePage" options={{ title: 'Home' }} />
      <Stack.Screen name="pages/HomePage2" options={{ title: 'Momento' }} />
      <Stack.Screen name="pages/CalmaPage" options={{ title: 'Calma' }} />
      <Stack.Screen name="pages/AvaliacaoPage" options={{ title: 'Avaliação' }} />
      <Stack.Screen name="pages/ApoioPage" options={{ title: 'Apoio' }} />
      <Stack.Screen name="ReflexaoLayout" options={{ title: 'Reflexões' }} />
    </Stack>
  );
};

export default Layout;