'use client'
import React from 'react'
import Typed from 'typed.js'
import AOS from 'aos';
import 'aos/dist/aos.css';
const Entry = () => {
  const el = React.useRef(null);

  React.useEffect(() => {
    const typed = new Typed(el.current, {
      strings: ['Get Fit','Stay Healthy', 'Feel Something'],
      typeSpeed: 40,
      fadeOut:true, 
      loop:true,
      showCursor:true
      
    });

    return () => {
      typed.destroy();
    };
  }, []);
  AOS.init({
    duration:1500
  });
    return (
      <div className='[&>*]:text-center space-y-4'>

        <svg
           className="absolute left-0 top-0 w-full h-full -z-10 object-cover"viewBox="0 0 1000 1000" xmlns="http://www.w3.org/2000/svg"><defs><radialGradient id="b" cx="50%" cy="50%" r="50%" fx="20%" fy="36%"><stop offset="0%" stopColor="#444cf7" /><stop offset="100%" stopColor="rgba(194,68,247,0.2)" /></radialGradient><filter id="a" x="-500" y="-500" width="2000" height="2000" filterUnits="userSpaceOnUse"><feGaussianBlur in="SourceGraphic" stdDeviation="100" /></filter></defs><rect width="100%" height="100%" /><g filter="url(#a)">

          <svg width="1000" height="1000" viewBox="0 0 500 500" xmlns="http://www.w3.org/2000/svg" transform="translate(-217.252 25.924)"><path fill="url(#b)" d="M422 350.5q-56 100.5-174.5 105T104 355q-25-105 5.5-200t134-83.5q103.5 11.5 169 95t9.5 184Z" /></svg></g>
        </svg>
        
    <div className="space-y-2" data-aos="zoom-out">
              <h1 className="text-transparent bg-clip-text bg-gradient-to-r from-[#4F46E5] to-[#E114E5] text-3xl font-bold tracking-tighter md:text-white sm:text-4xl md:text-5xl lg:text-6xl/none" id="auto-type">
              Fitness & Gym Trainer
              </h1>
          <span className="mx-auto max-w-[700px] text-slate-200 md:text-xl font-bold" ref={el} >&#160;</span>
          
            </div>
            <div className=" text-lg font-bold text-center text-slate-950" data-aos="zoom-out">
              <a className='bg-gray-50 rounded-lg p-2 hover:bg-zinc-300 transition-all duration-900' href='routines'>Start Training</a>
            </div>
          </div >
  )
}

export default Entry