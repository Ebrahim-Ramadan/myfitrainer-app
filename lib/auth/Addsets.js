import firebase_app from '@/lib/auth/firebaseConfig';
import { getFirestore, collection, doc, addDoc, where, query, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';

const db = getFirestore(firebase_app);
export const updateSetFinishedState = async (userEmail, routineId, setId) => {
  try {
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref; 
          const activityRef = collection(docRef, 'activity');
          const routineDocRef = doc(activityRef, routineId); 

          const setsCollectionRef = collection(routineDocRef, 'sets');
          const setDocRef = doc(setsCollectionRef, setId); 

          // Update 'finished' field to true
          await updateDoc(setDocRef, {
              finished: true,
          });

          console.log('Set finished state updated successfully.');
          return true;
      } else {
          console.log('User not found.');
          return false;
      }
  } catch (error) {
      console.error('Error updating set finished state:', error);
      return error;
  }
};

  
export const addSetToRoutine = async (userEmail, routineId, newSetObject) => {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref; // Reference to the user document
            const activityRef = collection(docRef, 'activity');
            const routineDocRef = doc(activityRef, routineId);

            
            const setsCollectionRef = collection(routineDocRef, 'sets');
            await addDoc(setsCollectionRef, newSetObject);
            
            return true;
        } else {
            return false;
        }
    } catch (error) {
        return error;
    }
};
