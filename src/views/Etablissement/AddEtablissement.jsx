import React, { useState, useContext } from 'react'
import { Box, TextField, Button, Paper, Grid } from '@mui/material'
import { Add, Edit } from '@mui/icons-material'
import { lien_create } from 'Utils.jsx'
import axios from 'axios'
import Alert from '@mui/material/Alert'
import ProtoType from 'prop-types'
import { CreateContexte } from 'ContextAll.jsx'
import './style.css'
import jsCookie from 'js-cookie'

function AddEcole({ dataModifier }) {
  const { user } = useContext(CreateContexte)
  const { data } = user

  const [message, setMessage] = useState()
  const [messageCatch, setMessageCatch] = useState()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jsCookie.get('token'),
    },
  }
  const { code_province } = data[0]

  const id = new Date()

  const [etablissement, setEtablissement] = useState('')
  const [codeAgent, setCodeAgent] = useState('')

  const AddEcole = async (e) => {
    e.preventDefault()
    const response = await axios.post(
      `${lien_create}/addetablissement`,
      {
        etablissement,
        code_agent: codeAgent,
        code_province,
        id,
      },
      config,
    )
    console.log(response)

    if (response.data.catch === true) {
      setMessageCatch(response.data.message.keyPattern)
    } else {
      setMessage(response.data)
    }
  }

  return (
    <div>
      {message && (
        <Alert
          variant="filled"
          severity={message.error === false ? 'success' : 'error'}
        >
          {message.message}
        </Alert>
      )}
      <Box sx={{ width: '100%' }}>
        <Paper elevation={0} style={{ padding: '5px' }}>
          <Box
            container
            sx={{
              width: '100%',
              maxWidth: '100%',
              marginTop: '10px',
              marginBottom: '10px',
            }}
          >
            <Grid style={{ marginRight: '10px' }}>
              <div className="divForm">
                <TextField
                  className="textField"
                  onChange={(e) => setEtablissement(e.target.value)}
                  value={etablissement}
                  label="Etablissement"
                  name="etablissement"
                />
                {messageCatch?.etablissement ? (
                  <span className="Error___catch">
                    Le nom de l'établissement est obligatoire
                  </span>
                ) : null}
              </div>
              <div className="divForm">
                <TextField
                  className="textField"
                  value={codeAgent}
                  onChange={(e) => setCodeAgent(e.target.value)}
                  label="code agent"
                  name="code_agent"
                />
              </div>
            </Grid>
          </Box>
          <Button
            variant="contained"
            endIcon={dataModifier ? <Edit /> : <Add />}
            color={dataModifier ? 'secondary' : 'primary'}
            onClick={(e) => AddEcole(e)}
          >
            {dataModifier ? 'Modification' : 'Enregistrement'}
          </Button>
        </Paper>
      </Box>
    </div>
  )
}

AddEcole.ProtoType = {
  data: ProtoType.array.isRequired,
  message: ProtoType.any,
  messageCatch: ProtoType.any,
  config: ProtoType.object.isRequired,
  code_proved: ProtoType.string.isRequired,
  id: ProtoType.string.isRequired,
  etablissement: ProtoType.string,
  codeAgent: ProtoType.string,
  addDivision: ProtoType.func,
}
export default AddEcole
