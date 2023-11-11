import firebase_app from '@/lib/auth/firebaseConfig';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export const handleCreateUser = async (username, uid, activity) => {
    
    const credentials ={
        username,
        uid,
        activity,
      }
    try {
        const usersCollection = collection(db, 'users');
        await addDoc(usersCollection, credentials);
      console.log('User created successfully');
      return true;
    } catch (error) {
      console.error('Error creating user:', error);
    }
  };