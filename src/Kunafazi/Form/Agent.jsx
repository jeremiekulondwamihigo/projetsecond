import React, { useState } from 'react'
import { TextField, Button, Paper } from '@mui/material'
import { Add } from '@mui/icons-material'
import axios from 'axios'
import { Alert, Stack } from '@mui/material'
import SelectOption from 'Kunafazi/Static/Select'
import { lien_create } from 'Kunafazi/Static/Liens'

function Agent({ loading }) {
  const [message, setMessage] = useState()

  const id = new Date()

  const [nomAgent, setNomAgent] = useState()

  const fonction = [
    { id: 'superviseur', title: 'Superviseur' },
    { id: 'comptable', title: 'Comptable' },
    { id: 'coordonateur', title: 'Coordonateur' },
  ]
  const [valueFonction, setValueFonction] = useState(null)

  const submitAgent = () => {
    axios
      .post(`${lien_create}/agent`, {
        nom: nomAgent,
        fonction: valueFonction,
        id,
      })
      .then((response) => {
        setMessage(response.data)
        loading()
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

        <div className="container">
          <div className="row">
            <div className="col-md-12 col-sm-12 col-lg-12">
              <TextField
                autoComplete="off"
                onChange={(e) => setNomAgent(e.target.value)}
                type="text"
                name="nom"
                sx={{ marginBottom: '10px' }}
                fullWidth
                label="Nom complet"
                id="nom"
              />
              <SelectOption
                option={fonction}
                value={valueFonction}
                setValue={setValueFonction}
                title="Fonction de l'agent"
              />
              <div style={{ marginTop: '10px' }}>
                <Button
                  variant="contained"
                  endIcon={<Add />}
                  color="secondary"
                  onClick={() => submitAgent()}
                >
                  Enregistrer
                </Button>
              </div>
            </div>
          </div>
        </div>
      </Paper>
    </div>
  )
}

export default Agent
