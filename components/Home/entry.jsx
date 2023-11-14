'use client'
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useState, useEffect } from 'react'
import secureLocalStorage from 'react-secure-storage';
import bg from '@/assets/landpage-bg.avif'
const Entry = () => {
  const [loggedin, setloggedin] = useState('false');
  useEffect(() => {
    setloggedin(secureLocalStorage.getItem("loggedIn"))
  console.log('loggedin entry', loggedin);
  }, [loggedin]);
  const router = useRouter()
  
  
    return (
      <div className='[&>*]:text-center space-y-4'>
        <Image
      src={bg}
      alt="background image"
      className="absolute left-0 top-0 w-full h-full -z-10 object-cover"
    />
    <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                Fitness & Gym Trainer
              </h1>
              <p className="mx-auto max-w-[700px] text-gray-400 md:text-xl">Get Fit, Stay Healthy, Be Happy</p>
            </div>
            <div className=" text-lg font-bold text-center">
              <button className='backdrop-blur-md border border-2  backdrop-grayscale rounded-lg p-2 hover:bg-sky-700 transition-all duration-900' onClick={()=>router.push(loggedin?'/progress':'/login')}>Start Training</button>
            </div>
          </div >
  )
}

export default Entry