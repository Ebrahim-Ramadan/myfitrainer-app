'use client'
import React from 'react'
import firebase_app from '@/lib/auth/firebaseConfig';
import { createUserWithEmailAndPassword, getAuth } from "firebase/auth";
import {handleCreateUser} from '@/lib/auth/addUser'
import Link from 'next/link';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import { useRouter } from "next/navigation";
const auth = getAuth(firebase_app);
const Signup = () => {
  const [isLoading, setIsLoading] = React.useState(false);
  const [Username, setUsername] = React.useState('');
  const [Password, setPassword] = React.useState('');
  const router = useRouter()
   const registerUser = async (email, password, e) => {
     e.preventDefault();
     setIsLoading(true);
        try {
          const userCredential = await createUserWithEmailAndPassword(auth, email, password);
          if (userCredential) {
            console.log(userCredential.user);
            
            const userCreation = await handleCreateUser(userCredential.user.email, userCredential.user.uid, {})
            if (userCreation) {
              Notify.success(`signed in as ${userCredential.user.email} now kindly log in`, {
                position: 'center-top',
              });

            router.push('/login')
            }
            else {
              console.log('something went wrong creating the user');
            }
          }
          
        } catch (error) {
          console.log('signupUsererr', error);
          Notify.failure(error.message, {
            position: 'center-top',
          });
     }
     setIsLoading(false);
   };
  
   
  return (
    <div className='min-h-screen '>
      
      <div className="flex justify-center flex-col items-center gap-y-2 min-h-screen ">
      <h1 className='text-4xl font-bold'>Sign Up</h1>
      <form onSubmit={(e)=>registerUser(Username, Password, e)} className="md:p-0 p-4 max-w-[500px] flex flex-col gap-y-4 w-full">
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

          <button role='submit' className='text-lg font-bold rounded-lg p-2 text-zinc-900 border border-2 bg-slate-200 hover:bg-zinc-300 duration-900' disabled={isLoading}>
            {isLoading ?
            'processing...':'Signup'}
            </button>
      </form>
      <div className="mt-4 flex flex-col font-bold text-md justify-center items-center mt-4 space-y-1 mb-4">
    <div className="text-xl">Already have an account?</div>
    <Link href="/login" className=" rounded-lg px-2 py-1 text-zinc-900 border border-2 bg-slate-200 hover:bg-zinc-300 duration-900">
      Log in
    </Link>
      </div>
    </div>

    </div>
  )
}

export default Signup