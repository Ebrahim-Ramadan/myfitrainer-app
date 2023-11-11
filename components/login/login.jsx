'use client'
import React from 'react';
import firebase_app from '@/lib/auth/firebaseConfig.js';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useRouter } from "next/navigation";
import useTokenStore from '@/ZustandStore';

const auth = getAuth();
const Login = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [Username, setUsername] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const router = useRouter()

  const loginUser = async (email, password, e) => {
    e.preventDefault();
    setIsLoading(true);
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        console.log('userCredential.user', userCredential.user);
        useTokenStore.setState({ accessToken: userCredential.user.accessToken });
        Notify.success('logged in successfully');
        
        router.push('/')

      }
    } catch (error) {
      console.log('signupUsererr', error.code, error.message);
      Notify.failure(' error.message');
    }
    setIsLoading(false);
  };

  return (
    <>
      <div className="flex justify-center flex-col items-center mt-16 md:mt-28 gap-y-4">
      <h1 className='text-4xl font-bold'>Login</h1>
        <form onSubmit={(e) => loginUser(Username, Password, e)} className="md:p-0 p-4 max-w-[500px] flex flex-col gap-y-9 w-full">
         
        <div className="w-full flex flex-col gap-y-2">
          <label htmlFor="username" className="text-xl font-medium">
            E-mail
          </label>
          <input
            id="username"
            name="username"
            type="email"
            required
            placeholder="Enter your E-mail"
            onChange={(e) => setUsername(e.target.value)}
            className="rounded-lg h-10 font-bold text-black text-md p-2"
          />
        </div>

        <div className="w-full flex flex-col gap-y-2">
          <label htmlFor="password" className="text-xl font-medium">
            Password
          </label>
          <div className="flex flex-col gap-y-4">
            <input
              id="password"
              name="password"
              type="password"
              required
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="rounded-lg h-10 font-bold text-black text-md p-2"
            />
            
          </div>
        </div>
        <Link href="/users/resetPassword" className="flex justify-end cursor-pointer hover:opacity-70 underline">
              forget password?
            </Link>

            <button role='submit' className='bg-gray-700 rounded-lg p-2 hover:bg-gray-400 transition-all duration-800'>Login</button>
      </form>
      
    </div>
    <div className="flex flex-col text-md justify-center items-center">
    <div className="text-xl">Don&#8217;t have an account yet?</div>
    <Link href="/signup" className="font-medium cursor-pointer">
      Sign up
    </Link>
      </div>
    </>

  );
};

export default Login;
