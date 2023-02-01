import React, { useState } from 'react'
import { Box, TextField, Button, Paper, Grid } from '@mui/material'
import { Add } from '@mui/icons-material'
import axios from 'axios'
import { Alert, Stack } from '@mui/material'
import { lien_create } from 'Utils.jsx'
import { useEffect } from 'react'

function Image({ concerner, loading }) {
  const [messageE, setMessage] = useState({ message: '', error: Boolean })
  const { message, error } = messageE

  const [file, setImage] = useState()

  const handleForm = (e) => {
    e.preventDefault()
    const datas = new FormData()
    datas.append('file', file)
    datas.append('action', 'agent')
    datas.append('code_agent', concerner)

    axios.put(`${lien_create}/image`, datas).then((response) => {
      loading()
      setMessage(response.data)
    })
  }
  useEffect(() => {
    setMessage({ message: '', error: Boolean })
    setImage()
  }, [concerner])

  return (
    <div>
      {message && (
        <Stack sx={{ width: '100%' }} spacing={2}>
          <Alert
            variant="filled"
            severity={error === false ? 'success' : 'info'}
          >
            {message}
          </Alert>
        </Stack>
      )}
      <Paper elevation={0} style={{ padding: '20px' }}>
        <Box
          sx={{
            width: '100%',
            maxWidth: '100%',
            marginTop: '10px',
            marginBottom: '10px',
            display: 'flex',
          }}
        >
          <Grid>
            <TextField
              onChange={(event) => {
                const file = event.target.files[0]
                setImage(file)
              }}
              fullWidth
              type="file"
              label="Image"
              q
              id="file"
            />
          </Grid>
        </Box>
        <Button
          variant="contained"
          endIcon={<Add />}
          onClick={(e) => handleForm(e)}
          color="primary"
        >
          Enregistrer
        </Button>
      </Paper>
    </div>
  )
}

export default Image
