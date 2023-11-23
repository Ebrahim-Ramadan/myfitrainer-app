import Image from 'next/image';
import React from 'react'
import bg from '@/assets/landpage-bg.avif'
const Entry = () => {

  
  
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
          <p className="mx-auto max-w-[700px] text-slate-200 md:text-xl">Get Fit, Stay Healthy, Be Happy</p>
          
            </div>
            <div className=" text-lg font-bold text-center text-slate-950">
              <a className='bg-gray-50 rounded-lg p-2 hover:bg-zinc-300 transition-all duration-900' href='routines'>Start Training</a>
            </div>
          </div >
  )
}

export default Entry