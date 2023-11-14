import firebase_app from '@/lib/auth/firebaseConfig';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";
import {getAllUsers} from './getAllUsers'
import {signoutfunc} from './signout'
const auth = getAuth(firebase_app);

export const ResetPassword = async (emailAddress) => {
  try {
    const Users = await getAllUsers()
    console.log('Users', Users);
    const IsUserExists = Users.find(user => user.username === emailAddress);
    if (IsUserExists) {
      await sendPasswordResetEmail(auth, emailAddress);
      await signoutfunc();
      return true;
    }
    else {
      return false;
    }
    
  } catch (error) {
    return error.message; // Handle other errors as needed
  }
}
