import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, Dimensions } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { auth, db } from '../config/firebaseConfig';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, where, Timestamp } from 'firebase/firestore';
import { VictoryPie, VictoryLabel } from 'victory-native';
import Svg, { G, Text as SvgText } from 'react-native-svg';
import BottomBar from '../components/navigation/BottomBar';
import PerfilStyles from './styles/PerfilStyles';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

const Perfil = () => {
  const [emotionsData, setEmotionsData] = useState<EmotionData[]>([]);
  const router = useRouter();

  useEffect(() => {
    const fetchEmotionsData = async () => {
      const user = auth.currentUser;
      if (user) {
        const sevenDaysAgo = Timestamp.fromDate(new Date(Date.now() - 7 * 24 * 60 * 60 * 1000));
        const q = query(collection(db, 'emotions'), where('userId', '==', user.uid), where('timestamp', '>=', sevenDaysAgo));
        const querySnapshot = await getDocs(q);
        const data = querySnapshot.docs.map(doc => ({
          emotion: doc.data().emotion,
          timestamp: doc.data().timestamp.toDate()
        })) as EmotionData[];
        setEmotionsData(data);
      }
    };

    fetchEmotionsData();
  }, []);

  const handleSignOut = async () => {
    try {
      await auth.signOut();
      console.log('Usuário deslogado com sucesso!');
      router.push('/pages/Login'); 
    } catch (error) {
      console.error('Erro ao deslogar:', error);
      alert('Erro ao deslogar: ' + (error as Error).message); 
    }
  };

  const handleEditProfile = () => {
    router.push('/pages/EditarPerfil'); 
  };

  return (
    <View style={PerfilStyles.container}>
      
        <Text style={PerfilStyles.title}>Perfil</Text>
        <View style={PerfilStyles.card}>
            <View style={PerfilStyles.cardItem} onTouchEnd={handleEditProfile}>
            <FontAwesome name="edit" size={24} color="black" />
            <Text style={PerfilStyles.cardText}>Editar perfil</Text>
            </View>
            {/* <View style={PerfilStyles.cardItem}>
            <FontAwesome name="bell" size={24} color="black" />
            <Text style={PerfilStyles.cardText}>Notificações</Text>
            <Switch style={PerfilStyles.switch} />
            </View> */}
            <View style={PerfilStyles.cardItem} onTouchEnd={handleSignOut}>
            <FontAwesome name="sign-out" size={24} color="black" />
            <Text style={PerfilStyles.cardText}>Sair</Text>
            </View>
            
      </View>
      <ChartCard emotionsData={emotionsData} />
      <BottomBar />
    </View>
  );
};

interface EmotionData {
  emotion: string;
  timestamp: Date;
}

interface ChartCardProps {
  emotionsData: EmotionData[];
}

const emotions = [
  { name: 'Alegria', icon: 'emoticon-excited-outline', color: '#60A355' },
  { name: 'Calma', icon: 'emoticon-happy-outline', color: '#9EC7DD' },
  { name: 'Amor', icon: 'emoticon-kiss-outline', color: '#D081CC' },
  { name: 'Cansaço', icon: 'emoticon-neutral-outline', color: '#B0ADAD' },    
  { name: 'Medo', icon: 'emoticon-frown-outline', color: '#716F6F' },
  { name: 'Tristeza', icon: 'emoticon-sad-outline', color: '#849EAC' },
  { name: 'Aflição', icon: 'emoticon-cry-outline', color: '#644040' },
  { name: 'Raiva', icon: 'emoticon-angry-outline', color: '#AA1717' },
];

const CustomLabel = (props: any) => {
  const { x, y, datum } = props;
  const emotion = emotions.find(e => e.name === datum.x);
  return (
    <G>
      <MaterialCommunityIcons
        name={emotion?.icon || 'emoticon-neutral-outline'}
        size={24}
        color="black"
        style={{ position: 'absolute', left: x - 12, top: y - 15 }}
      />
      <SvgText
        x={x + 2}
        y={y + 20}
        fill="black"
        fontSize="12"
        fontWeight="bold"
        textAnchor="middle"
        
      >
        {`${datum.y.toFixed(1)}%`}
      </SvgText>
    </G>
  );
};

const ChartCard: React.FC<ChartCardProps> = ({ emotionsData }) => {
  const totalEmotions = emotionsData.length;
  const emotionCounts = emotionsData.reduce((acc: { [key: string]: number }, emotion) => {
    acc[emotion.emotion] = (acc[emotion.emotion] || 0) + 1;
    return acc;
  }, {});

  const chartData = emotions.map(e => ({
    x: e.name,
    y: totalEmotions ? (emotionCounts[e.name] || 0) / totalEmotions * 100 : 0,
    color: e.color,
    icon: e.icon,
  }));

  return (
    <View style={PerfilStyles.chartCard}>
      <Text style={PerfilStyles.chartTitle}>Ranking das emoções</Text>
      <Text style={PerfilStyles.chartSubtitle}>(últimos 7 dias)</Text>
      <Svg width={Dimensions.get('window').width} height={Dimensions.get('window').width}>
        <VictoryPie
          standalone={false}
          data={chartData}
          colorScale={chartData.map(d => d.color)}
          innerRadius={50}
          padAngle={0} 
          labels={({ datum }) => `${datum.y.toFixed(1)}%`} 
          labelRadius={({ innerRadius }) => (typeof innerRadius === 'number' ? innerRadius : 0) + 30}
          style={{
            labels: { fill: 'black', fontSize: 12, fontWeight: 'bold' },
          }}
          labelComponent={<CustomLabel />}
        />
      </Svg>
    </View>
  );
};

export default Perfil;