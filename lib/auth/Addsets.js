import firebase_app from '@/lib/auth/firebaseConfig';
import { getFirestore, collection, doc, addDoc, where, query, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export const addSetToRoutine = async (userEmail, routineId, newSetObject) => {
    try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('username', '==', userEmail));
        const querySnapshot = await getDocs(q);

        if (!querySnapshot.empty) {
            const docRef = querySnapshot.docs[0].ref; // Reference to the user document
            const activityRef = collection(docRef, 'activity');
            const routineDocRef = doc(activityRef, routineId);

            // Update 'sets' array in the specific routine document with the new set object
            await updateDoc(routineDocRef, {
                sets: arrayUnion(newSetObject)
            });
            return true;
        } else {
            return 'No attached user found';
        }
    } catch (error) {
        return error;
    }
};
