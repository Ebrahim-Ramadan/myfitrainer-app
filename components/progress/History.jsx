'use client'
import React from 'react'
import Accordion from '@mui/joy/Accordion';
import AccordionDetails from '@mui/joy/AccordionDetails';
import AccordionGroup from '@mui/joy/AccordionGroup';
import AccordionSummary from '@mui/joy/AccordionSummary';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { updateRoutineFinished, addImagesToRoutine} from '@/lib/auth/Addsets';
import { faTrash, faCloudArrowUp, faCircleLeft, faBatteryEmpty, faSquareMinus, }
  from '@fortawesome/free-solid-svg-icons';
  import { Notify } from 'notiflix';
import { Reload } from '../globals/Reload';
import Image from 'next/image';

export const History = ({finishedRoutines, Username, fetchData, handleDeleteRoutine, isLoading}) => {
  return (
    <div className='flex flex-col gap-y-4 [&>*]:p-2 text-white'>
      {finishedRoutines.map((routine) => (
      <AccordionBasic key={routine.id} className='w-full flex flex-col md:flex-row justify-between rounded-lg items-center border border-2 border-green-950' routine={routine} Username={Username} fetchData={fetchData} handleDeleteRoutine={handleDeleteRoutine} isLoading={isLoading} />

        ))
      }
    </div>
    
  )
}
function AccordionBasic({ routine,Username,  fetchData, handleDeleteRoutine }) {
  const [localload, setlocalload] = React.useState(false);

  const calculateSums = () => {
    let totalWeight = 0;
    let totalReps = 0;
    routine.sets.map((set) => {
      const kilograms = parseFloat(set.setData.kilograms);
      const repetitions = parseFloat(set.setData.repetitions);
    
      totalWeight += kilograms;
      totalReps += repetitions;
     })
  return { totalWeight, totalReps };
  };
  
  const { totalWeight, totalReps } = calculateSums();
  
  const handlePumpPicsUpload = async(event) => {
    const files = event.target.files;
    const imagesArray = [];
    setlocalload(true)

    // Convert FileList object to an array and add to the existing selectedImages state, other filebase64 converting is done in lib/auth
    for (let i = 0; i < files.length; i++) {
      imagesArray.push(files[i]);
    }
    try {
      const res = await addImagesToRoutine(Username, routine.id, imagesArray)
      console.log('res', res);
      if (res) {
        Notify.success(`uploaded pictures. what a pump! `, {
          position: 'center-top',
        })
        await fetchData(Username)
      }
      else {
        Notify.info(`something went wrong please try again late`, {
          position: 'center-top',
        })
      }
    } catch (error) {
      console.log('handlePumpPicsUpload error', error.message);
      Notify.failure(`pictures size succeeds our 1mg maximum`, {
        position: 'center-top',
      })
    }
    setlocalload(false)

  }
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
            <div className='mt-2 flex flex-row max-w-full flex-wrap gap-2 [&>*]:px-2'>
            {Array.isArray(routine.sets) && routine.sets.length > 0 && (
            routine.sets.map((set) => (
      <div key={set.setId} className={`text-[#2F4858] shadow-md bg-gray-100 w-fit items-center rounded-lg `}>
                <span>
                {set.setData.repetitions.substring(0, 3)}{set.setData.repetitions.length>3&&'..'} reps,  {' '}
                  {set.setData.kilograms.substring(0, 3)}{set.setData.kilograms.length > 3 && '..'}kg each
                </span>
      </div>
    ))
              )}
             {Array.isArray(routine.sets) && routine.sets.length > 2 && (
                 <p className='text-green-800 text-xs bg-gray-100 shadow-lg p-2 rounded-lg'>JUST HIT TOTAL {totalWeight}KG, {totalReps}REPS YOU HARD SMASHED THERE</p>
              )} 
         
              
            </div>
            <div className='flex justify-center'>
              
            {Array.isArray(routine.sets) && routine.sets.length == 0 && (
                <FontAwesomeIcon icon={faBatteryEmpty} />
              )}
            </div>
            <div className='flex flex-row items-center flex-wrap [&>*]:shadow-md [&>*]:cursor-pointer gap-2 p-2'>
              {routine.data.images?.length > 0 &&
              routine.data.images.map((picture, idx) => (
                  <Image key={idx} src={picture} width={70} height={70} priority alt='pump picture' className='rounded-md shadow-lg' />

              ))}
              {routine.data.images.length > 0 &&
              <FontAwesomeIcon icon={faSquareMinus} style={{ color: "#002566", }} size='lg' className='p-2 hover:bg-gray-100 rounded-lg '
                onClick={async () => {
    setlocalload(true)
                const res = await addImagesToRoutine(Username, routine.id, null, true)
                  if (res) {
                    Notify.success(`removed your pictures successfully`, {
                      position: 'center-top',
                    })
          await fetchData(Username)
                  }
                  else {
                    Notify.info(`something went wrong please try again later`, {
                      position: 'center-top',
                    })
                  }
    setlocalload(false)
            }}/>
              }
              

            </div>

            <div>
              <div className="mt-8 flex gap-x-2 justify-end flex-row  items-center [&>*]:rounded-lg [&>*]:cursor-pointer [&>*]:transition-all [&>*]:duration-200 text-center">
                <input
                  id='addRoutinePics'
        type="file"
        accept="image/*"
                  className="hidden"
                  multiple
                  onChange={handlePumpPicsUpload}
      />
                <label
                  
                  htmlFor="addRoutinePics"
          className="w-full  hover:bg-cyan-200 py-2 flex items-center justify-center font-semibold text-cyan-700"
          variant="outline"
        >
                  <FontAwesomeIcon icon={faCloudArrowUp} style={{marginRight:'5px'}} />
          add pump pictures
        </label>
                
                <FontAwesomeIcon icon={faCircleLeft} style={{color: "#002566",}} className='shadow-md p-2 hover:bg-gray-100 '  onClick={async () => {
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
                <FontAwesomeIcon icon={faTrash} className='hover:bg-gray-100 p-2 text-red-400 rounded-full shadow-md items-center hover:text-red-600'
                onClick={() => handleDeleteRoutine(routine.id)}/>
          </div>
</div>
          </div>
        </AccordionDetails>
      </Accordion>
    </AccordionGroup>
  );
}