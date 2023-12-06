import * as React from 'react';
import Button from '@mui/joy/Button';
import Divider from '@mui/joy/Divider';
import DialogTitle from '@mui/joy/DialogTitle';
import DialogContent from '@mui/joy/DialogContent';
import DialogActions from '@mui/joy/DialogActions';
import Modal from '@mui/joy/Modal';
import ModalDialog from '@mui/joy/ModalDialog';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashCan, faTriangleExclamation } from '@fortawesome/free-solid-svg-icons';
import {DeleteAllUserRoutines} from '@/lib/auth/DeleteRoutine'
export default function DeleteAllRoutines({Username, fetchData}) {
  const [open, setOpen] = React.useState(false);
  const handleDeleteAllRoutines = async () => {
    try {
      const res = await DeleteAllUserRoutines(Username)
      console.log('DeleteAllUserRoutines', res);
      if (res) {
        await fetchData(Username)
      }
    } catch (error) {
      console.log('error', error);
    }
    
  }
  return (
    <React.Fragment>
      <FontAwesomeIcon icon={faTrashCan}
        onClick={() => setOpen(true)} style={{color: "#b10606",}}  />
      
      <Modal open={open} onClose={() => setOpen(false)}>
        <ModalDialog variant="outlined" role="alertdialog">
          <DialogTitle className=' items-center'>
          <FontAwesomeIcon icon={faTriangleExclamation} style={{color: "#eb0000",}} />
            Delete My Routines
          </DialogTitle>
          <Divider />
          <DialogContent>
            Are you sure you want to delete all of your routines? <br/> There would be no return from this operation
          </DialogContent>
          <DialogActions>
            <Button variant="outlined" color="danger" size='sm' onClick={handleDeleteAllRoutines}>
              Yes, Delete
            </Button>
            <Button variant="outlined" color="neutral"
            size='sm'  onClick={() => setOpen(false)}>
              No
            </Button>
          </DialogActions>
        </ModalDialog>
      </Modal>
    </React.Fragment>
  );
}