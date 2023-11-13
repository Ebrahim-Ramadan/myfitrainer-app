import firebase_app from '@/lib/auth/firebaseConfig';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export const getAllUsers = async () => {
    try {
      const usersCollection = collection(db, 'users');
      const querySnapshot = await getDocs(usersCollection);
      let Users=[];
      querySnapshot.forEach((doc) => {
        Users.push(doc.data());
      });
      
      return Users;
    } catch (error) {
      console.error('Error getting all users:', error);
      return [];
    }
  };
  