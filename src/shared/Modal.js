import React, { useState } from 'react'
import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import DialogContent from '@material-ui/core/DialogContent'
import DialogContentText from '@material-ui/core/DialogContentText'
import DialogTitle from '@material-ui/core/DialogTitle'
import useMediaQuery from '@material-ui/core/useMediaQuery'
import { useTheme } from '@material-ui/core/styles'
import { createReceipt } from '../store/actions/dbSaveActions'
import { Link, Redirect } from 'react-router-dom'
import { useHistory } from "react-router-dom"
import { useDispatch, useSelector } from 'react-redux'

const Modal = (props) => {
  const theme = useTheme()
  const fullScreen = useMediaQuery(theme.breakpoints.down('sm'))

  const dispatch = useDispatch()
  const history = useHistory()

  const [saving, setSaving] = useState(false)
  
  const doAction = () => {
    if(props.actionToSave === 'receipt') {
      if(props.dataToSave) {
        console.log(JSON.parse(props.dataToSave))
        dispatch(createReceipt(JSON.parse(props.dataToSave)))
        history.push('/receipt-table')
      }
    }
  }

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
        disableBackdropClick="false"
        disableEscapeKeyDown={true}
        open={props.open}
        onClose={props.handleClose}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          <span dangerouslySetInnerHTML={{ __html: props.modalTitle }} />
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
          <span dangerouslySetInnerHTML={{ __html: props.modalMessage }} />
          </DialogContentText>
        </DialogContent>
        <DialogActions>
            {
                props.actionButtonTextConfirm && 
                <Button autoFocus onClick={doAction} color="primary">
                    {props.actionButtonTextConfirm}
                </Button>
            }
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