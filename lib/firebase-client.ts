import { initializeApp, getApps } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: 'AIzaSyDVMGR0YisDCJnrHUVymZ6Zg4BLE_iX99U',
  authDomain: 'evlife-ae9a5.firebaseapp.com',
  projectId: 'evlife-ae9a5',
  storageBucket: 'evlife-ae9a5.firebasestorage.app',
  messagingSenderId: '518287448052',
  appId: '1:518287448052:web:0e6b5395433d4a7e5c4ba1',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
export const db = getFirestore(app);
export const auth = getAuth(app);
