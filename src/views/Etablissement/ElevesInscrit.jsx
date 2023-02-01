import React, { useState, useEffect, useContext } from 'react'
import FormInscription from './FormInscription.jsx'
import { Fab } from '@mui/material'
import { Add } from '@mui/icons-material'
import Popup from 'Controls/Popup.jsx'
import ListeCard from './Liste.jsx'
import './style.css'
import { lien_read } from 'Utils.jsx'
import { CreateContexte } from 'ContextAll.jsx'
import axios from 'axios'
import jsCookie from 'js-cookie'

function ElevesInscrit() {
  const { user } = useContext(CreateContexte)
  const { data } = user

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jsCookie.get('token'),
    },
  }
  const [row, setRows] = useState([])

  const loadingEleve = async () => {
    axios
      .get(`${lien_read}/singlerecherche/${data[0].codeEtablissement}`, config)
      .then((response) => {
        setRows(response.data)
      })
  }
  useEffect(() => {
    loadingEleve()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

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
      <div className="eleve">
        {row && <ListeCard rows={row} loadingEleve={loadingEleve} />}
      </div>
      <Popup visible={open} setVisible={setOpen} title="Inscription">
        <FormInscription loadingEleve={loadingEleve} />
      </Popup>
    </div>
  )
}

export default ElevesInscrit
