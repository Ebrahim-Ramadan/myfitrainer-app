
import firebase_app from '@/lib/auth/firebaseConfig';
import { getAuth, EmailAuthProvider, reauthenticateWithCredential } from 'firebase/auth';

const auth = getAuth(firebase_app);

export const DeleteAccount = async(Password)=> {
  try {
    // reauthenticating user first because Some security-sensitive actions—such as deleting an account, setting a primary email address, and changing a password—require that the user has recently signed in. If you perform one of these actions, and the user signed in too long ago, the action fails with an error. When this happens, re-authenticate the user by getting new sign-in credentials from the user and passing the credentials to reauthenticateWithCredential _firebasetips with sharmojj

var credentials = EmailAuthProvider.credential(
  auth.currentUser.email,
  Password
    );
    console.log('credentials', credentials);
    const res = await reauthenticateWithCredential(auth.currentUser, credentials);
    console.log('DeleteAccount res', res);
    if (res) {
      //performing delete operation
      return 'reauthicated';      
    }
  } catch (error) {
    return 'Error: ' + error.message;
  }
  }