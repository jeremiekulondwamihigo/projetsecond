import React, { useState, useEffect } from 'react'
import { TextField, Button, Paper } from '@mui/material'
import { Add } from '@mui/icons-material'
import axios from 'axios'
import { Alert, Stack } from '@mui/material'
import SelectOption from 'Kunafazi/Static/Select'
import { lien_create, lien_read } from 'Kunafazi/Static/Liens'
import AutoComplement from 'Kunafazi/Static/Grouped'

function CreateLogin() {
  const [message, setMessage] = useState()
  const [agentSelect, setAgentSelect] = useState('')
  const [values, setValue] = useState()
  const handleChange = (e) => {
    const { name, value } = e.target
    setValue({
      ...values,
      [name]: value,
    })
  }

  const id = new Date().toISOString()

  const fonction = [
    { id: 'admin', title: 'Administrateur' },
    { id: 'comptable', title: 'Comptable' },
    { id: 'coordonateur', title: 'Coordonateur' },
  ]
  const [valueFonction, setValueFonction] = useState(null)

  const submit = () => {
    if (values.password !== values.passwordRepeat) {
      setMessage({
        error: true,
        message: 'Mot de passe non semblable',
      })
    } else {
      axios
        .post(`${lien_create}/createLogin`, {
          value: values,
          id,
          fonction: valueFonction,
          agentUser: agentSelect,
        })
        .then((response) => {
          setMessage(response.data)
        })
    }
  }
  const [listeAgent, setListeAgent] = useState()
  const loadingAgent = async () => {
    const response = await axios.get(`${lien_read}/agent`)
    setListeAgent(response.data)
  }
  useEffect(() => {
    loadingAgent()
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
            <div
              className="col-md-12 col-sm-12 col-lg-12"
              style={{ margin: '10px' }}
            >
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                type="text"
                name="username"
                sx={{ marginBottom: '10px' }}
                fullWidth
                label="Nom d'utilisateur"
                id="username"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                type="password"
                name="password"
                sx={{ marginBottom: '10px' }}
                fullWidth
                label="Mot de passe"
                id="password"
              />
              <TextField
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                type="password"
                name="passwordRepeat"
                sx={{ marginBottom: '10px' }}
                fullWidth
                label="Repeter le mot de passe"
                id="passwordRepeat"
              />
              <SelectOption
                option={fonction}
                value={valueFonction}
                setValue={setValueFonction}
                title="Fonction de l'agent"
              />
              <div style={{ marginTop: '10px' }}>
                {listeAgent && (
                  <AutoComplement
                    value={agentSelect}
                    setValue={setAgentSelect}
                    options={listeAgent}
                    title="Selectionnez l'agent utilisateur"
                  />
                )}
              </div>
              <div style={{ marginTop: '10px' }}>
                <Button
                  variant="contained"
                  endIcon={<Add />}
                  color="secondary"
                  onClick={() => submit()}
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

export default CreateLogin
