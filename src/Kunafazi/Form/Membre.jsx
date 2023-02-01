import React, { useState } from 'react'
import { TextField, Button, Paper } from '@mui/material'
import { Add } from '@mui/icons-material'
import { lien_create, lien_read } from 'Kunafazi/Static/Liens'
import axios from 'axios'
import { Alert, Stack } from '@mui/material'
import { useEffect } from 'react'
import AutoComplement from 'Kunafazi/Static/Grouped'

function Membre({ loadingClient }) {
  const [message, setMessage] = useState()

  const today = new Date()

  const [quartierSelect, setQuartierSelect] = useState('')
  const [avenueSelect, setAvenueSelect] = useState('')
  const [quartier, setQuartier] = useState()

  const [values, setValue] = useState()

  const handleChange = (e) => {
    const { value, name } = e.target
    setValue({
      ...values,
      [name]: value,
    })
  }

  const handleSave = async (e) => {
    e.preventDefault()
    const response = await axios.post(`${lien_create}/membre`, {
      id: today,
      values,
      quartier: quartierSelect._id,
      avenue: avenueSelect._id,
    })
    loadingClient()
    setMessage(response.data)
  }
  const loading = () => {
    axios.get(`${lien_read}/quartier`).then((res) => {
      setQuartier(res.data)
    })
  }
  useEffect(() => {
    loading()
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

        <div className="container">
          <div className="row">
            <div className="col-md-6 col-sm-12 col-lg-6">
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                type="text"
                name="enseigne"
                sx={{ marginBottom: '10px' }}
                fullWidth
                label="Enseigne"
                id="enseigne"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="types"
                fullWidth
                label="Entrez le Type"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="responsable"
                fullWidth
                label="Entrez le nom du responsable"
              />
              <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                {quartier && (
                  <AutoComplement
                    options={quartier}
                    value={quartierSelect}
                    setValue={setQuartierSelect}
                    title="Quartier"
                  />
                )}
              </div>
              <div style={{ marginTop: '10px', marginBottom: '10px' }}>
                {quartierSelect && (
                  <AutoComplement
                    options={quartierSelect.avenues}
                    value={avenueSelect}
                    setValue={setAvenueSelect}
                    title="Avenue"
                  />
                )}
              </div>
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="autreAdresse"
                fullWidth
                label="Autres adresses"
              />
            </div>
            <div className="col-md-6 col-sm-12 col-lg-6">
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                name="telephone_one"
                sx={{ marginBottom: '10px' }}
                fullWidth
                label="Téléphone one"
              />

              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                type="number"
                name="tarif"
                sx={{ marginBottom: '10px' }}
                fullWidth
                label="Tarif"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                type="number"
                sx={{ marginBottom: '10px' }}
                name="frequence"
                fullWidth
                label="Frequence"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                sx={{ marginBottom: '10px' }}
                name="codeContrat"
                fullWidth
                label="Code contrat"
              />
            </div>
          </div>
        </div>

        <Button
          onClick={(e) => handleSave(e)}
          variant="contained"
          endIcon={<Add />}
          color="secondary"
        >
          Enregistrer
        </Button>
      </Paper>
    </div>
  )
}

export default Membre
