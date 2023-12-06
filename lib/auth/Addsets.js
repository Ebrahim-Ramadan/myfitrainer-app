import firebase_app from '@/lib/auth/firebaseConfig';
import { getFirestore, collection, doc, addDoc, where, query, getDoc, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';

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


export const updateRoutineFinished = async (userEmail, activityId, state) => {
    try {
      const userRef = collection(db, 'users');
      const userQuerySnapshot = await getDocs(query(userRef, where('username', '==', userEmail)));
  
      if (!userQuerySnapshot.empty) {
        const userId = userQuerySnapshot.docs[0].id;
        const activityRef = doc(db, `users/${userId}/activity/${activityId}`);
        
        const activityDocSnapshot = await getDoc(activityRef);
  
        if (activityDocSnapshot.exists()) {
          const setsRef = collection(activityRef, 'sets');
          const setsSnapshot = await getDocs(setsRef);
  
          let allSetsFinished = true;
  
          setsSnapshot.forEach((setDoc) => {
            const setData = setDoc.data();
            if (!setData.finished) {
                allSetsFinished = false;
                
            }
          });
            
            if (state == true) {
                if (allSetsFinished) {
                    // Update activity's finished status based on sets' finished property
                    await updateDoc(activityRef, {
                        finished: true,
                      });
              
                        console.log('Activity finished status updated successfully.');
                        return true
                }
                else {
                    console.log('routine sets not finished');
                    return false;
                }
            }
            else if(state == false) {
                await updateDoc(activityRef, {
                    finished: false,
                });
                console.log('Activity gone back.');
                return true
            }

        } else {
            console.error('Activity document not found.');
            return false
        }
      } else {
          console.error('User not found.');
          return false
      }
    } catch (error) {
      console.error('Error updating activity finished status:', error);
    }
  };