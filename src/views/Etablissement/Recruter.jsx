import React, { useState, useContext } from 'react'
import { TextField, Button, Paper } from '@mui/material'
import { Add } from '@mui/icons-material'
import { lien_create } from 'Utils.jsx'
import axios from 'axios'
import { Alert, Stack } from '@mui/material'
import DatePickers from 'Controls/DatePicker'
import prototype from 'prop-types'
import { CreateContexte } from 'ContextAll.jsx'
import SelectOption from 'Controls/Select'
import jsCookie from 'js-cookie'

function Recruter(props) {
  const { user } = useContext(CreateContexte)
  const { data } = user

  const [message, setMessage] = useState()

  const today = new Date()

  const gender = [
    {
      id: 'M',
      title: 'Masculin',
    },
    {
      id: 'F',
      title: 'Féminin',
    },
  ]

  const [valueGender, setValueGender] = useState('')

  const [dateNaissance, setDateNaissance] = useState(null)

  const [values, setValue] = useState({
    code_tuteur: '',
    nom: '',
    postNom: '',
    prenom: '',
    lieu_naissance: '',
    nationalite: '',
    nomMere: '',
    professionMere: '',
    nomPere: '',
    professionPere: '',
  })

  const {
    code_tuteur,
    nom,
    postNom,
    prenom,
    lieu_naissance,
    nationalite,
    nomMere,
    professionMere,
    nomPere,
    professionPere,
  } = values

  const handleChange = (e) => {
    const { value, name } = e.target
    setValue({
      ...values,
      [name]: value,
    })
  }

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jsCookie.get('token'),
    },
  }
  const handleSave = () => {
    axios
      .post(
        `${lien_create}/eleve`,
        {
          id: today,
          code_tuteur,
          nom,
          postNom,
          prenom,
          date_Naissance: dateNaissance,
          lieu_naissance,
          genre: valueGender,
          agentSave: data[0].codeEtablissement,
          nationalite,
          nomMere,
          professionMere,
          nomPere,
          professionPere,
        },
        config,
      )
      .then((response) => {
        console.log(response)
        setMessage(response.data)
      })
  }

  return (
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
            className="col-md-6 col-sm-12 col-lg-6">
            <TextField
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              type="text"
              value={nom}
              name="nom"
              sx={{ marginBottom: '10px', width: '100%' }}
              fullWidth
              label="Entrez le nom *"
              id="nom"
            />
            <TextField
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              value={postNom}
              sx={{ marginBottom: '10px' }}
              name="postNom"
              fullWidth
              label="Entrez le Post-nom *"
            />
            <TextField
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              value={prenom}
              sx={{ marginBottom: '10px' }}
              name="prenom"
              fullWidth
              label="Entrez le Prénom *"
            />
            <TextField
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              value={lieu_naissance}
              sx={{ marginBottom: '10px' }}
              name="lieu_naissance"
              fullWidth
              label="Lieu de naissance*"
            />
            <DatePickers
              value={dateNaissance}
              forma="dd/mm/yyyy"
              setValue={setDateNaissance}
              label="Entrez la date de naissance*"
            />
            <div style={{ marginBottom: '12px' }}>
              <SelectOption
                value={valueGender}
                setValue={setValueGender}
                option={gender}
                title="Genre *"
              />
            </div>
          </div>
          <div className="col-md-6 col-sm-12 col-lg-6">
            <TextField
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              value={nationalite}
              name="nationalite"
              sx={{ marginBottom: '10px' }}
              fullWidth
              label="Nationalité *"
            />
            <TextField
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              type="text"
              value={nomPere}
              name="nomPere"
              sx={{ marginBottom: '10px' }}
              fullWidth
              label="Entrer le nom du père"
            />
            <TextField
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              type="text"
              value={professionPere}
              name="professionPere"
              sx={{ marginBottom: '10px' }}
              fullWidth
              label="Profession du père"
            />
            <TextField
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              value={nomMere}
              sx={{ marginBottom: '10px' }}
              name="nomMere"
              fullWidth
              label="Entrez le nom de la mère"
            />
            <TextField
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              value={professionMere}
              sx={{ marginBottom: '10px' }}
              name="professionMere"
              fullWidth
              label="Profession de la mère"
            />

            <TextField
              autoComplete="off"
              onChange={(e) => handleChange(e)}
              value={code_tuteur}
              name="code_tuteur"
              sx={{ marginBottom: '10px' }}
              fullWidth
              label="Entrez le code du tuteur"
            />
            <div style={{ marginTop: '15px' }}>
              <Button
                onClick={(e) => handleSave(e)}
                variant="contained"
                endIcon={<Add />}
                color="secondary"
              >
                Enregistrer
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Paper>
  )
}

Recruter.prototype = {
  Autocompletion: prototype.node.isRequired,
  DatePickers: prototype.node.isRequired,
  dataLog: prototype.object.isRequired,
  fechAgent: prototype.func.isRequired,
  data: prototype.array,
  message: prototype.any,
  config: prototype.object.isRequired,
  today: prototype.string.isRequired,
  gender: prototype.array.isRequired,
  valueGender: prototype.object.isRequired,
  dateNaissance: prototype.any,
  value: prototype.object.isRequired,
  code_tuteur: prototype.string.isRequired,
  nom: prototype.string.isRequired,
  lieu_naissance: prototype.string.isRequired,
  handleChange: prototype.func.isRequired,
  handleSave: prototype.func.isRequired,
}
export default Recruter
