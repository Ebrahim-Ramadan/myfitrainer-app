'use client'
import React from 'react'
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {DeleteRoutine} from '@/lib/auth/DeleteRoutine'
import { RoutineModal } from './RoutineModal';
export const HighLevel = ({ RoutinesFetched , Username, fetchData}) => {
  const [loading, setloading] = React.useState(false);

  const handleDeleteRoutine = async (RoutineID) => { 
    setloading(true)
    try {
      const resDlt = await DeleteRoutine(Username, RoutineID)
      if (resDlt) {
        Notify.success('routine deleted from record', {
          position: 'center-top',
        });
        fetchData(Username)
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
    setloading(false)
  }
  return (
    <div className="[&>*]:backdrop-filter [&>*]:backdrop-brightness-95 [&>*]:backdrop-blur-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 w-full  px-4 md:px-12 gap-4 mt-2 ">
      
      {RoutinesFetched.map((routine) => (
        <RoutineModal key={routine.id} routine={routine} loading={loading} handleDeleteRoutine={handleDeleteRoutine} Username={Username} fetchData={fetchData} />
        
        
      ))}
      
         </div>
      
  )
}
