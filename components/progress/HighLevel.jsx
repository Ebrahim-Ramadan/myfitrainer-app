'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import {DeleteRoutine} from '@/lib/auth/DeleteRoutine'
export const HighLevel = ({ RoutinesFetched , Username, fetchData}) => {
  const [loading, setloading] = React.useState(false);

  const handleDeleteRoutine = async (RoutineID) => { 
    setloading(true)
    try {
      const resDlt = await DeleteRoutine(Username, RoutineID)
      console.log('resDlt', resDlt);
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
    <div className="[&>*]:backdrop-filter [&>*]:backdrop-brightness-75 [&>*]:backdrop-blur-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-2">
      {RoutinesFetched.map((routine) => (
        <div key={routine.id} className="min-w-max rounded-lg p-2 cursor-pointer  hover:backdrop-brightness-95 transition-all duration-300">
          <div className="flex flex-col items-start">
            <p className="text-xl font-bold w-full">{routine.data.name.length < 20 ? (
            routine.data.name
            ): (
              routine.data.name.substring(0, 20)+'...'
          )}</p>
          <p className="text-sm text-stone-200">
          #{routine.data.muscle}
          </p>
          <p className="text-sm text-stone-200">
          {routine.data.equipment||'no equapment'} | {routine.data.difficulty}
            </p>
            <div className='mt-2 text-sm border border-2 border-slate-400  rounded-lg p-1 w-full flex flex-row items-center justify-between'>
              <p>Duration: 20 min</p>
              <FontAwesomeIcon icon={faClock} />
                </div>
          
          </div>

          <div className="flex flex-col m-2">
         Routine Sets
          {Array.isArray(routine.data.sets) && routine.data.sets.length>0 ? (
              routine.data.sets.map((set, index) => (
                <div key={index} className="flex justify-between">
                  <span>{`Set ${index + 1}:`}</span>
                  <span>{`Weight: ${set.weight}, Reps: ${set.reps}`}</span>
                </div>
              ))
            ) : (
              <p className='text-sm text-stone-200'>no sets for this routine.</p>
            )}
{/* <hr/> */}
            
          </div>
          <div className="mt-2 flex justify-between flex-row  items-center [&>*]:p-2">
            <FontAwesomeIcon icon={faCircleInfo} className='hover:text-gray-200'/>
            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteRoutine(routine.id)} className={`text-red-400 rounded-full ${loading&&'opacity-50'} items-center hover:text-red-800`}/>
          </div>
          </div>

      ))}
      
         </div>
      
  )
}
