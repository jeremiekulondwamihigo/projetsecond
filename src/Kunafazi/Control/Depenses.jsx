import React, { useState, useEffect } from 'react'
import { TextField, Button, Paper } from '@mui/material'
import { Add } from '@mui/icons-material'
import { Alert, Stack } from '@mui/material'
import { DateActuelle } from 'Kunafazi/Static/Liens'
import axios from 'axios'
import { lien_create } from 'Kunafazi/Static/Liens'
import { lien_read } from 'Kunafazi/Static/Liens'

function Depenses() {
  const [message, setMessage] = useState()

  const [values, setValue] = useState({
    stEboueur: 0,
    stChauffeur: 0,
    sCarburant: 0,
    sLogCharroi: 0,
    sChargeAdmin: 0,
    sDime: 0,
    sDG: 0,
    sChargeBur: 0,
    stComSup: 0,
    avanceSalSup: 0,
    sAvec: 0,
    avanceSalBureau: 0,
    sSocial: 0,
    sEpargne: 0,
  })

  const {
    stEboueur,
    stChauffeur,
    sCarburant,
    sLogCharroi,
    sChargeAdmin,
    sDime,
    sDG,
    sChargeBur,
    stComSup,
    avanceSalSup,
    sAvec,
    avanceSalBureau,
    sSocial,
    sEpargne,
  } = values

  const dateSave = new Date().toISOString()
  const handleChange = (e) => {
    const { value, name } = e.target
    setValue({
      ...values,
      [name]: parseFloat(value),
    })
  }
  const subMit = () => {
    axios
      .post(`${lien_create}/depenses`, {
        values,
        dateSav: dateSave.split('T')[0],
      })
      .then((response) => {
        setMessage(response.data)
      })
      .finally(() => {
        setTimeout(() => {
          setMessage()
        }, 3000)
      })
  }
  const loadingDepense = async () => {
    axios.get(`${lien_read}/depenseJournalier/${dateSave}`).then((response) => {
      setValue({ ...response.data })
    })
  }
  useEffect(() => {
    loadingDepense()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return (
    <div>
      <Paper elevation={0} style={{ padding: '0px' }}>
        {message && (
          <Stack sx={{ marginBottom: '15px' }}>
            <Alert
              variant="filled"
              severity={message.error === false ? 'info' : 'warning'}
            >
              {message.message}
            </Alert>
          </Stack>
        )}

        <div className="container" style={{ marginTop: '15px' }}>
          <div
            style={{
              backgroundColor: 'black',
              color: 'white',
              padding: '2px',
              marginBottom: '10px',
              position: 'absolute',
              top: 2,
              right: 5,
              left: '17rem',
              borderRadius: '20px',
            }}
          >
            <p
              style={{
                fontSize: '12px',
                marginTop: '2px',
                textAlign: 'center',
              }}
            >
              - Les sorties seront enregistrées à la date d'aujourd'hui le{' '}
              {DateActuelle(new Date())}; - une fois dépasser, ces données ne
              seront plus modifiable
            </p>
          </div>
          <div className="row">
            <div className="col-md-4 col-sm-12 col-lg-4">
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                type="number"
                name="stEboueur"
                value={stEboueur}
                sx={{ marginBottom: '10px' }}
                fullWidth
                label="Sortie Transport Eboueur"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="stChauffeur"
                value={stChauffeur}
                type="number"
                fullWidth
                label="Sortie transport chauffeur"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="sCarburant"
                value={sCarburant}
                type="number"
                fullWidth
                label="Sortie carburant"
              />

              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="sLogCharroi"
                value={sLogCharroi}
                type="number"
                fullWidth
                label="Sortie Logistique et Charroi"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="sSocial"
                value={sSocial}
                type="number"
                fullWidth
                label="Sortie social"
              />
            </div>
            <div className="col-md-4 col-sm-12 col-lg-4">
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                name="sChargeAdmin"
                value={sChargeAdmin}
                type="number"
                sx={{ marginBottom: '10px' }}
                fullWidth
                label="Sortie Charges Admin"
              />

              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                type="number"
                name="sDime"
                value={sDime}
                sx={{ marginBottom: '10px' }}
                fullWidth
                label="Sortie Dime"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                type="number"
                sx={{ marginBottom: '10px' }}
                name="sDG"
                value={sDG}
                fullWidth
                label="Sortie DG"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="sChargeBur"
                value={sChargeBur}
                type="number"
                fullWidth
                label="Sortie charge Bur"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="sEpargne"
                value={sEpargne}
                type="number"
                fullWidth
                label="Sortie Epargne"
              />
            </div>
            <div className="col-md-4 col-sm-12 col-lg-4">
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="stComSup"
                value={stComSup}
                type="number"
                fullWidth
                label="Sortie Trans/Com sup"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="avanceSalSup"
                type="number"
                value={avanceSalSup}
                fullWidth
                label="Avance sur sal/SUP"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="sAvec"
                value={sAvec}
                type="number"
                fullWidth
                label="Sortie AVEC"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="avanceSalBureau"
                value={avanceSalBureau}
                type="number"
                fullWidth
                label="Avance/Salaire bureau"
              />
              <Button
                variant="contained"
                endIcon={<Add />}
                color="secondary"
                onClick={() => subMit()}
              >
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default Depenses
