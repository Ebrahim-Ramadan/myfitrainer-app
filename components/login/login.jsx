'use client'
import React from 'react';
import firebase_app from '@/lib/auth/firebaseConfig.js';
import Link from 'next/link';
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useRouter } from "next/navigation";
import secureLocalStorage from "react-secure-storage";
import {BasicModalDialog} from './resetPasswordModal'
const auth = getAuth(firebase_app);
const Login = () => {
  const [Username, setUsername] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const router = useRouter()

  const loginUser = async (email, password, e) => {
    e.preventDefault();
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      if (userCredential) {
        secureLocalStorage.setItem("username", userCredential.user.email);
        secureLocalStorage.setItem("loggedIn", true);
        Notify.success('logged in successfully', {
          position: 'right-bottom',
        });
        setTimeout(() => {
          window.location.reload()
        }, 100);
        router.push('/')
      }
    } catch (error) {
      console.log('signupUsererr', error.code, error.message);
      Notify.failure(' error.message', {
        position: 'right-bottom',
      });
    }
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
        

            <button role='submit' className='font-bold bg-gray-700 rounded-lg p-2 hover:bg-gray-600 transition-all duration-800 text-lg'>Login</button>
      </form>
         <a className="flex justify-end cursor-pointer ">
        <BasicModalDialog/>
            </a> 
      </div>
    <div className="flex flex-col text-md justify-center items-center mt-4 space-y-1">
    <div className="text-xl">Don&#8217;t have an account yet?</div>
    <Link href="/signup" className="font-bold cursor-pointer bg-gray-600 hover:bg-gray-700 p-2 rounded-lg">
      Sign up
    </Link>
      </div>
    </>

  );
};

export default Login;
