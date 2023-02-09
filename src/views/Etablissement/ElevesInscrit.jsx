import React, { useState } from 'react'
import FormInscription from './FormInscription.jsx'
import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'
import Popup from 'Controls/Popup.jsx'
import ListeCard from './Liste.jsx'
import './style.css'
import { useSelector } from 'react-redux'

function ElevesInscrit() {
  const row = useSelector((state) => state.inscrit.inscrit)

  const [open, setOpen] = useState(false)
  return (
    <div className="rouge">
      <div className="btn-eleve">
        <Fab
          color="primary"
          aria-label="add"
          variant="circular"
          onClick={() => setOpen(true)}
        >
          <Add />
        </Fab>
      </div>
      <div className="eleve">{row && <ListeCard rows={row} />}</div>
      <Popup visible={open} setVisible={setOpen} title="Inscription">
        <FormInscription />
      </Popup>
    </div>
  )
}

export default ElevesInscrit
