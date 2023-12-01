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
  const [notFoundEmail, setNotFoundEmail] = React.useState(false);
  const resetpass = async () => {
    try {
      const resetProcess = await ResetPassword(email)
      if (resetProcess === true) {
        Notify.info('email sent successfully', {
          position: 'center-top',
        });
        setNotFoundEmail(false)
        setOpen(false)
      }
      else {
        setNotFoundEmail(true)
        Notify.failure("we don't have this address in our data", {
          position: 'center-top',
        }); 
      }
             


    } catch (error) {
      console.log('resetProcess error', error);
    }
    setEmail('')
  }
  const handleFocus = () => {
    if (notFoundEmail) {
      setNotFoundEmail(false);
    }
  };
const handleSubmit = (event) => {
  event.preventDefault();
  resetpass()
}
  return (
    <React.Fragment>
      
      <a
        className='underline text-gray-300 hover:text-gray-400'
        onClick={() => setOpen(true)}
      >
        Forget Password?
      </a>
      <Modal open={open} onClose={() => setOpen(false)} keepMounted>
        
        <ModalDialog>
        
          <DialogTitle>Reset Your Password</DialogTitle>
          <DialogContent>Fill in your email to recieve a message for password reset</DialogContent>
          <form
            onSubmit={handleSubmit}
          >
            <Stack spacing={2}>
              <FormControl>
                <FormLabel>Email</FormLabel>
                <Input
                  placeholder='enter your email'
                  required type='email'
                  style={{
                    border: notFoundEmail ? '2px solid red' : 'none',
                  }}
                  onFocus={ handleFocus}
                  onChange={(e)=>setEmail(e.target.value)
                  } />
              </FormControl>
              
              <Button type="submit"
              variant="plain"
                color="primary"
              >Submit
              
              </Button>
              
            </Stack>
          </form>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}
