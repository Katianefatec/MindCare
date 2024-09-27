import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyCX9ZCHJBYSWlxGfEIEyQXC293qNjx9JTA",
    authDomain: "mindcare-8c601.firebaseapp.com",  
    projectId: "mindcare-8c601",  
    storageBucket: "mindcare-8c601.appspot.com",  
    messagingSenderId: "1005749820530",  
    appId: "1:1005749820530:web:689f86d4b0150ae9a776eb",  
    measurementId: "G-ZDKC31CCEH"  
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };