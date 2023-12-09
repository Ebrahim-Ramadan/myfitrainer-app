import React from 'react';
import { MuscleModal } from './MuscleModal';

export const RoutinesMap = ({data}) => {
  const exercises = Array.isArray(data.exercises) ? data.exercises : [];
  return (
    <div className='p-2 bg-transparent px-2 rounded-lg space-y-2 scroll-mt-14 scroll-smooth' id={data.muscle}>
      <a className='font-bold text-[#d4d3d3] underline' href={`#${data.muscle}`}>#{data.muscle}</a>
      <ul className='flex flex-col space-y-2' >
        {exercises.map((routine) => (
          <MuscleModal key={routine.name} routine={ routine} />
        ))}
      </ul>
     
    </div>
  );
};
