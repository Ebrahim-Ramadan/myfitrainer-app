'use client'
import React, { useEffect, useState } from 'react';
import { fetchActivityDocuments } from '@/lib/auth/FetchRoutines'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen } from '@fortawesome/free-solid-svg-icons';
import secureLocalStorage from "react-secure-storage";
import { Notify } from 'notiflix';
import {HighLevel} from './HighLevel'
import {History} from './History'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Reload } from '../globals/Reload';

export const Progress = () => {
  const [UnfinishedRoutines, setUnfinishedRoutines] = useState([]);
  const [finishedRoutines, setfinishedRoutines] = useState([]);
  const [empty, setempty] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setusername] = useState('');
  const fetchData = async (PropUserName) => {
    setusername(PropUserName)
  setIsLoading(true);
    try {
      const response = await fetchActivityDocuments(PropUserName);
      if (response && response.unfinishedRoutines.length > 0) {
        setUnfinishedRoutines(response.unfinishedRoutines)
        setfinishedRoutines(response.finishedRoutines)
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
    <div className=''>
      <Tabs aria-label="Basic tabs" className='min-h-screen routines-bg flex justify-center flex-col items-center p-2 relative [&>*]:font-bold' defaultValue={0} size="sm">
      {isLoading &&
      <Reload/> }
        <div className='flex flex-row justify-around w-full md:p-2'>
        <TabList >
            <Tab variant="outlined"
              style={{ borderRadius: '5px', }}
              disableIndicator
      color="primary">Current</Tab>
            <Tab variant="outlined"
              style={{ borderRadius: '5px', }}
              disableIndicator
      color="primary">Past</Tab>
        </TabList>
        <a className=" flex md:gap-x-2 gap-x-1 items-center md:text-md text-xs font-bold rounded-lg p-2 text-zinc-900 bg-slate-200 hover:bg-zinc-300 duration-900" href='/routines' >
            <FontAwesomeIcon icon={faPlus} />
              Add Routine
            </a>
     </div>
        <TabPanel value={0}
        >
      {empty ? (
        <p className='flex justify-center '>
          <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="28" width="30" viewBox="0 0 576 512"><path d="M80 160c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zM0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176z" /></svg>
        </p>
      ) : (
        <React.Suspense fallback={<Reload/>}>
                <HighLevel RoutinesFetched={UnfinishedRoutines} Username={username} fetchData={fetchData} />

      </React.Suspense>
      )}
      </TabPanel>
      <TabPanel value={1}>
        <History />
      </TabPanel>
    </Tabs>
      
      
    </div>
   
  );
};

