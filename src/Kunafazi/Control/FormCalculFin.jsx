import React, { useEffect, useState } from 'react'
import { TextField, Button, Paper } from '@mui/material'
import { Add } from '@mui/icons-material'
import { lien_read } from 'Kunafazi/Static/Liens'
import axios from 'axios'
import { Alert, Stack } from '@mui/material'
import { lien_update } from 'Kunafazi/Static/Liens'

function FormCalculFin({ quartier }) {
  const [message, setMessage] = useState()
  const { _id } = quartier

  const [DataCalcul, setDataCalcul] = useState()

  const loading = async () => {
    const response = await axios.get(`${lien_read}/calculOne/${_id}`)
    setDataCalcul(response.data)
  }
  useEffect(() => {
    loading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [_id])

  const [values, setValue] = useState({
    carburant: 0,
    chauffeur: 0,
    eboueur: 0,
    superviseur: 0,
    salairebureau: 0,
    logcharroi: 0,
    chargeadmin: 0,
    dime: 0,
    dg: 0,
    epargne: 0,
    social: 0,
    transportCom: 0,
  })
  const {
    carburant,
    chauffeur,
    eboueur,
    superviseur,
    salairebureau,
    logcharroi,
    chargeadmin,
    dime,
    dg,
    epargne,
    social,
    transportCom,
  } = values

  useEffect(() => {
    setValue({ ...DataCalcul })
  }, [DataCalcul, _id])

  const handleChange = (e) => {
    const { value, name } = e.target
    setValue({
      ...values,
      [name]: parseFloat(value),
    })
  }

  const submit = () => {
    axios
      .put(`${lien_update}/calculfin`, {
        valeur: values,
        _idQuartier: _id,
      })
      .then((response) => {
        setMessage(response.data)
      })
  }

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
          <div className="row">
            <div className="col-md-4 col-sm-12 col-lg-4">
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                type="number"
                name="carburant"
                value={carburant}
                sx={{ marginBottom: '10px' }}
                fullWidth
                label="% Carburant"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="chauffeur"
                value={chauffeur}
                type="number"
                fullWidth
                label="% Chauffeur"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="eboueur"
                value={eboueur}
                type="number"
                fullWidth
                label="% Eboueur"
              />

              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="superviseur"
                value={superviseur}
                type="number"
                fullWidth
                label="% Superviseur"
              />
              <Button
                variant="contained"
                endIcon={<Add />}
                color="secondary"
                onClick={() => submit()}
              >
                Enregistrer
              </Button>
            </div>
            <div className="col-md-4 col-sm-12 col-lg-4">
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                name="salairebureau"
                value={salairebureau}
                type="number"
                sx={{ marginBottom: '10px' }}
                fullWidth
                label="% Salaire bureau"
              />

              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                type="number"
                name="logcharroi"
                value={logcharroi}
                sx={{ marginBottom: '10px' }}
                fullWidth
                label="% Logistique et charroi"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                type="number"
                sx={{ marginBottom: '10px' }}
                name="chargeadmin"
                value={chargeadmin}
                fullWidth
                label="% Charges Admin"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="dime"
                value={dime}
                type="number"
                fullWidth
                label="% Dime"
              />
            </div>
            <div className="col-md-4 col-sm-12 col-lg-4">
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="dg"
                value={dg}
                type="number"
                fullWidth
                label="% DG"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="epargne"
                type="number"
                value={epargne}
                fullWidth
                label="% Epargne"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="social"
                value={social}
                type="number"
                fullWidth
                label="% Social"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="transportCom"
                value={transportCom}
                type="number"
                fullWidth
                label="% Transport & Com"
              />
            </div>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default FormCalculFin
