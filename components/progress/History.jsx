'use client'
import React from 'react'
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateRoutineFinished} from '@/lib/auth/Addsets';
import { faTrash, faCloudArrowUp, faCircleLeft, faBatteryEmpty }
  from '@fortawesome/free-solid-svg-icons';
  import { Notify } from 'notiflix';
import { Reload } from '../globals/Reload';

export const History = ({finishedRoutines, Username, fetchData, handleDeleteRoutine, isLoading}) => {
  return (
    <div className='flex flex-col gap-y-4 [&>*]:p-2 text-white'>
      {Array.isArray(finishedRoutines.sets) && finishedRoutines.length > 0 ? (
        
        finishedRoutines.map((routine) => (
      <AccordionBasic key={routine.id} className='w-full flex flex-col md:flex-row justify-between rounded-lg items-center border border-2 border-green-950' routine={routine} Username={Username} fetchData={fetchData} handleDeleteRoutine={handleDeleteRoutine} isLoading={isLoading} />

        ))
      ) : (
        <p className='flex justify-center '>
        <svg xmlns="http://www.w3.org/2000/svg" fill='white' height="30" width="30" viewBox="0 0 576 512"><path d="M80 160c-8.8 0-16 7.2-16 16V336c0 8.8 7.2 16 16 16H464c8.8 0 16-7.2 16-16V176c0-8.8-7.2-16-16-16H80zM0 176c0-44.2 35.8-80 80-80H464c44.2 0 80 35.8 80 80v16c17.7 0 32 14.3 32 32v64c0 17.7-14.3 32-32 32v16c0 44.2-35.8 80-80 80H80c-44.2 0-80-35.8-80-80V176z" /></svg>
      </p>
      )
      }
    </div>
    
  )
}
function AccordionBasic({ routine,Username,  fetchData, handleDeleteRoutine }) {
  const [localload, setlocalload] = React.useState(false);
  
  return (
    <AccordionGroup
    color="success"
      variant="soft"
      size='sm' sx={{ width: 'full', borderRadius:'5px' , fontWeight:'bolder'}} transition="0.2s ease">
      <Accordion>
        <AccordionSummary >{routine.data.name}
         </AccordionSummary>
        <AccordionDetails >
        {localload &&
              <Reload/>
              }
          <div>
            Routine Sets
            <div className='grid md:grid-cols-6 grid-cols-2 gap-4 [&>*]:px-2'>
            {Array.isArray(routine.sets) && routine.sets.length > 0 ? (
            routine.sets.map((set) => (
      <div key={set.setId} className={`text-[#2F4858] underline w-fit items-center rounded-lg `}>
      <span>
                  kg: {set.setData.kilograms.substring(0, 3)}{set.setData.kilograms.length > 3 && '..'}, reps: {set.setData.repetitions.substring(0, 3)}{set.setData.repetitions.length>3&&'..'}
                </span>
      </div>
    ))
  ) : (
    <FontAwesomeIcon icon={faBatteryEmpty} />
  )}
            </div>
            
            <div>
              <div className="mt-2 flex justify-end flex-row  items-center [&>*]:rounded-lg [&>*]:cursor-pointer [&>*]:transition-all [&>*]:duration-200 text-center">
                <input
                  id='addRoutinePics'
        type="file"
        accept="image/*"
        className="hidden"
      />
                <label
                  htmlFor="addRoutinePics"
          className="w-full mr-12 hover:border hover:border-1 hover:border-cyan-400 flex items-center justify-center font-semibold text-cyan-700"
          variant="outline"
        >
                  <FontAwesomeIcon icon={faCloudArrowUp} style={{marginRight:'5px'}} />
          add pump pictures
        </label>
                
                <FontAwesomeIcon icon={faCircleLeft} style={{color: "#002566",}} className='p-2 hover:bg-gray-400  bg-gray-300'  onClick={async () => {
            setlocalload(true)

          const res = await updateRoutineFinished(Username, routine.id, false)
          console.log('res', res);
            if (res) {
              Notify.success(`${routine.data.name} gone unfinished again`, {
                position: 'center-top',
              })
          await fetchData(Username)
            }
            else {
              Notify.failure(`something went wrong, please try again later`, {
                position: 'center-top',
              })
            }
            setlocalload(false)

        }}/>
                <FontAwesomeIcon icon={faTrash} className='p-2 text-red-400 rounded-full  items-center hover:text-red-600'
                onClick={() => handleDeleteRoutine(routine.id)}/>
          </div>
</div>
          </div>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}