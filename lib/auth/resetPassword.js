import firebase_app from '@/lib/auth/firebaseConfig';
import { getAuth, sendPasswordResetEmail } from "firebase/auth";

const auth = getAuth(firebase_app);

export const ResetPassword = async (emailAddress) => {
  try {
    const res = await sendPasswordResetEmail(auth, emailAddress);
    console.log('res', res);
    return "Password reset email sent successfully!";
  } catch (error) {
    if (error.code === 'auth/invalid-email') {
      return "Invalid email. Please provide a valid email address.";
    } else {
      return error.message; // Handle other errors as needed
    }
  }
}
