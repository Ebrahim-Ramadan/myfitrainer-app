import React from 'react';
import { MuscleModal } from './MuscleModal';
import fatcop from '@/assets/fat-cop.png'
import Image from 'next/image';
export const RoutinesMap = ({data}) => {
  const exercises = Array.isArray(data.exercises) ? data.exercises : [];
  return (
    <div className='pb-2 px-2 rounded-lg border border-2 border-slate-400 space-y-2'>
      <div className='font-bold text-[#d4d3d3] mt-2 underline'>#{data.muscle}</div>
      {!exercises.length &&
        <div className='flex flex-col items-center space-y-2 justify-center space-x-2'>
          <Image src={fatcop} width={50} height={50}  alt='no muscles found' />
        <p className='text-sm text-gray-400'>Maybe A muscle typo? please try again</p>
        </div>
      }
      
      
      <ul className='flex flex-col space-y-2'>
        {exercises.map((routine) => (
          <MuscleModal key={routine.name} name={routine.name} muscle={routine.muscle} instructions={routine.instructions} />
        ))}
      </ul>
    </div>
  );
};
