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
      if (response && response.unfinishedRoutines.length > 0) {
        setRoutines(response.unfinishedRoutines)
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

