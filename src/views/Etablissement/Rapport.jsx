import React, { useEffect } from 'react'
import { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { todoAdd } from 'Redux/Read'
import { Alert, Button, CircularProgress, Card } from '@mui/material'
import { getAnnees } from 'Redux/Read'
import moment from 'moment'
import { updateYear, deleteYear } from 'Redux/Read'

function Rapport() {
  moment.locale('fr', {
    relativeTime: {
      future: 'dans %s',
      past: 'il y a %s',
      s: 'quelques secondes',
      m: 'une minute',
      mm: '%d minutes',
      h: 'une heure',
      hh: '%d heures',
      d: 'un jour',
      dd: '%d jours',
      M: 'un mois',
      MM: '%d mois',
      y: ' un an',
      yy: '%d ans',
    },
  })
  const [annee, setAnnee] = useState('')
  const [change, setChange] = useState()
  const dispatch = useDispatch()
  const click = (e) => {
    e.preventDefault()
    if (change) {
      let data = {
        _id: change._id,
        active: change.active,
      }
      dispatch(updateYear(data))
    } else {
      let data = {
        annee: annee,
        id: new Date().toISOString(),
      }
      dispatch(todoAdd(data))
    }
  }
  const todoState = useSelector((state) => state.todostate)

  const { todos } = todoState

  useEffect(() => {
    dispatch(getAnnees())
  }, [dispatch])

  const handleDelete = (id) => {
    dispatch(deleteYear(id))
  }
  return (
    <div>
      <input placeholder="Annee" onChange={(e) => setAnnee(e.target.value)} />
      <Button variant="contained" onClick={(e) => click(e)}>
        {todoState.addAnnee === 'pending' ? (
          <CircularProgress size={24} color="info" />
        ) : (
          'Ajouter'
        )}
      </Button>
      {todoState.addAnnee === 'rejected' ? (
        <Alert severity="error">{todoState.addAnneeError}</Alert>
      ) : null}
      {todoState.addAnnee === 'success' ? (
        <Alert severity="success">Année Ajoutée</Alert>
      ) : null}
      {todoState.updateAnnee === 'rejected' ? (
        <Alert severity="error">{todoState.updateAnneeError}</Alert>
      ) : null}
      {todoState.updateAnnee === 'success' ? (
        <Alert severity="success">Annee modifiée</Alert>
      ) : null}
      {todoState.deleteAnnee === 'rejected' ? (
        <Alert severity="error">{todoState.deleteAnneeError}</Alert>
      ) : null}
      {todoState.deleteAnnee === 'success' ? (
        <Alert severity="success">Annee supprimée</Alert>
      ) : null}
      <div>
        {todoState.getAnnees === 'pending' ? <CircularProgress /> : null}
        {todos &&
          todos.map((index) => {
            return (
              <Card
                variant="outlined"
                sx={{ padding: '0.7rem', marginBottom: '1rem' }}
                key={index._id}
              >
                <h3>{index.annee}</h3>
                <p>Added : {moment(new Date(index.id)).fromNow()}</p>
                <p>Active : {index.active ? 'En cours' : 'Désactivée'}</p>

                <Button variant="contained" onClick={() => setChange(index)}>
                  Update
                </Button>
                <Button
                  variant="contained"
                  onClick={() => handleDelete(index.code_Annee)}
                >
                  Delete
                </Button>
              </Card>
            )
          })}
      </div>
    </div>
  )
}

export default Rapport
