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
        secureLocalStorage.setItem("username", userCredential.user.email);
        secureLocalStorage.setItem("loggedIn", true);
        Notify.success('logged in successfully', {
          position: 'center-top',
        });
        setTimeout(() => {
          window.location.reload()
        }, 100);
        router.push('/')
      }
    } catch (error) {
      console.log('signupUsererr', error.code, error.message);
      Notify.failure(error.message, {
        position: 'center-top',
      });
    }
    setIsLoading(false);
  };

  return (
    <div className='min-h-screen bg-black'>
     
      
      <div className="min-h-screen  flex justify-center flex-col items-center  gap-y-2">
      <h1 className='text-4xl font-bold'>Login</h1>
        <form onSubmit={(e) => loginUser(Username, Password, e)} className="md:p-0 p-4 max-w-[500px] flex flex-col gap-y-4 w-full">
         
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
        
<p className='text-gray-300 hover:text-gray-400 w-fit md:text-base text-xs'>By logging in, you agree to our <a href='/privacy-and-policy' className='underline'>privacy and policy</a></p>
          <button role='submit' className='mt-[-8px] text-lg font-bold rounded-lg p-2 text-zinc-900 border border-2 bg-slate-200 hover:bg-zinc-300 duration-900' disabled={isLoading}>
            {isLoading ?
            'processing...':'Login'}
            </button>
      </form>
         <a className="flex justify-end cursor-pointer ">
        <BasicModalDialog/>
        </a> 
        <div className="flex flex-col text-md font-bold justify-center items-center mt-2 space-y-1 mb-4">
    <div className="text-xl ">Don&#8217;t have an account yet?</div>
    <Link href="/signup" className="rounded-lg px-2 py-1 text-zinc-900 border border-2 bg-slate-200 hover:bg-zinc-300 duration-900">
      Sign up
    </Link>
      </div>
      </div>

    </div>

  );
};

export default Login;
