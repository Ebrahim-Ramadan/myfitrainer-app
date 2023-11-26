import firebase_app from '@/lib/auth/firebaseConfig';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export const fetchActivityDocuments = async (userEmail) => {
  try {
    const usersRef = collection(db, 'users');
    const userQuerySnapshot = await getDocs(query(usersRef, where('username', '==', userEmail)));

    if (!userQuerySnapshot.empty) {
      const userDoc = userQuerySnapshot.docs[0]; // Assuming userEmail is unique

      const userId = userDoc.id;
      const activitiesRef = collection(db, `users/${userId}/activity`);
      const activityQuerySnapshot = await getDocs(activitiesRef);

      if (!activityQuerySnapshot.empty) {
        const activityDocuments = activityQuerySnapshot.docs.map((doc) => ({
          id: doc.id,
          data: doc.data(),
        }));

        console.log(`Activity documents for user ${userEmail}:`);
        return activityDocuments;
      } else {
        // Return an empty array if no activity documents found
        return [];
      }
    } else {
      // Return null if the user document is not found
      return null;
    }
  } catch (error) {
    console.error('Error fetching activity documents:', error);
    return error;
  }
};
