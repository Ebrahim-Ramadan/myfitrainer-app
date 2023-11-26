import firebase_app from '@/lib/auth/firebaseConfig';
import { getFirestore, doc, deleteDoc, collection, query, where, getDocs } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export const DeleteRoutine = async (userEmail, RoutineID) => {
    // Constructing a reference to the user document(as usual)
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', userEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Get the first document (assuming only one result)
        const userId = userDoc.id; // Get the user ID (UID)

        // Constructing a reference to the routine document in the 'activity' subcollection
        const routineRef = doc(db, 'users', userId, 'activity', RoutineID);

        // Delete the routine document
        await deleteDoc(routineRef);
        return true;
    } else {
        return false;
    }
};
