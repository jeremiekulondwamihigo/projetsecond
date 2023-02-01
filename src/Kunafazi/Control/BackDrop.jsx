import React from 'react'
import Backdrop from '@mui/material/Backdrop'
import CircularProgress from '@mui/material/CircularProgress'

function BackDropFonction({ open }) {
  return (
    <div>
      <Backdrop sx={{ color: '#fff' }} open={open}>
        <CircularProgress color="inherit" />
      </Backdrop>
    </div>
  )
}
export default BackDropFonction
