import React from 'react'
const Entry = () => {

  
  
    return (
      <div className='[&>*]:text-center space-y-4'>

        <svg
           className="absolute left-0 top-0 w-full h-full -z-10 object-cover"viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="b" cx="50%" cy="50%" r="50%" fx="20%" fy="36%"><stop offset="0%" stopColor="#444cf7" /><stop offset="100%" stopColor="rgba(194,68,247,0.2)" /></radialGradient><filter id="a" x="-500" y="-500" width="2000" height="2000" filterUnits="userSpaceOnUse"><feGaussianBlur in="SourceGraphic" stdDeviation="100" /></filter></defs><rect width="100%" height="100%" /><g filter="url(#a)">

          <svg width="1000" height="1000" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" transform="translate(-217.252 25.924)"><path fill="url(#b)" d="M422 350.5q-56 100.5-174.5 105T104 355q-25-105 5.5-200t134-83.5q103.5 11.5 169 95t9.5 184Z" /></svg></g>
        </svg>
        
    <div className="space-y-2">
              <h1 className="text-3xl font-bold tracking-tighter text-white sm:text-4xl md:text-5xl lg:text-6xl/none">
                Fitness & Gym Trainer
              </h1>
          <p className="mx-auto max-w-[700px] text-slate-200 md:text-xl">Get Fit, Stay Healthy, Be Happy</p>
          
            </div>
        <div className="flex gap-x-2 md:gap-x-4 justify-center md:text-base text-sm font-bold text-center text-slate-950">
          
              <a className='block py-2 px-4 text-white font-medium bg-indigo-600 duration-150 hover:bg-indigo-500 active:bg-indigo-700 rounded-lg shadow-lg hover:shadow-none' href='/routines'>Start Training</a>
              <a className='block py-2 px-4 text-gray-50 hover:text-gray-400 font-medium duration-150 active:bg-gray-100 border rounded-lg' href='/progress'>Watch Progress</a>
        </div>

        <div className='flex justify-center flex-row'>
        <a href="/documentation" className='inline-flex gap-x-4 items-center rounded-full p-1 pr-2 md:pr-6 border text-sm font-medium duration-150 hover:bg-[#8574EC]'>
                                <span className='inline-block rounded-full px-3 py-1 bg-indigo-600 text-white'>
                                    News
                                </span>
                                <p className='flex items-center text-gray-50'>
                                   Read Our Documentation
                                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                                        <path fillRule="evenodd" d="M7.21 14.77a.75.75 0 01.02-1.06L11.168 10 7.23 6.29a.75.75 0 111.04-1.08l4.5 4.25a.75.75 0 010 1.08l-4.5 4.25a.75.75 0 01-1.06-.02z" clipRule="evenodd" />
                                    </svg>
                                </p>
                            </a>
       </div>
          </div >
  )
}

export default Entry