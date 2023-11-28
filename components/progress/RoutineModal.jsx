'use client'
import * as React from 'react';
import Button from '@mui/joy/Button';
import {addSetToRoutine} from '@/lib/auth/Addsets';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faClock, faTrash } from '@fortawesome/free-solid-svg-icons';
import { Checkbox } from '@mui/joy';
export const RoutineModal = ({routine, loading, handleDeleteRoutine, Username, fetchData}) => {
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
          console.log('res', res);
        console.log(SetData);
        setSetData({
          kilograms: '',
          repetitions: '',
          finished: false,
        });
        setlocalload(false)
          setOpen(false)
        fetchData(Username)
        
      };
    const handleOpenModal = (e) => { 
        if (e.target.id === 'not-to-trigger') {
            
            return;
          }
        setOpen(true)
    }
  return (
    <React.Fragment>
      
          <div
        
        className="min-w-max rounded-lg p-2 cursor-pointer  hover:backdrop-brightness-75 transition-all duration-300 transform transition-transform duration-300 hover:scale-105 h-fit">
              <div
                  onClick={handleOpenModal}
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
                  onClick={handleOpenModal}
                  className="flex flex-col m-2 text-sm font-semibold bg-sky-600 p-2 rounded-lg">
         Routine Sets
          {Array.isArray(routine.data.sets) && routine.data.sets.length>0 ? (
              routine.data.sets.map((set, index) => (
                <div key={index} className="flex justify-between">
                      <span>{`kg: ${set.kilograms.substring(0, 2)}${set.kilograms.length > 2 ? '..' : ''}, reps: ${set.repetitions.substring(0, 2)}${set.repetitions.length > 2 ? '..' : ''}, ${set.finished ? 'finished' : 'in progress'}`}</span>
                      {!set.finished &&
                     <Checkbox id='not-to-trigger'/>
                          
                      }
                </div>
              ))
              
            ) : (
                          <div className=' text-center flex flex-col gap-y-2'>
                              <p className='text-xs font-normal text-stone-200'>no sets for this routine.</p>
                              <Button variant='outlined' color='neutral' size='sm'>Add</Button>
             </div>
            )}
{/* <hr/> */}
            
          </div>
          <div className="mt-2 flex justify-between flex-row  items-center [&>*]:p-2">
            <FontAwesomeIcon icon={faCircleInfo} className='hover:text-gray-200'/>
            <FontAwesomeIcon icon={faTrash} onClick={() => handleDeleteRoutine(routine.id)} className={`text-red-400 rounded-full ${loading&&'opacity-50'} items-center hover:text-red-800`}/>
          </div>
          </div>
          <Modal open={open} onClose={() => setOpen(false)} keepMounted>
  <ModalDialog>
    <DialogTitle>Add set</DialogTitle>
    <DialogContent>

                      

    <form className="flex flex-col gap-y-4" onSubmit={handleAddSet}>
      <div className="flex flex-col gap-y-2">
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
      <div className="flex flex-col gap-y-2">
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
        <FormLabel className="text-sm font-normal" htmlFor="finished">
          Finished?
        </FormLabel>
      </div>
      <Button className="w-full" type="submit" disabled={localload}>
                              {localload?'adding':'Add Set'}
      </Button>
    </form>


                      

          </DialogContent>
          
        </ModalDialog>
      </Modal>

    </React.Fragment>
  )
}
