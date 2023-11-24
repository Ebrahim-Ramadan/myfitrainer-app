import firebase_app from '@/lib/auth/firebaseConfig';
import { getFirestore, collection, addDoc, where, query, getDocs } from 'firebase/firestore';

const db = getFirestore(firebase_app);

export const fetchActivityDocuments = async(userEmail)=> {
    try {
        const usersRef = db.collection('users');
        const userQuery = await usersRef.where('username', '==', userEmail).get();
    
        if (!userQuery.empty) {
          userQuery.forEach(async (userDoc) => {
            const userId = userDoc.id;
            const activityRef = db.collection(`users/${userId}/activity`);
            
            const activityQuerySnapshot = await activityRef.get();
            
            if (!activityQuerySnapshot.empty) {
              const activityDocuments = [];
              activityQuerySnapshot.forEach((doc) => {
                activityDocuments.push({
                  id: doc.id,
                  data: doc.data()
                });
              });
              
              console.log(`Activity documents for user ${userEmail}:`);
                console.log(activityDocuments);
                return activityDocuments
            } else {
              return `No activity documents found for user ${userEmail}`
            }
          });
        } else {
          return `User ${userEmail} not found.`
        }
      } catch (error) {
        return error
      }
  }