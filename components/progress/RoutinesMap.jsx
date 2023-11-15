import React from 'react';
import { MuscleModal } from './MuscleModal';

export const RoutinesMap = ({data}) => {
  console.log('RoutinesMap data', data);
  const exercises = Array.isArray(data.exercises) ? data.exercises : [];
console.log('exercises', exercises);
  return (
    <div className='px-2 rounded-lg border border-2 border-slate-400'>
      <div className='font-bold text-gray-400 mt-2 underline'>{data.muscle}</div>
      
      <ul className='flex flex-col'>
        {exercises.map((routine) => (
          <MuscleModal key={routine.name} name={routine.name} muscle={routine.muscle} instruciton={routine.instruciton} />
        ))}
      </ul>
    </div>
  );
};
