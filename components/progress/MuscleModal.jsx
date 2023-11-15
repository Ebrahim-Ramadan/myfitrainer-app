import * as React from 'react';
import Button from '@mui/joy/Button';
import FormControl from '@mui/joy/FormControl';
import FormLabel from '@mui/joy/FormLabel';
import Input from '@mui/joy/Input';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import Stack from '@mui/joy/Stack';

export const MuscleModal = ({name, muscle, instruciton}) => {
    const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
      <Button
        variant="solid"
        color="neutral"
        onClick={() => setOpen(true)}
      >
        {name} | {muscle}.
      </Button>
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog>
          <DialogTitle>Add {name}</DialogTitle>
                  <DialogContent>{muscle}</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              setOpen(false);
            }}
          >
            <Stack spacing={2}>
              <Button type="submit" color='primary' variant='outlined'>ADD</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  )
}
