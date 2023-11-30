import React from 'react';
import { MuscleModal } from './MuscleModal';

export const RoutinesMap = ({data}) => {
  const exercises = Array.isArray(data.exercises) ? data.exercises : [];
  return (
    <div className='p-2 bg-transparent px-2 rounded-lg space-y-2'>
      <div className='font-bold text-[#d4d3d3] underline'>#{data.muscle}</div>

      
      
      <ul className='flex flex-col space-y-2'>
        {exercises.map((routine) => (
          <MuscleModal key={routine.name} routine={ routine} />
        ))}
      </ul>
    </div>
  );
};
