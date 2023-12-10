import * as React from 'react';
import Button from '@mui/joy/Button';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';
import { handlerCreateRoutine } from '@/lib/auth/AddRoutine'
import secureLocalStorage from "react-secure-storage";
import { Notify } from 'notiflix';
import { useRouter } from 'next/navigation';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCircleInfo, faPlus } from '@fortawesome/free-solid-svg-icons';

export const MuscleModal = ({routine}) => {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [adding, setadding] = React.useState(false);
  const [showFullInstructions, setShowFullInstructions] = React.useState(false);
  const truncatedInstructions = routine.instructions.slice(0, 150);
  const remainingInstructions = routine.instructions.slice(150);
  const toggleInstructions = () => {
    setShowFullInstructions(!showFullInstructions);
  };

  const storedUserName = secureLocalStorage.getItem("username");
  const IsloggedIn = secureLocalStorage.getItem("loggedIn");
  const Create_Routine = async (event) => {
    setadding(true)
    event.preventDefault();
    if (IsloggedIn) {
    const res = await handlerCreateRoutine(storedUserName, routine)
      if (res) {
        Notify.success('Routine added successfully', {
          position: 'center-top',
        })
        setOpen(false)
      }
      setadding(false)
    }
    else {
      Notify.info('Your are not logged in, login first', {
        position: 'center-top',
      })
      setOpen(false)
    router.push('/login');

    }
  }

  const formatInstructions = (instructions) => {
    const splitInstructions = instructions.split('. ');
    const formattedInstructions = splitInstructions
      .map((instruction, index) => {
        // Add a new line after each full stop or two
        return (index + 1) % 2 === 0 ? `${instruction}.\n\n` : `${instruction}. `;
      })
      .join('');
    return formattedInstructions;
  };

  return (
    <React.Fragment>
      <button
        className='text-white rounded-lg p-2 h-fit bg-[#181616] font-bold hover:bg-[#282424] transition-all duration-900 flex items-center justify-between  transition-all duration-300 transform transition-transform duration-200 hover:scale-105'
        onClick={() => setOpen(true)}
      >
        {routine.name} <FontAwesomeIcon icon={faPlus} />
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>{routine.name} Routine</DialogTitle>
          <p className='font-medium text-sm text-gray-400'>#{routine.muscle}</p>
          <span className='font-bold text-lg'>
          <FontAwesomeIcon icon={faCircleInfo} className='mr-2'/>Instructions</span>

         

          <DialogContent>
          {showFullInstructions
              ? formatInstructions(routine.instructions)
              : `${formatInstructions(truncatedInstructions)}...\n`}
            {!showFullInstructions && remainingInstructions.length > 0 && (
              <button className="text-sm underline" onClick={toggleInstructions}>
                Read More...
              </button>
            )}
          </DialogContent>
          <hr />
          <Stack spacing={2}>
            <Button type="submit" color='primary' variant='outlined'
            onClick={Create_Routine} disabled={adding}>
              
              <FontAwesomeIcon icon={faPlus} style={{marginRight:'5px'}} /> {adding?'adding...':'ADD'}
              </Button>
            </Stack>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};
