import axios from 'axios';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

const DAILY_API_URL = 'https://api.daily.co/v1/rooms';
const DAILY_API_KEY = 'a32dbafaf119c8382e402a5497cc19c3e0e8b60a8de658751a319c476420edc2';

const db = getFirestore();

export const createDailyRoom = async (roomId: string) => {
  try {
    const response = await axios.post(
      DAILY_API_URL,
      {
        properties: {
          enable_chat: true,
          enable_screenshare: true,
          enable_knocking: true,          
          max_participants: 10,          
        },
      },
      {
        headers: {
          Authorization: `Bearer ${DAILY_API_KEY}`,
          'Content-Type': 'application/json',
        },
        
      }
    );
    console.log('Sala criada no Daily.co:', response.data);   
    const roomUrl = response.data.url;
    await setDoc(doc(db, 'videoRooms', roomId), { url: roomUrl });
    return roomUrl;
  } catch (error) {
    console.error('Erro ao criar sala no Daily.co:', error);
    throw error;
  }
};

export const updateRoomProperties = async (roomId: string) => {
  try {
    const response = await axios.patch(
      `${DAILY_API_URL}/${roomId}`, 
      {
        properties: {
          max_participants: 10,
        },
      },
      {
        headers: {
          Authorization: `Bearer ${DAILY_API_KEY}`,
          'Content-Type': 'application/json',
        },
      }
    );
    console.log('Sala atualizada:', response.data);
  } catch (error) {
    console.error('Erro ao atualizar a sala:', error);
  }
};