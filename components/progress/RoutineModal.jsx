'use client'
import * as React from 'react';
import Button from '@mui/joy/Button';
import {addSetToRoutine, updateSetFinishedState} from '@/lib/auth/Addsets';
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
        Notify.info('added a set successfully', {
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
      
          <div
        
        className="border border-1 backdrop-blur-lg md:border-none min-w-max rounded-lg p-2 cursor-pointer  hover:backdrop-brightness-75 transition-all duration-300 transform transition-transform duration-300 hover:scale-105 h-fit">
        
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
        Weight: {set.setData.kilograms} Reps: {set.setData.repetitions}
                </span>
                <FontAwesomeIcon icon={set.setData.finished ? faCircleCheck:faCircleHalfStroke } />
      </div>
    ))
  ) : (
    <p className='text-center text-gray-600'>No sets</p>
  )}
</div>

          <div className="mt-2 flex justify-between flex-row  items-center [&>*]:p-2">
            <FontAwesomeIcon icon={faCircleInfo} className='hover:text-gray-200'/>
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
  Routine Sets
  {Array.isArray(routine.sets) && routine.sets.length > 0 ? (
            routine.sets.map((set) => (
              <div key={set.setId} 
              className={`rounded-lg p-1 flex justify-between items-center ${!set.setData.finished ? 'bg-gray-200 hover:bg-gray-300 cursor-pointer':'text-gray-500'}`}
              onClick={async()=>
              {
                setlocalload(true)
                const res = await updateSetFinishedState(Username, routine.id, set.setId)
                setlocalload(false)
                if (res) {
                  fetchData(Username)
                  Notify.info(`finished the ${set.setData.kilograms}kg set successfully`, {
                    position: 'center-top',
                  })
                }
              }}>
      <span>
        Weight: {set.setData.kilograms} Reps: {set.setData.repetitions}
                </span>
                <FontAwesomeIcon icon={set.setData.finished ? faCircleCheck : faCircleHalfStroke} 
                  
                />
      </div>
    ))
  ) : (
    <p className='text-center text-gray-600'>No sets</p>
  )}
</div>
            
            <form className="flex flex-col gap-y-2 mt-4 font-bold" onSubmit={handleAddSet}>
    <h1 className='text-black text-lg '>Add A Set</h1>
              
      <div className="flex flex-col">
        <FormLabel htmlFor="kilograms">Kilograms</FormLabel>
        <Input
          id="kilograms"
          placeholder="Enter weight in kilograms"
          required
          step="0.1"
          type="number"
          value={SetData.kilograms}
          onChange={handleSetsInputs}
        />
      </div>
      <div className="flex flex-col">
        <FormLabel htmlFor="repetitions">Repetitions</FormLabel>
        <Input
          id="repetitions"
          min="1"
          placeholder="Enter number of repetitions"
          required
          step="1"
          type="number"
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
