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
import {DeleteAccount} from '@/lib/auth/DeleteAccount'
import { Reload } from '@/components/globals/Reload';
import { Notify } from 'notiflix';

export function ReAuthModal({Username}) {

  const [open, setOpen] = React.useState(false);
  const [Password, setPassword] = React.useState('');
  const [loadingState, setloadingState] = React.useState(false);
    const handleSubmit = async (event) => {
        setloadingState(true)
        event.preventDefault();
        DeleteAccount(Password)
  .then((result) => {
    Notify.info(result||'reauthicated!', {
        position: 'right-bottom',
      })
  })
  .catch((error) => {
    console.error(error); // Handle any errors
  });
  setloadingState(false)
}
  return (
    <React.Fragment>
      
      <Button
        variant="soft"
        color="danger"
        onClick={() => setOpen(true)}
      >
        Delete Account
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} keepMounted>
        
        <ModalDialog>
        {loadingState &&
                  <Reload />}
          <DialogTitle>Re-authenticate your credentials</DialogTitle>
          <DialogContent>provide your credentials first so we remake sure to delete your account forever</DialogContent>
          <form
            onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                 value={Username}
                   />

              </FormControl>
              
              <FormControl>
              <FormLabel>Password</FormLabel>
                <Input
                  placeholder='enter your password'
                  required type='text'
                  
                  onChange={(e)=>setPassword(e.target.value)
                  } />
              </FormControl>
              
              <Button type="submit"
              variant="outlined"
                color="danger"
              >Authenticate and Delete
              
              </Button>
              
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
