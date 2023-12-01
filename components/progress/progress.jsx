'use client'
import React, { useEffect, useState } from 'react';
import { fetchActivityDocuments } from '@/lib/auth/FetchRoutines'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import secureLocalStorage from "react-secure-storage";
import { Notify } from 'notiflix';
import {HighLevel} from './HighLevel'
import { Reload } from '../globals/Reload';
export const Progress = () => {
  const [Routines, setRoutines] = useState([]);
  const [empty, setempty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setusername] = useState('');
  const fetchData = async (PropUserName) => {
    setusername(PropUserName)
  setIsLoading(true);
    try {
      const response = await fetchActivityDocuments(PropUserName);
      if (response && response.length > 0) {
        setRoutines(response)
        setempty(false)

      }
      else {
        setempty(true)
      }
    } catch (error) {
      setempty(true)
      Notify.info((error.message||'Error happened please try again later'), {
        position: 'center-top',
      })
    }
  setIsLoading(false);

  };
  useEffect(() => {
    const storedUserName = secureLocalStorage.getItem("username");
    const IsloggedIn = secureLocalStorage.getItem("loggedIn");

    if (IsloggedIn) {
      
      fetchData(storedUserName);
    }
    else {
      Notify.info('you are signed out, please log in first', {
        position: 'center-top',
      })
    }
  }, []);

  return (
    <div className='min-h-screen routines-bg flex justify-center flex-col items-center p-2 relative [&>*]:font-bold'>
      <svg className='absolute left-0 top-0 w-full h-full object-cover -z-10' viewBox="0 0 3000 2000" xmlns="http://www.w3.org/2000/svg"><mask id="b" x="0" y="0" width="3000" height="2000"><path fill="url(#a)" d="M0 0h3000v2000H0z"/></mask><path fill="#000336" d="M0 0h3000v2000H0z"/><g style={{transformOrigin:'center center'}} stroke="#4c4e72" strokeWidth="3" mask="url(#b)"><path fill="none" d="M0 0h150v150H0zM150 0h150v150H150zM300 0h150v150H300zM450 0h150v150H450zM600 0h150v150H600zM750 0h150v150H750z"/><path fill="#4c4e72b0" d="M900 0h150v150H900z"/><path fill="none" d="M1050 0h150v150h-150zM1200 0h150v150h-150z"/><path fill="#4c4e723e" d="M1350 0h150v150h-150z"/><path fill="none" d="M1500 0h150v150h-150zM1650 0h150v150h-150zM1800 0h150v150h-150z"/><path fill="#4c4e72a1" d="M1950 0h150v150h-150z"/><path fill="none" d="M2100 0h150v150h-150zM2250 0h150v150h-150zM2400 0h150v150h-150z"/><path fill="#4c4e72df" d="M2550 0h150v150h-150z"/><path fill="#4c4e72f0" d="M2700 0h150v150h-150z"/><path fill="none" d="M2850 0h150v150h-150z"/><path fill="#4c4e725a" d="M0 150h150v150H0z"/><path fill="none" d="M150 150h150v150H150z"/><path fill="#4c4e72b5" d="M300 150h150v150H300z"/><path fill="#4c4e720a" d="M450 150h150v150H450z"/><path fill="#4c4e72f3" d="M600 150h150v150H600z"/><path fill="none" d="M750 150h150v150H750zM900 150h150v150H900zM1050 150h150v150h-150zM1200 150h150v150h-150z"/><path fill="#4c4e721a" d="M1350 150h150v150h-150z"/><path fill="none" d="M1500 150h150v150h-150zM1650 150h150v150h-150z"/><path fill="#4c4e7208" d="M1800 150h150v150h-150z"/><path fill="none" d="M1950 150h150v150h-150zM2100 150h150v150h-150zM2250 150h150v150h-150zM2400 150h150v150h-150zM2550 150h150v150h-150z"/><path fill="#4c4e7285" d="M2700 150h150v150h-150z"/><path fill="none" d="M2850 150h150v150h-150zM0 300h150v150H0z"/><path fill="#4c4e7261" d="M150 300h150v150H150z"/><path fill="none" d="M300 300h150v150H300z"/><path fill="#4c4e7236" d="M450 300h150v150H450z"/><path fill="none" d="M600 300h150v150H600zM750 300h150v150H750zM900 300h150v150H900zM1050 300h150v150h-150zM1200 300h150v150h-150zM1350 300h150v150h-150zM1500 300h150v150h-150zM1650 300h150v150h-150zM1800 300h150v150h-150zM1950 300h150v150h-150zM2100 300h150v150h-150zM2250 300h150v150h-150zM2400 300h150v150h-150zM2550 300h150v150h-150z"/><path fill="#4c4e720d" d="M2700 300h150v150h-150z"/><path fill="none" d="M2850 300h150v150h-150zM0 450h150v150H0zM150 450h150v150H150zM300 450h150v150H300zM450 450h150v150H450z"/><path fill="#4c4e727d" d="M600 450h150v150H600z"/><path fill="#4c4e7260" d="M750 450h150v150H750z"/><path fill="none" d="M900 450h150v150H900zM1050 450h150v150h-150z"/><path fill="#4c4e7264" d="M1200 450h150v150h-150z"/><path fill="none" d="M1350 450h150v150h-150z"/><path fill="#4c4e726e" d="M1500 450h150v150h-150z"/><path fill="none" d="M1650 450h150v150h-150zM1800 450h150v150h-150zM1950 450h150v150h-150z"/><path fill="#4c4e722b" d="M2100 450h150v150h-150z"/><path fill="none" d="M2250 450h150v150h-150zM2400 450h150v150h-150zM2550 450h150v150h-150zM2700 450h150v150h-150zM2850 450h150v150h-150z"/><path fill="#4c4e7239" d="M0 600h150v150H0z"/><path fill="none" d="M150 600h150v150H150zM300 600h150v150H300z"/><path fill="#4c4e726b" d="M450 600h150v150H450z"/><path fill="#4c4e7289" d="M600 600h150v150H600z"/><path fill="#4c4e72f3" d="M750 600h150v150H750z"/><path fill="none" d="M900 600h150v150H900z"/><path fill="#4c4e7208" d="M1050 600h150v150h-150z"/><path fill="none" d="M1200 600h150v150h-150zM1350 600h150v150h-150zM1500 600h150v150h-150zM1650 600h150v150h-150zM1800 600h150v150h-150zM1950 600h150v150h-150zM2100 600h150v150h-150z"/><path fill="#4c4e722d" d="M2250 600h150v150h-150z"/><path fill="#4c4e72c0" d="M2400 600h150v150h-150z"/><path fill="none" d="M2550 600h150v150h-150z"/><path fill="#4c4e7211" d="M2700 600h150v150h-150z"/><path fill="none" d="M2850 600h150v150h-150zM0 750h150v150H0zM150 750h150v150H150zM300 750h150v150H300zM450 750h150v150H450z"/><path fill="#4c4e72d5" d="M600 750h150v150H600z"/><path fill="none" d="M750 750h150v150H750zM900 750h150v150H900zM1050 750h150v150h-150zM1200 750h150v150h-150z"/><path fill="#4c4e7270" d="M1350 750h150v150h-150z"/><path fill="none" d="M1500 750h150v150h-150zM1650 750h150v150h-150zM1800 750h150v150h-150z"/><path fill="#4c4e7291" d="M1950 750h150v150h-150z"/><path fill="none" d="M2100 750h150v150h-150zM2250 750h150v150h-150zM2400 750h150v150h-150zM2550 750h150v150h-150z"/><path fill="#4c4e726b" d="M2700 750h150v150h-150z"/><path fill="none" d="M2850 750h150v150h-150zM0 900h150v150H0z"/><path fill="#4c4e7290" d="M150 900h150v150H150z"/><path fill="#4c4e72c5" d="M300 900h150v150H300z"/><path fill="none" d="M450 900h150v150H450z"/><path fill="#4c4e72ef" d="M600 900h150v150H600z"/><path fill="#4c4e7240" d="M750 900h150v150H750z"/><path fill="none" d="M900 900h150v150H900zM1050 900h150v150h-150zM1200 900h150v150h-150z"/><path fill="#4c4e72aa" d="M1350 900h150v150h-150z"/><path fill="#4c4e72b7" d="M1500 900h150v150h-150z"/><path fill="#4c4e7207" d="M1650 900h150v150h-150z"/><path fill="#4c4e7259" d="M1800 900h150v150h-150z"/><path fill="none" d="M1950 900h150v150h-150zM2100 900h150v150h-150z"/><path fill="#4c4e7275" d="M2250 900h150v150h-150z"/><path fill="none" d="M2400 900h150v150h-150zM2550 900h150v150h-150z"/><path fill="#4c4e7280" d="M2700 900h150v150h-150z"/><path fill="none" d="M2850 900h150v150h-150zM0 1050h150v150H0z"/><path fill="#4c4e727b" d="M150 1050h150v150H150z"/><path fill="#4c4e723f" d="M300 1050h150v150H300z"/><path fill="#4c4e72f8" d="M450 1050h150v150H450z"/><path fill="#4c4e720d" d="M600 1050h150v150H600z"/><path fill="none" d="M750 1050h150v150H750z"/><path fill="#4c4e7297" d="M900 1050h150v150H900z"/><path fill="none" d="M1050 1050h150v150h-150zM1200 1050h150v150h-150zM1350 1050h150v150h-150zM1500 1050h150v150h-150z"/><path fill="#4c4e72f5" d="M1650 1050h150v150h-150z"/><path fill="none" d="M1800 1050h150v150h-150zM1950 1050h150v150h-150zM2100 1050h150v150h-150z"/><path fill="#4c4e72da" d="M2250 1050h150v150h-150z"/><path fill="#4c4e7283" d="M2400 1050h150v150h-150z"/><path fill="none" d="M2550 1050h150v150h-150z"/><path fill="#4c4e72dc" d="M2700 1050h150v150h-150z"/><path fill="none" d="M2850 1050h150v150h-150zM0 1200h150v150H0zM150 1200h150v150H150z"/><path fill="#4c4e72f7" d="M300 1200h150v150H300z"/><path fill="none" d="M450 1200h150v150H450zM600 1200h150v150H600z"/><path fill="#4c4e72c5" d="M750 1200h150v150H750z"/><path fill="#4c4e7293" d="M900 1200h150v150H900z"/><path fill="none" d="M1050 1200h150v150h-150zM1200 1200h150v150h-150z"/><path fill="#4c4e7230" d="M1350 1200h150v150h-150z"/><path fill="none" d="M1500 1200h150v150h-150z"/><path fill="#4c4e7277" d="M1650 1200h150v150h-150z"/><path fill="none" d="M1800 1200h150v150h-150z"/><path fill="#4c4e720b" d="M1950 1200h150v150h-150z"/><path fill="#4c4e7272" d="M2100 1200h150v150h-150z"/><path fill="none" d="M2250 1200h150v150h-150zM2400 1200h150v150h-150zM2550 1200h150v150h-150z"/><path fill="#4c4e72a4" d="M2700 1200h150v150h-150z"/><path fill="#4c4e7260" d="M2850 1200h150v150h-150z"/><path fill="#4c4e727c" d="M0 1350h150v150H0z"/><path fill="none" d="M150 1350h150v150H150zM300 1350h150v150H300z"/><path fill="#4c4e7209" d="M450 1350h150v150H450z"/><path fill="#4c4e729b" d="M600 1350h150v150H600z"/><path fill="#4c4e72af" d="M750 1350h150v150H750z"/><path fill="none" d="M900 1350h150v150H900zM1050 1350h150v150h-150zM1200 1350h150v150h-150z"/><path fill="#4c4e7238" d="M1350 1350h150v150h-150z"/><path fill="none" d="M1500 1350h150v150h-150zM1650 1350h150v150h-150zM1800 1350h150v150h-150zM1950 1350h150v150h-150z"/><path fill="#4c4e72f7" d="M2100 1350h150v150h-150z"/><path fill="none" d="M2250 1350h150v150h-150z"/><path fill="#4c4e7249" d="M2400 1350h150v150h-150z"/><path fill="none" d="M2550 1350h150v150h-150zM2700 1350h150v150h-150zM2850 1350h150v150h-150zM0 1500h150v150H0z"/><path fill="#4c4e7293" d="M150 1500h150v150H150z"/><path fill="#4c4e7202" d="M300 1500h150v150H300z"/><path fill="none" d="M450 1500h150v150H450zM600 1500h150v150H600zM750 1500h150v150H750zM900 1500h150v150H900zM1050 1500h150v150h-150z"/><path fill="#4c4e724f" d="M1200 1500h150v150h-150z"/><path fill="none" d="M1350 1500h150v150h-150z"/><path fill="#4c4e7204" d="M1500 1500h150v150h-150z"/><path fill="none" d="M1650 1500h150v150h-150zM1800 1500h150v150h-150zM1950 1500h150v150h-150z"/><path fill="#4c4e7240" d="M2100 1500h150v150h-150z"/><path fill="#4c4e721b" d="M2250 1500h150v150h-150z"/><path fill="none" d="M2400 1500h150v150h-150zM2550 1500h150v150h-150z"/><path fill="#4c4e7277" d="M2700 1500h150v150h-150z"/><path fill="none" d="M2850 1500h150v150h-150zM0 1650h150v150H0zM150 1650h150v150H150zM300 1650h150v150H300zM450 1650h150v150H450z"/><path fill="#4c4e7291" d="M600 1650h150v150H600z"/><path fill="none" d="M750 1650h150v150H750zM900 1650h150v150H900zM1050 1650h150v150h-150z"/><path fill="#4c4e7222" d="M1200 1650h150v150h-150z"/><path fill="none" d="M1350 1650h150v150h-150z"/><path fill="#4c4e7292" d="M1500 1650h150v150h-150z"/><path fill="none" d="M1650 1650h150v150h-150zM1800 1650h150v150h-150z"/><path fill="#4c4e720d" d="M1950 1650h150v150h-150z"/><path fill="none" d="M2100 1650h150v150h-150zM2250 1650h150v150h-150z"/><path fill="#4c4e726c" d="M2400 1650h150v150h-150z"/><path fill="#4c4e727e" d="M2550 1650h150v150h-150z"/><path fill="#4c4e72f2" d="M2700 1650h150v150h-150z"/><path fill="none" d="M2850 1650h150v150h-150zM0 1800h150v150H0zM150 1800h150v150H150zM300 1800h150v150H300z"/><path fill="#4c4e7218" d="M450 1800h150v150H450z"/><path fill="#4c4e7240" d="M600 1800h150v150H600z"/><path fill="none" d="M750 1800h150v150H750zM900 1800h150v150H900zM1050 1800h150v150h-150zM1200 1800h150v150h-150zM1350 1800h150v150h-150zM1500 1800h150v150h-150zM1650 1800h150v150h-150z"/><path fill="#4c4e72be" d="M1800 1800h150v150h-150z"/><path fill="none" d="M1950 1800h150v150h-150zM2100 1800h150v150h-150zM2250 1800h150v150h-150zM2400 1800h150v150h-150zM2550 1800h150v150h-150zM2700 1800h150v150h-150zM2850 1800h150v150h-150z"/><path fill="#4c4e7234" d="M0 1950h150v150H0z"/><path fill="#4c4e72dc" d="M150 1950h150v150H150z"/><path fill="#4c4e7211" d="M300 1950h150v150H300z"/><path fill="#4c4e7203" d="M450 1950h150v150H450z"/><path fill="none" d="M600 1950h150v150H600z"/><path fill="#4c4e725a" d="M750 1950h150v150H750z"/><path fill="none" d="M900 1950h150v150H900zM1050 1950h150v150h-150zM1200 1950h150v150h-150z"/><path fill="#4c4e7264" d="M1350 1950h150v150h-150z"/><path fill="#4c4e72f1" d="M1500 1950h150v150h-150z"/><path fill="none" d="M1650 1950h150v150h-150zM1800 1950h150v150h-150z"/><path fill="#4c4e7266" d="M1950 1950h150v150h-150z"/><path fill="none" d="M2100 1950h150v150h-150z"/><path fill="#4c4e724a" d="M2250 1950h150v150h-150z"/><path fill="none" d="M2400 1950h150v150h-150zM2550 1950h150v150h-150zM2700 1950h150v150h-150zM2850 1950h150v150h-150z"/></g><defs><radialGradient id="a"><stop offset="0" stopColor="#fff"/><stop offset="1" stopColor="#fff" stopOpacity="0"/></radialGradient></defs></svg>
     
      <h1 className='p-2 md:text-3xl text-xl'>
        {/* {username.substring(0, username.indexOf('@'))} */}
        Your Progress</h1>
      {isLoading &&
      <Reload/> }
       
      {empty ? (
        <p className='flex justify-center '>
          <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="28" width="30" viewBox="0 0 576 512"><path d="M80 160c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zM0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176z" /></svg>
        </p>
      ) : (
        <React.Suspense fallback={<Reload/>}>
                <HighLevel RoutinesFetched={Routines} Username={username} fetchData={fetchData} />

      </React.Suspense>
      )}
   
   <div className="py-8">
            <a className="w-full md:w-auto flex gap-x-2 items-center md:text-base text-sm font-bold rounded-lg p-2 text-zinc-900 bg-slate-200 hover:bg-zinc-300 duration-900" href='/routines' >
            <FontAwesomeIcon icon={faPlus} />
              Add A Routine
            </a>
          </div>
    </div>
   
  );
};

