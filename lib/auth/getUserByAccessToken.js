import { getFirestore, collection, getDocs, query, where } from 'firebase/firestore';
import firebase_app from './firebaseConfig';

const db = getFirestore(firebase_app);

export const getUserByAccessToken = async (accessToken) => {
  try {
    const usersCollection = collection(db, 'users');
    const q = query(usersCollection, where('accessToken', '==', accessToken));
    const querySnapshot = await getDocs(q);
    if (querySnapshot.empty) {
      console.log('No matching documents.');
        return false;
    }

    let user;
    querySnapshot.forEach((doc) => {
      user = doc.data();
    });

    return user;
  } catch (error) {
    console.error('Error getting user by access token:', error);
    return null; // Handle the error as per your needs
  }
};
