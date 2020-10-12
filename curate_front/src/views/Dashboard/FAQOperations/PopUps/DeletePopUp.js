import React , {useEffect, useState} from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

function DeletePopUp(props) {
  // Close menu
  const closeDialog = () => {
    props.close()
  }

  // Send to parent we are deleting
  const confirmDelete = () => {
    props.delete(props.question)
    closeDialog();
  }

  return (

      <div>
        {(props.faq && props.status) ?
          <Dialog
            open={props.status}
            onClose={closeDialog}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
            className="delete-dialog"
          >
            <DialogTitle id="alert-dialog-title">
              Confirm deletion?
            </DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-question">
                <b>Question:</b> {props.faq.question}<br/>
              </DialogContentText>
              <DialogContentText id="alert-dialog-answer">
                <b>Answer:</b> {props.faq.answer}<br/>
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={closeDialog} className="btn-cancel">
                Cancel
              </Button>
              <Button color="secondary" onClick={confirmDelete} className="btn-delete" autoFocus>
                Delete
              </Button>
            </DialogActions>
          </Dialog>
        :<></>
      }
    </div>
  );
}

export default DeletePopUp;