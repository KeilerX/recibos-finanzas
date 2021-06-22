import React from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import useMediaQuery from '@material-ui/core/useMediaQuery';
import { useTheme } from '@material-ui/core/styles';

const Modal = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
        {
            props.buttonText && 
            <Button variant="outlined" color="primary" onClick={props.handleClickOpen}>
                {props.buttonText}
            </Button>
        }
      <Dialog
        fullScreen={fullScreen}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">{props.modalTitle}</DialogTitle>
        <DialogContent>
          <DialogContentText>
            {props.modalMessage}
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            {
                props.actionButtonText && 
                <Button autoFocus onClick={props.handleClose} color="primary">
                    {props.actionButtonText}
                </Button>
            }
        </DialogActions>
      </Dialog>
    </div>
  );
}

export default Modal