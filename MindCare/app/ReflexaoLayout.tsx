import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { ReflexaoProvider } from './context/ReflexaoContext';
import { ReflexaoViewBase, ReflexaoViewVida, ReflexaoViewAmor, ReflexaoViewFamilia, ReflexaoViewTrabalho } from './pages/reflexoes/ReflexaoViews';
import ReflexaoBase from './pages/reflexoes/ReflexaoBase';
import ReflexaoPage from './pages/reflexoes/ReflexaoPage';
import ReflexaoVida from './pages/reflexoes/ReflexaoVida';
import ReflexaoAmor from './pages/reflexoes/ReflexaoAmor';
import ReflexaoFamilia from './pages/reflexoes/ReflexaoFamilia';
import ReflexaoTrabalho from './pages/reflexoes/ReflexaoTrabalho';

const Stack = createNativeStackNavigator();

const ReflexaoLayout = () => {
  return (
    <ReflexaoProvider>
      <Stack.Navigator>
        <Stack.Screen name="ReflexaoPage" component={ReflexaoPage} />
        <Stack.Screen name="ReflexaoBase" component={ReflexaoBase} />
        <Stack.Screen name="ReflexaoVida" component={ReflexaoVida} />
        <Stack.Screen name="ReflexaoAmor" component={ReflexaoAmor} />
        <Stack.Screen name="ReflexaoFamilia" component={ReflexaoFamilia} />
        <Stack.Screen name="ReflexaoTrabalho" component={ReflexaoTrabalho} />
        <Stack.Screen name="ReflexaoViewBase" component={ReflexaoViewBase} />
        <Stack.Screen name="ReflexaoViewVida" component={ReflexaoViewVida} />
        <Stack.Screen name="ReflexaoViewAmor" component={ReflexaoViewAmor} />
        <Stack.Screen name="ReflexaoViewFamilia" component={ReflexaoViewFamilia} />
        <Stack.Screen name="ReflexaoViewTrabalho" component={ReflexaoViewTrabalho} />
      </Stack.Navigator>
    </ReflexaoProvider>
  );
};

export default ReflexaoLayout;