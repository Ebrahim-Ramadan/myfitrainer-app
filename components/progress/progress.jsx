'use client'
import React, { useEffect, useState } from 'react';
import { fetchActivityDocuments } from '@/lib/auth/FetchRoutines'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faQuestion, faRotateRight } from '@fortawesome/free-solid-svg-icons';
import secureLocalStorage from "react-secure-storage";
import { Notify } from 'notiflix';
import {HighLevel} from './HighLevel'
import {History} from './History'
import Tabs from '@mui/joy/Tabs';
import TabList from '@mui/joy/TabList';
import Tab from '@mui/joy/Tab';
import TabPanel from '@mui/joy/TabPanel';
import { Reload } from '../globals/Reload';
import { useRouter } from 'next/navigation';
import {DeleteRoutine} from '@/lib/auth/DeleteRoutine'
import DeleteAllRoutines from './DeleteAllRoutines';
import Help from './Help';

export const Progress = () => {
  const router = useRouter()
  const [UnfinishedRoutines, setUnfinishedRoutines] = useState([]);
  const [finishedRoutines, setfinishedRoutines] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [username, setusername] = useState('');
  const fetchData = async (PropUserName) => {
    setusername(PropUserName)
  setIsLoading(true);
  try {
    const response = await fetchActivityDocuments(PropUserName);
    if (response) {
      setUnfinishedRoutines(response.unfinishedRoutines)
      setfinishedRoutines(response.finishedRoutines)
    }

  } catch (error) {
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
      Notify.info('you are not logged in, please log in first', {
        position: 'center-top',
      })
      router.push('/login')
    }
  }, []);



  const handleDeleteRoutine = async (RoutineID) => { 
    setIsLoading(true)
    try {
      const resDlt = await DeleteRoutine(username, RoutineID)
      if (resDlt) {
        Notify.success('routine deleted from record', {
          position: 'center-top',
        });
        await fetchData(username)
      }
      else {
        Notify.success('something went wrong please try again later', {
          position: 'center-top',
        });
      }
    } catch (error) {
      console.log(error);
      Notify.failure(`${error.message} check your interent connection`, {
        position: 'center-top',
      });
    }
    setIsLoading(false)
  }
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
          <div className='flex flex-row items-center gap-x-2 [&>*]:rounded-lg [&>*]:cursor-pointer [&>*]:p-2 [&>*]:bg-slate-200 hover:[&>*]:bg-zinc-300 [&>*]:duration-900'>
          <FontAwesomeIcon icon={faPlus} onClick={()=>router.push('/routines')}/>

            <FontAwesomeIcon icon={faRotateRight} onClick={async() => {
              await fetchData(username)
            }} />

            <Help/>
            <DeleteAllRoutines Username={username}  fetchData={fetchData}/>
            {/* delete all routines btn */}
</div>
     </div>
        <TabPanel value={0}
        >
       <React.Suspense fallback={<Reload/>}>
                <HighLevel RoutinesFetched={UnfinishedRoutines} Username={username} fetchData={fetchData} handleDeleteRoutine={handleDeleteRoutine} isLoading={isLoading} />

      </React.Suspense>
      </TabPanel>
        <TabPanel value={1} className='w-full md:w-4/6'>
        <History finishedRoutines={finishedRoutines} Username={username} fetchData={fetchData} handleDeleteRoutine={handleDeleteRoutine} isLoading={isLoading} /> 
          
      </TabPanel>
    </Tabs>
      
      
    </div>
   
  );
};

