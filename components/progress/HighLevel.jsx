import React from 'react'

import { RoutineModal } from './RoutineModal';
export const HighLevel = ({ RoutinesFetched , Username, fetchData, handleDeleteRoutine, isLoading}) => {

  return (
    <div className="[&>*]:backdrop-filter [&>*]:backdrop-brightness-95 [&>*]:backdrop-blur-lg grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-3 w-full  px-4 md:px-12 gap-4 mt-2 ">
      
      {RoutinesFetched.map((routine) => (
        <RoutineModal key={routine.id} routine={routine} isLoading={isLoading} handleDeleteRoutine={handleDeleteRoutine} Username={Username} fetchData={fetchData} />
        
        
      ))}
      
         </div>
      
  )
}
