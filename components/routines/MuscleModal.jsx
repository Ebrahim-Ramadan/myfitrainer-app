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

export const MuscleModal = ({routine}) => {
  const router = useRouter();

  const [open, setOpen] = React.useState(false);
  const [showFullInstructions, setShowFullInstructions] = React.useState(false);
  const truncatedInstructions = routine.instructions.slice(0, 150);
  const remainingInstructions = routine.instructions.slice(150);
  const toggleInstructions = () => {
    setShowFullInstructions(!showFullInstructions);
  };

  const storedUserName = secureLocalStorage.getItem("username");
  const IsloggedIn = secureLocalStorage.getItem("loggedIn");
  const Create_Routine = async (event) => {
    event.preventDefault();
    if (IsloggedIn) {
    const res = await handlerCreateRoutine(storedUserName, routine)
      console.log('Create_Routine res', res);
      if (res) {
        Notify.success('Activity document added successfully', {
          position: 'center-top',
        })
        setOpen(false)
      }
    }
    else {
      Notify.info('not logged in, go login first', {
        position: 'center-top',
      })
      setOpen(false)
    router.push('/login');

    }
  }
  return (
    <React.Fragment>
      <button
        className='text-white rounded-lg p-2 h-fit bg-[#181616] font-bold hover:bg-[#282424] transition-all duration-900'
        onClick={() => setOpen(true)}
      >
        {routine.name}.
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>{routine.name} Routine</DialogTitle>
          <p className='font-medium text-sm text-gray-400'>#{routine.muscle}</p>
          <span className='font-bold text-lg'>Some Instructions To Read</span>
          <DialogContent>
            {showFullInstructions ? routine.instructions : `${truncatedInstructions}....
            
            `}

            {!showFullInstructions && remainingInstructions.length > 0 && (
              <button className='text-sm underline' onClick={toggleInstructions}>
                Read More...
              </button>
            )}
          </DialogContent>
          <hr />
          <Stack spacing={2}>
            <Button type="submit" color='primary' variant='outlined'
            onClick={Create_Routine}>
                ADD
              </Button>
            </Stack>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};
