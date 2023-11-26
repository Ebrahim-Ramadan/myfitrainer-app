'use client'
import React, { useEffect, useState } from 'react';
import { fetchActivityDocuments } from '@/lib/auth/FetchRoutines'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import secureLocalStorage from "react-secure-storage";
import { Notify } from 'notiflix';
import {HighLevel} from './HIghLevel'
import { Reload } from '../globals/Reload';
export const Progress = () => {
  const [Routines, setRoutines] = useState([]);
  const [empty, setempty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setusername] = useState('');

  useEffect(() => {
    const storedUserName = secureLocalStorage.getItem("username");
    const IsloggedIn = secureLocalStorage.getItem("loggedIn");
    const fetchData = async () => {
      setusername(storedUserName)
    setIsLoading(true);
      try {
        const response = await fetchActivityDocuments(storedUserName);
        console.log('response', response);
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
    if (IsloggedIn) {
      
      fetchData();
    }
    else {
      Notify.info('you are signed out, please log in first', {
        position: 'center-top',
      })
    }
  }, []);

  return (
    <div className='mb-4 flex justify-center flex-col items-center p-2'>
      Your Progress {username}
      {isLoading &&
      <Reload/> }
       
      {empty ? (
        <p>No activity routines yet.</p>
      ) : (
        <React.Suspense fallback={<Reload/>}>
                <HighLevel RoutinesFetched={Routines} Username={username} />

      </React.Suspense>
      )}
   
   <div className="py-8">
            <a className="w-full md:w-auto flex gap-x-2 items-center text-lg font-bold rounded-lg p-2 text-zinc-900 border border-2 bg-slate-200 hover:bg-zinc-300 duration-900" href='/routines' >
            <FontAwesomeIcon icon={faPlus} />
              Add A Routine
            </a>
          </div>
    </div>
   
  );
};

