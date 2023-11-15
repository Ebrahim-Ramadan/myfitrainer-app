import * as React from 'react';
import Button from '@mui/joy/Button';

import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';

export const MuscleModal = ({ name, muscle, instructions }) => {
  const [open, setOpen] = React.useState(false);
  const [showFullInstructions, setShowFullInstructions] = React.useState(false);

  const truncatedInstructions = instructions.slice(0, 100);
  const remainingInstructions = instructions.slice(100);

  const toggleInstructions = () => {
    setShowFullInstructions(!showFullInstructions);
  };

  return (
    <React.Fragment>
      <button
        className='bg-slate-200 text-black rounded-lg p-2  font-bold hover:bg-slate-300 transition-all duration-900'
        onClick={() => setOpen(true)}
      >
        {name}.
      </button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>{name} Routine</DialogTitle>
          <p className='font-medium text-sm text-gray-400'>#{muscle}</p>
          <span className='font-bold text-lg'>Some Instructions To Read</span>
          <DialogContent>
            {showFullInstructions ? instructions : `${truncatedInstructions}....
            
            `}

            {!showFullInstructions && remainingInstructions.length > 0 && (
              <button className='text-sm underline' onClick={toggleInstructions}>
                Read More...
              </button>
            )}
          </DialogContent>
          <hr />
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <Button type="submit" color='primary' variant='outlined'>
                ADD
              </Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
};
