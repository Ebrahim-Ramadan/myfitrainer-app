import firebase_app from '@/lib/auth/firebaseConfig';
import { getFirestore, collection, addDoc, where, query, getDocs } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export const handlerCreateRoutine = async (userEmail, newActivityDoc) => {
    try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', userEmail));
      const querySnapshot = await getDocs(q);
  
      if (!querySnapshot.empty) {
        const doc = querySnapshot.docs[0]; // Get the first document (assuming only one result)
        const userId = doc.id; // Get the user ID (UID)
        const activityData = { ...newActivityDoc, sets: [] };
        // Create 'activity' subcollection for the user
        const activityRef = collection(db, 'users', userId, 'activity');
  
        await addDoc(activityRef, activityData);
        return true;
      } else {
        return 'No attached user found';
      }
    } catch (error) {
      return error;
    }
};
