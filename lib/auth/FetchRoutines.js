import firebase_app from '@/lib/auth/firebaseConfig';
import {
  getFirestore,
  collection,
  query,
  where,
  getDocs,
  getDoc,
  subcollection,
} from 'firebase/firestore';

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
        const finishedRoutines = [];
        const unfinishedRoutines = [];

        // Iterate through each activity document
        for (const activityDoc of activityQuerySnapshot.docs) {
          const activityData = activityDoc.data();
          const activityId = activityDoc.id;

          // Get reference to the 'sets' subcollection under the activity document
          const setsRef = collection(activityDoc.ref, 'sets');
          const setsQuerySnapshot = await getDocs(setsRef);

          const sets = setsQuerySnapshot.docs.map((setDoc) => ({
            setId: setDoc.id,
            setData: setDoc.data(),
          }));

          // Differentiate routines based on the 'finished' property
          if (activityData.finished === true) {
            finishedRoutines.push({
              id: activityId,
              data: activityData,
              sets: sets,
            });
          } else {
            unfinishedRoutines.push({
              id: activityId,
              data: activityData,
              sets: sets,
            });
          }
        }

        console.log(`Finished routines for user ${userEmail}:`, finishedRoutines);
        console.log(`Unfinished routines for user ${userEmail}:`, unfinishedRoutines);

        return { finishedRoutines, unfinishedRoutines };
      } else {
        // Return empty arrays if no activity documents found
        return { finishedRoutines: [], unfinishedRoutines: [] };
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
