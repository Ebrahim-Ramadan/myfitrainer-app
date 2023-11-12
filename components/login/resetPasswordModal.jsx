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
import {ResetPassword} from '@/lib/auth/resetPassword.js';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

export function BasicModalDialog() {
  const [open, setOpen] = React.useState(false);
  const [email, setEmail] = React.useState('');
  const resetpass = async() => {
    try {
      const resetProcess = await ResetPassword(email)
      console.log('resetProcess', resetProcess);
      Notify.success(resetProcess);        


    } catch (error) {
      console.log('resetProcess error', error);
      setEmail('')
    }
    
  }
  return (
    <React.Fragment>
      <Button
        variant="soft"
        color="primary"
        className='underline text-gray-400 hover:text-gray-700'
        onClick={() => setOpen(true)}
      >
        Forget Password?
      </Button>
      <Modal open={open} onClose={() => setOpen(false)} keepMounted>
        <ModalDialog>
          <DialogTitle>Reset Your Password</DialogTitle>
          <DialogContent>Fill in your email to recieve a message for password reset</DialogContent>
          <form
            onSubmit={(event) => {
              event.preventDefault();
              resetpass()
              
            }}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input required type='email'
                onChange={(e) => setEmail(e.target.value)}/>
              </FormControl>
              <Button type="submit"
              variant="plain"
                color="primary"
              >Submit</Button>
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
