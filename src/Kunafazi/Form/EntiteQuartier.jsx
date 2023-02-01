import React, { useState } from 'react'
import Grouped from 'Kunafazi/Static/Grouped.jsx'
import { commune } from 'Kunafazi/Static/Object.jsx'
import { TextField, Button, Grid } from '@mui/material'
import axios from 'axios'
import { lien_create } from 'Kunafazi/Static/Liens'
import { Alert, Stack } from '@mui/material'
import { lien_read } from 'Kunafazi/Static/Liens'
import { useEffect } from 'react'
import AutoComplement from 'Kunafazi/Static/Grouped'
import { lien_update } from 'Kunafazi/Static/Liens'

export default function AjouterQuartier(props) {
  const { quartierProps, load } = props
  const [valeur, setValeur] = useState('')
  const [communeHook, setCommune] = useState('')
  const today = new Date().toISOString()
  const [responseMessage, setMessage] = useState()
  const [agentSelect, setAgentSelect] = useState('')
  const addQuartier = () => {
    axios
      .post(`${lien_create}/quartier`, {
        commune: communeHook.title,
        quartier: valeur,
        id: today,
        superviseur: agentSelect.codeAgent,
      })
      .then((res) => {
        load()
        setMessage(res.data)
      })
  }
  const updateQuartier = () => {
    axios
      .put(`${lien_update}/quartier`, {
        commune: communeHook.title,
        quartier: valeur,
        id: quartierProps._id,
        superviseur: agentSelect.codeAgent,
      })
      .then((res) => {
        load()
        setMessage(res.data)
      })
  }
  const [listeAgent, setListeAgent] = useState()
  const loadingAgent = async () => {
    const response = await axios.get(`${lien_read}/agent`)
    setListeAgent(response.data)
  }
  useEffect(() => {
    loadingAgent()
  }, [])

  useEffect(() => {
    if (quartierProps) {
      setCommune({ id: 1, title: quartierProps.commune })
      setValeur(quartierProps.quartier)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [quartierProps])

  return (
    <div>
      {responseMessage && (
        <Stack sx={{ marginBottom: '15px' }}>
          <Alert
            variant="filled"
            severity={responseMessage.error ? 'warning' : 'info'}
          >
            {responseMessage.message}
          </Alert>
        </Stack>
      )}
      <Grid mb={1}>
        <Grouped
          options={commune}
          value={communeHook}
          setValue={setCommune}
          title="Commune"
        />
      </Grid>
      <Grid mb={1}>
        <TextField
          type="text"
          name="quartier"
          label="Quartier"
          value={valeur}
          fullWidth
          onChange={(e) => setValeur(e.target.value)}
        />
      </Grid>
      <Grid mb={1}>
        {listeAgent && (
          <AutoComplement
            value={agentSelect}
            setValue={setAgentSelect}
            options={listeAgent}
            title="Selectionnez un superviseur"
          />
        )}
      </Grid>
      <Button
        variant="contained"
        color="info"
        fullWidth
        onClick={!quartierProps ? () => addQuartier() : () => updateQuartier()}
      >
        {quartierProps ? 'Modifier' : 'Enregistrer'}
      </Button>
    </div>
  )
}
