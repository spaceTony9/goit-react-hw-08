import { useDispatch } from 'react-redux';
import { deleteContact } from '../../redux/contacts/operations.js';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

function DeleteContactForm({ id, closeModal, notifySuccess }) {
  const dispatch = useDispatch();

  function handleConfirm() {
    dispatch(deleteContact(id));
    closeModal();
    notifySuccess();
  }

  return (
    <Dialog
      open={true}
      onClose={closeModal}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{'Confirm Deletion'}</DialogTitle>
      <DialogContent>
        <DialogContentText id="alert-dialog-description">
          Please confirm deleting the contact.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button onClick={closeModal} color="error">
          Reject
        </Button>
        <Button onClick={handleConfirm} color="primary" autoFocus>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
}

export default DeleteContactForm;
