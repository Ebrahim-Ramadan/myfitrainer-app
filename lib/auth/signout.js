
import firebase_app from '@/lib/auth/firebaseConfig';
import { getAuth, signOut } from "firebase/auth";

const auth = getAuth(firebase_app);

export const signoutfunc = async()=> {
  try {
    await signOut(auth);
    return 'Signout successful';
  } catch (error) {
    return 'Error: ' + error.message;
  }
  }