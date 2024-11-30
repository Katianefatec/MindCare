import { FontAwesome } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import { collection, getDocs, query, Timestamp, where } from 'firebase/firestore';
import React, { useEffect, useState } from 'react';
import { Dimensions, ScrollView, Text, View } from 'react-native';
import Svg, { G, Text as SvgText } from 'react-native-svg';
import { VictoryAxis, VictoryBar, VictoryChart, VictoryLabel, VictoryTheme } from 'victory-native';
import { auth, db } from '../../config/firebaseConfig';
import BottomBar from '../components/navigation/BottomBar';
import PerfilStyles from './styles/PerfilStyles';

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
      <ScrollView contentContainerStyle={PerfilStyles.scrollViewContent}>
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
      </ScrollView>
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
  { name: 'Alegria', icon: '😊', color: '#60A355' },
  { name: 'Calma', icon: '😌', color: '#9EC7DD' },
  { name: 'Amor', icon: '😍', color: '#D081CC' },
  { name: 'Cansaço', icon: '😴', color: '#B0ADAD' },    
  { name: 'Medo', icon: '😱', color: '#716F6F' },
  { name: 'Tristeza', icon: '😭', color: '#849EAC' },
  { name: 'Aflição', icon: '😰', color: '#644040' },
  { name: 'Raiva', icon: '😡', color: '#AA1717' },
];

const CustomLabel = (props: any) => {
  const { x, y, datum } = props;
  return (
    <G>
      <SvgText
        x={x}
        y={y - 10}
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
      <Svg width={Dimensions.get('window').width * 0.80} height={Dimensions.get('window').height * 0.46} style={{ marginRight: 10, marginLeft: -10}}>
        <VictoryChart
          theme={VictoryTheme.material}
          domainPadding={{ x: 40 }}
        >
          <VictoryAxis
            tickValues={chartData.map(d => d.x)}  
            tickLabelComponent={<VictoryLabel renderInPortal dy={10} />}
            tickFormat={(t) => {
              const emotion = emotions.find(e => e.name === t);
              return emotion ? emotion.icon : t;
            }}
          />
          <VictoryAxis
            dependentAxis
            tickFormat={(x) => `${x}%`}
            domain={[0, 50]}
          />
          <VictoryBar
            data={chartData}
            x="x"
            y="y"
            labels={({ datum }) => `${datum.y.toFixed(1)}%`}
            style={{
              data: { fill: ({ datum }) => datum.color },
              labels: { fill: 'black', fontSize: 12, fontWeight: 'bold' },
            }}
            labelComponent={<CustomLabel />}
          />
        </VictoryChart>
      </Svg>
    </View>
  );
};

export default Perfil;