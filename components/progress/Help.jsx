import * as React from 'react';
import Modal from '@mui/joy/Modal';
import ModalClose from '@mui/joy/ModalClose';
import Typography from '@mui/joy/Typography';
import Sheet from '@mui/joy/Sheet';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faQuestion } from '@fortawesome/free-solid-svg-icons';
export default function Help() {
  const [open, setOpen] = React.useState(false);
  return (
    <React.Fragment>
          <FontAwesomeIcon icon={faQuestion} onClick={() => setOpen(true)} />
          <Modal
        aria-labelledby="modal-title"
        aria-describedby="modal-desc"
        open={open}
        onClose={() => setOpen(false)}
        sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <Sheet
          variant="plain"
          sx={{
            maxWidth: 500,
            borderRadius: 'md',
            p: 3,
            boxShadow: 'lg',
          }}
        >
          <ModalClose variant="plain" sx={{ m: 1 }} />
          <Typography
            component="h2"
            id="modal-title"
            level="h4"
            textColor="inherit"
            fontWeight="lg"
            mb={1}
          >
            How-todos
          </Typography>
          <Typography id="modal-desc" textColor="text.tertiary">
                     Click on the routine to open its sets, there you can/update sets. Also you can finish the whole routine if and only if when all its sets are finished. <br/> in the Past tab, you can see all your completed-out routines and its sets, you also can upload pictures for your pump for the records.
          </Typography>
        </Sheet>
          </Modal>
    </React.Fragment>
  );
}