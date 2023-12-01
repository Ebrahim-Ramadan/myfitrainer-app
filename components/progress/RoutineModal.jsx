'use client'
import * as React from 'react';
import Button from '@mui/joy/Button';
import {addSetToRoutine, updateSetFinishedState, updateRoutineFinished} from '@/lib/auth/Addsets';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faClock, faTrash, faCircleCheck , faCircleHalfStroke} from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from '@mui/joy';
import { Reload } from '../globals/Reload';
import { Notify } from 'notiflix';

export const RoutineModal = ({ routine, loading, handleDeleteRoutine, Username, fetchData }) => {
  const [open, setOpen] = React.useState(false);
  const [localload, setlocalload] = React.useState(false);

    const [SetData, setSetData] = React.useState({
        kilograms: '',
        repetitions: '',
        finished: false,
    });
    const handleSetsInputs = (e) => {
        const { id, value, type, checked } = e.target;
        setSetData((prevData) => ({
          ...prevData,
          [id]: type === 'checkbox' ? checked : value,
        }));
      };
    const handleAddSet = async (e) => {
        setlocalload(true)
        e.preventDefault();
      const res = await addSetToRoutine(Username, routine.id, SetData)
      if (res) {
        Notify.success('added a set successfully', {
          position: 'center-top',
        })
      }
      
        setSetData({
          kilograms: '',
          repetitions: '',
          finished: false,
        });
        setlocalload(false)
          setOpen(false)
        fetchData(Username)
        
      };

  return (
    <React.Fragment>
      {localload &&
              <Reload/>
              }
          <div
        
        className="border border-1 border-slate-200 backdrop-blur-lg rounded-lg p-2 cursor-pointer  hover:backdrop-brightness-75 transition-all duration-300  h-fit">
        
              <div
                  onClick={()=>setOpen(true)}
                  className="flex flex-col items-start">
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

          <div
  onClick={() => setOpen(true)}
  className="flex flex-col m-2 text-sm font-bold rounded-lg gap-y-1"
>
  Routine Sets
  {Array.isArray(routine.sets) && routine.sets.length > 0 ? (
            routine.sets.map((set) => (
      <div key={set.setId} className='text-cyan-500  items-center rounded-lg p-2 bg-[#1E2745] flex justify-between'>
      <span>
                  Weight: {set.setData.kilograms.substring(0, 3)}{set.setData.kilograms.length > 3 && '..'}, Reps: {set.setData.repetitions.substring(0, 3)}{set.setData.repetitions.length>3&&'..'}
                </span>
                <FontAwesomeIcon icon={set.setData.finished ? faCircleCheck:faCircleHalfStroke } />
      </div>
    ))
  ) : (
    <p className='text-center text-gray-600'>no sets atm</p>
  )}
</div>

          <div className="mt-2 flex justify-between flex-row  items-center [&>*]:p-2">
          <FontAwesomeIcon icon={routine.finished? faCircleCheck:faCircleHalfStroke} className='hover:text-gray-200'
            onClick={async () => {
              setlocalload(true)

            const res = await updateRoutineFinished(Username, routine.id)
            console.log('res', res);
              if (res) {
                Notify.success(`you just finished the ${routine.data.name} successfully`, {
                  position: 'center-top',
                })
            fetchData(Username)
              }
              else {
                Notify.info(`finish the ${routine.data.name} sets first`, {
                  position: 'center-top',
                })
              }
              setlocalload(false)

          }}
          />
            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteRoutine(routine.id)} className={`text-red-400 rounded-full ${loading&&'opacity-50'} items-center hover:text-red-800`}/>
          </div>
          </div>
          <Modal open={open} onClose={() => setOpen(false)} keepMounted>
  <ModalDialog>
    <DialogTitle>Routine Sets</DialogTitle>
    <DialogContent>

    <div
  className="flex flex-col text-cyan-800 m-2 text-sm font-bold rounded-lg "
            >
              {localload &&
              <Reload/>
              }
  {Array.isArray(routine.sets) && routine.sets.length > 0 ? (
            routine.sets.map((set) => (
              <div key={set.setId} 
              className={`rounded-lg p-2 flex justify-between items-center ${!set.setData.finished ? 'bg-gray-200 hover:bg-gray-300 cursor-pointer':'text-gray-500 pointer-events-none'}`}
              onClick={async()=>
              {
                if (!set.setData.finished) {
                  setlocalload(true)
                  const res = await updateSetFinishedState(Username, routine.id, set.setId)
                  if (res) {
                    fetchData(Username)
                    Notify.success(`finished the ${set.setData.kilograms}kg set successfully`, {
                      position: 'center-top',
                    })
                  }
                  else {
                    Notify.failure(`something went wrong, please try again`, {
                      position: 'center-top',
                    })
                  }
                  setlocalload(false)
                }
                else {
                  Notify.info(`you have already finished the ${set.setData.kilograms}kg set`, {
                    position: 'center-top',
                  }) 
                }
              
              }}>
      <span>
      Weight: {set.setData.kilograms.substring(0, 4)}{set.setData.kilograms.length > 5 && '..'}, Reps: {set.setData.repetitions.substring(0, 4)}{set.setData.repetitions.length>5&&'..'}
                </span>
                <FontAwesomeIcon icon={set.setData.finished ? faCircleCheck : faCircleHalfStroke} 
                  
                />
      </div>
    ))
  ) : (
    <p className='text-center text-gray-600'>no sets atm</p>
  )}
</div>
            
            <form className="flex flex-col gap-y-1 mt-4 font-bold" onSubmit={handleAddSet}>
    <h1 className='text-black text-lg '>Add A Set</h1>
              
      <div className="flex flex-col">
        <FormLabel htmlFor="kilograms">Kilograms</FormLabel>
        <input
          id="kilograms"
          placeholder="Enter weight in kilograms"
          required
                  type="number"
                  min={1}
                  className='border border-2 border-slate-200 rounded-lg p-2'
          value={SetData.kilograms}
          onChange={handleSetsInputs}
        />
      </div>
      <div className="flex flex-col">
        <FormLabel htmlFor="repetitions">Repetitions</FormLabel>
        <input
          id="repetitions"
                  min={1}
          placeholder="Enter number of repetitions"
          required
          step="1"
                  type="number"
                  className='border border-2 border-slate-200 rounded-lg p-2'
          value={SetData.repetitions}
          onChange={handleSetsInputs}
        />
      </div>
      <div className="flex items-center gap-2">
        <Checkbox id="finished" checked={SetData.finished} onChange={handleSetsInputs} />
        <FormLabel className="text-sm " htmlFor="finished">
          Finished this one?
        </FormLabel>
      </div>
      <Button className="w-full" color='primary' variant='soft' type="submit" disabled={localload}>
                              {localload?'adding':'Add Set'}
      </Button>
    </form>


                      

          </DialogContent>
          
        </ModalDialog>
      </Modal>

    </React.Fragment>
  )
}
