import React, { useState, useEffect } from 'react'
import Grouped from 'Kunafazi/Static/Grouped.jsx'
import axios from 'axios'
import { lien_create, lien_read } from 'Kunafazi/Static/Liens.jsx'
import { Alert, Stack } from '@mui/material'
import { TextField, Button, Grid } from '@mui/material'

export default function Entite() {
  const [quartierHook, setQuartierHook] = useState('')
  const [avenueHook, setAvenue] = useState()
  const id = new Date()
  const [responseMessage, setResponseMessage] = useState()
  const [quartierState, setQuartier] = useState()

  const loadingAvenue = () => {
    axios.get(`${lien_read}/quartier`).then((res) => {
      setQuartier(res.data)
    })
  }
  useEffect(() => {
    loadingAvenue()
  }, [])

  const addForm = () => {
    const data = {
      _idquartier: quartierHook._id,
      avenue: avenueHook,
      id,
    }
    axios.post(`${lien_create}/avenue`, data).then((response) => {
      setResponseMessage(response.data)
    })
  }

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
          required="on"
          options={quartierState}
          value={quartierHook}
          setValue={setQuartierHook}
          labelProps="Quartier"
        />
      </Grid>

      <Grid mb={1}>
        <TextField
          type="text"
          name="types"
          label="Avenue"
          fullWidth
          onChange={(e) => setAvenue(e.target.value)}
        />
      </Grid>
      <Button
        variant="contained"
        color="info"
        fullWidth
        onClick={(e) => addForm()}
      >
        Avenue
      </Button>
    </div>
  )
}
