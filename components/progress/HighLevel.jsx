import React from 'react';
import { RoutineModal } from './RoutineModal';

export const HighLevel = ({ RoutinesFetched, Username, fetchData, handleDeleteRoutine, isLoading }) => {
  return (
    <div className="[&>*]:backdrop-filter [&>*]:backdrop-brightness-95 [&>*]:backdrop-blur-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full px-4 md:px-12 gap-4 mt-2 ">
      {RoutinesFetched.length > 0 ? (
        RoutinesFetched.map((routine) => (
          <RoutineModal
            key={routine.id}
            routine={routine}
            isLoading={isLoading}
            handleDeleteRoutine={handleDeleteRoutine}
            Username={Username}
            fetchData={fetchData}
          />
        ))
      ) : (
        <p className='flex justify-center '>
        <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="30" width="30" viewBox="0 0 576 512"><path d="M80 160c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zM0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176z" /></svg>
      </p>
      )}
    </div>
  );
};
