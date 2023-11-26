'use client'
import React from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus, faPen, faCheck, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

import { Button } from '@mui/joy';
import {DeleteRoutine} from '@/lib/auth/DeleteRoutine'
export const HighLevel = ({ RoutinesFetched , Username}) => {
  const [showDurationInputs, setShowDurationInputs] = React.useState({});
  const [loading, setloading] = React.useState(false);

  const handleIconClick = (routineId) => {
    setShowDurationInputs((prevInputs) => ({
      ...prevInputs,
      [routineId]: true,
    }));
  };

  const handleInputBlur = (routineId) => {
    setShowDurationInputs((prevInputs) => ({
      ...prevInputs,
      [routineId]: false,
    }));
  };
  const handleSaveDuration = async (routineId) => {
    setloading(true)
    setShowDurationInputs((prevInputs) => ({
      ...prevInputs,
      [routineId]: false,
    }));
    setloading(false)
  }
  
  const handleDeleteRoutine = async (RoutineID) => { 
    setloading(true)
    try {
      const resDlt = await DeleteRoutine(Username, RoutineID)
      console.log('resDlt', resDlt);
      if (resDlt) {
        Notify.success('routine deleted from record', {
          position: 'center-top',
        });
        setTimeout(() => {
          window.location.reload();
        }, 200);
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
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-2 mt-2">
      {RoutinesFetched.map((routine) => (
        <div key={routine.id} className=" rounded-lg p-2">
          <div className="flex flex-col items-start gap-1">
          <p className="text-xl font-bold bg-gradient-to-r from-cyan-500 to-blue-500 w-full">{routine.data.name}</p>
          <p className="text-sm text-zinc-500">
          {routine.data.muscle}
          </p>
          <p className="text-sm text-zinc-500">
          {routine.data.equipment||'no equapment'} | {routine.data.difficulty}
            </p>
            {showDurationInputs[routine.id] ? (
                <div className='w-full flex flex-row justify-between items-center '>
                  <input
                    className="border rounded px-2 py-1 text-sm text-black"
                    placeholder="Duration (eg:30 mins)"
                    type="number"
                    onBlur={() => handleInputBlur(routine.id)}
                  />
                  <FontAwesomeIcon
                    icon={faCheck} 
                    onClick={() => handleSaveDuration(routine.id)}
                  style={{ cursor: 'pointer' }}
                  />
                </div>
              ) : (
                <div className='border border-2 border-slate-400  rounded-lg p-2 w-full flex flex-row items-center justify-between'>
                  <p>duration: 20 min</p>
                  <FontAwesomeIcon
                  icon={faPen}
                  onClick={() => handleIconClick(routine.id)}
                  style={{ cursor: 'pointer' }}
                />
                </div>
              )}
          
          </div>

          <div className="flex flex-col gap-2 mt-2">
         
          {Array.isArray(routine.data.sets) && routine.data.sets.length>0 ? (
              routine.data.sets.map((set, index) => (
                <div key={index} className="flex justify-between">
                  <span>{`Set ${index + 1}:`}</span>
                  <span>{`Weight: ${set.weight}, Reps: ${set.reps}`}</span>
                </div>
              ))
            ) : (
              <p>no sets for this routine</p>
            )}

            <div className="mt-2 flex justify-center flex-col">
            <Button  color='primary' variant='plain' className="w-full md:w-auto flex gap-x-2 items-center">
            <FontAwesomeIcon icon={faPlus} />
              Add Set
            </Button>
            <Button  onClick={() => handleDeleteRoutine(routine.id)} color='danger' variant='plain' className="w-full md:w-auto flex gap-x-2 items-center" disabled={loading}>
                <FontAwesomeIcon icon={faTrash} />
                Delete Routine
              
            </Button>
          </div>
          </div>
          </div>

      ))}
      
         </div>
      
  )
}
