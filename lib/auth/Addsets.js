import firebase_app from '@/lib/auth/firebaseConfig';
import { getFirestore, collection, doc, addDoc, where, query, getDoc, getDocs, updateDoc, arrayUnion } from 'firebase/firestore';
import imageCompression from 'browser-image-compression';


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

          return true;
      } else {
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
                        return true
                }
                else {
                    return false;
                }
            }
            else if(state == false) {
                await updateDoc(activityRef, {
                    finished: false,
                });
                return true
            }

        } else {
            return false
        }
      } else {
          return false
      }
    } catch (error) {
      console.error('Error updating activity finished status:', error);
    }
};
  
export const addImagesToRoutine = async (userEmail, routineId, imagesArray, dlt) => {
  const base64Images = [];

  // Convert each image to base64
      const usersRef = collection(db, 'users');
      const q = query(usersRef, where('username', '==', userEmail));
      const querySnapshot = await getDocs(q);

      if (!querySnapshot.empty) {
          const docRef = querySnapshot.docs[0].ref; // Reference to the user document
          const activityRef = collection(docRef, 'activity');
          const routineDocRef = doc(activityRef, routineId);
        if (imagesArray!=null) {
          for (const image of imagesArray) {
            const base64String = await fileToBase64(image);
            base64Images.push(base64String);
          }
          // Update the routine document with the images array
          await updateDoc(routineDocRef, {
              images: base64Images
          });
        }
        if (dlt==true) {
          await updateDoc(routineDocRef, {
            images: []
          });
          return true
        }

          return true;
      } else {
          return false;
      }
};
// Function to compress an image file and convert it to base64
function fileToBase64(file) {
  return new Promise(async (resolve, reject) => {
    try {
      const compressedFile = await imageCompression(file, {
        maxSizeMB: 1, 
        maxWidthOrHeight: 700,
        useWebWorker: true,
      });

      const reader = new FileReader();
      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = reject;
      reader.readAsDataURL(compressedFile);
    } catch (error) {
      reject(error);
    }

  });
}