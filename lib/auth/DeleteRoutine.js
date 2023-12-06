import firebase_app from '@/lib/auth/firebaseConfig';
import { getFirestore, doc, deleteDoc, collection, query, where, getDocs, getDoc, getDocFromCache } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export const DeleteRoutine = async (userEmail, RoutineID) => {
    // Constructing a reference to the user document
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', userEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Get the first document (assuming only one result)
        const userId = userDoc.id; // Get the user ID (UID)

        // Constructing a reference to the routine document in the 'activity' subcollection
        const routineRef = doc(db, 'users', userId, 'activity', RoutineID);

        // Get the routine document
        const routineDoc = await getDoc(routineRef);
        
        if (routineDoc.exists()) {
            // Delete the routine document
            await deleteDoc(routineRef);

            // Construct a reference to the 'sets' subcollection within the routine document
            const setsRef = collection(routineRef, 'sets');

            // Get all the sets documents from the 'sets' subcollection
            const setsSnapshot = await getDocs(setsRef);

            // Delete each set document in the 'sets' subcollection
            setsSnapshot.forEach(async (setDoc) => {
                await deleteDoc(setDoc.ref);
            });

            return true; // Successfully deleted routine and sets
        } else {
            return false; // Routine document does not exist
        }
    } else {
        return false; // User document not found
    }
};



export const DeleteAllUserRoutines = async (userEmail) => {
    // Constructing a reference to the user document
    const usersRef = collection(db, 'users');
    const q = query(usersRef, where('username', '==', userEmail));
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
        const userDoc = querySnapshot.docs[0]; // Get the first document (assuming only one result)
        const userId = userDoc.id; // Get the user ID (UID)

        const userRef = doc(usersRef, userId);

        // Constructing a reference to the 'activity' subcollection of the user
        const activityRef = collection(userRef, 'activity');

        // Get all the routines in the 'activity' subcollection
        const routinesSnapshot = await getDocs(activityRef);

        // Loop through each routine document
        routinesSnapshot.forEach(async (routineDoc) => {
            // Delete the routine document
            await deleteDoc(routineDoc.ref);

            // Construct a reference to the 'sets' subcollection within the routine document
            const setsRef = collection(routineDoc.ref, 'sets');

            // Get all the sets documents from the 'sets' subcollection
            const setsSnapshot = await getDocs(setsRef);

            // Delete each set document in the 'sets' subcollection
            setsSnapshot.forEach(async (setDoc) => {
                await deleteDoc(setDoc.ref);
            });
        });

        return true; // Successfully deleted all routines and sets
    } else {
        return false; // User document not found
    }
};
