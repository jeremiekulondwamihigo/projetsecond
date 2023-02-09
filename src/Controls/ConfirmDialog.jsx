import React from 'react'
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
} from '@mui/material'

export default function ConfirmDialog(props) {
  const { confirmDialog, setConfirmDialog } = props

  return (
    <Dialog open={confirmDialog.isOpen} style={style.dialog}>
      <DialogTitle></DialogTitle>
      <DialogContent style={style.contentDialog}>
        <Typography variant="h7">{confirmDialog.title}</Typography>
      </DialogContent>
      <DialogActions style={style.contentButton}>
        <button
          className="btn btn-danger"
          onClick={() => setConfirmDialog({ ...confirmDialog, isOpen: false })}
        >
          No
        </button>
        <button className="btn btn-success" onClick={confirmDialog.onConfirm}>
          Yes
        </button>
      </DialogActions>
    </Dialog>
  )
}
const style = {
  dialog: {
    padding: '10px',
    position: 'absolute',
    top: '5px',
  },
  contentDialog: {
    textAlign: 'center',
  },
  contentButton: {
    justifyContent: 'center',
  },
}
