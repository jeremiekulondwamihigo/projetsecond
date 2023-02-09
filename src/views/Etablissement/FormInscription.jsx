import React, { useState, useContext } from 'react'
import {
  Grid,
  TextField,
  Button,
  Stack,
  Alert,
  CircularProgress,
} from '@mui/material'
import Autocompletion from 'Controls/AutoComplete'
import axios from 'axios'
import ProtoType from 'prop-types'
import { CreateContexte } from 'ContextAll.jsx'
import BasicTabs from 'Controls/Tabs'
import { Person } from '@mui/icons-material'
import { lien_update } from 'Utils'
import jsCookie from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { addNewInscrit } from 'Redux/Inscription'

function FormInscription(props) {
  const { loadingEleve } = props
  const { user } = useContext(CreateContexte)
  const { data } = user
  const { codeEtablissement } = data[0]

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jsCookie.get('token'),
    },
  }

  const items = [
    {
      id: 7,
      title: '7eme CTB',
    },
    {
      id: 8,
      title: '8eme CTB',
    },
    {
      id: 1,
      title: 'Premiere',
    },
    {
      id: 2,
      title: 'Deuxieme',
    },
    {
      id: 3,
      title: 'Troisieme',
    },
    {
      id: 4,
      title: 'Quatrieme',
    },
  ]
  const [niveau, setNiveau] = useState('')
  const option = useSelector((state) => state.optionEtab.option)
  const [selectOption, setSelectOption] = useState('')

  const [codeInscription, setCodeInscription] = useState('')
  const id = new Date()
  const [message, setMessage] = useState()
  const dispatch = useDispatch()

  const postEleve = async (e) => {
    e.preventDefault()
    const data = {
      niveau: niveau.id,
      codeEtablissement,
      codeInscription,
      code_Option:
        niveau.id > 5 ? 'Education de Base' : selectOption.code_Option,
      id,
    }
    dispatch(addNewInscrit(data))
  }
  const eleveinscrit = useSelector((state) => state.inscrit)

  function Recruter() {
    return (
      <div style={{ width: '25rem' }}>
        {eleveinscrit.addNewInscrit === 'success' ? (
          <Alert severity="success">Enregistrement effectuer</Alert>
        ) : null}
        {eleveinscrit.addNewInscrit === 'rejected' ? (
          <Alert severity="error">{eleveinscrit.addNewInscritError}</Alert>
        ) : null}

        <Grid style={{ marginTop: '10px' }}>
          <div style={{ marginBottom: '15px' }}>
            <Autocompletion
              sx={{ marginBottom: '10px', width: '100%' }}
              value={niveau}
              setValue={setNiveau}
              options={items}
              title="Classe"
            />
          </div>
          <div style={{ marginBottom: '15px' }}>
            {niveau.id < 5 && (
              <Autocompletion
                sx={{ marginBottom: '10px' }}
                value={selectOption}
                setValue={setSelectOption}
                options={option}
                title="Séléctionner l'option"
              />
            )}
          </div>
          <div>
            <TextField
              sx={{ marginBottom: '10px' }}
              fullWidth
              value={codeInscription}
              id=""
              name="codeInscription"
              label="Code inscription"
              onChange={(e) => setCodeInscription(e.target.value)}
            />
          </div>

          <Button
            color="primary"
            variant="contained"
            style={{ width: '100%' }}
            onClick={(e) => postEleve(e)}
            disabled={eleveinscrit.addNewInscrit === 'pending' ? true : false}
          >
            {eleveinscrit.addNewInscrit === 'pending' ? (
              <CircularProgress
                size={24}
                color="info"
                style={{ marginRight: '10px' }}
              />
            ) : null}
            Inscrire
          </Button>
        </Grid>
      </div>
    )
  }
  const [codeEleveinscri, setCodeInsc] = useState('')

  const validExistant = () => {
    axios
      .put(
        `${lien_update}/existantinscription`,
        {
          codeEleve: codeEleveinscri,
          codeEtablissement,
          id,
        },
        config,
      )
      .then((response) => {
        setMessage(response.data)

        loadingEleve()
      })
  }

  function Existant() {
    return (
      <div style={{ width: '25rem' }}>
        <div>
          <TextField
            sx={{ marginBottom: '10px' }}
            fullWidth
            value={codeEleveinscri}
            id="i"
            name="reinscription"
            label="Code de l'élève"
            onChange={(e) => setCodeInsc(e.target.value)}
          />
        </div>

        <Button
          color="secondary"
          variant="contained"
          onClick={() => validExistant()}
          style={{ width: '100%' }}
        >
          Valider
        </Button>
      </div>
    )
  }
  const titres = [
    { id: 0, label: 'Recruter', icon: <Person /> },
    { id: 1, label: 'Existant', icon: <Person /> },
  ]
  const component = [
    { id: 0, component: Recruter() },
    { id: 1, component: Existant() },
  ]

  return (
    <>
      {message && (
        <Stack
          sx={{
            width: '100%',
            marginBottom: '15px',
          }}
          spacing={2}
        >
          <Alert
            variant="filled"
            severity={message.error === false ? 'success' : 'warning'}
          >
            {message.message}
          </Alert>
        </Stack>
      )}{' '}
      <BasicTabs titres={titres} components={component} />
    </>
  )
}

FormInscription.ProtoType = {
  config: ProtoType.object.isRequired,
  data: ProtoType.object.isRequired,
  codeEtablissement: ProtoType.string.isRequired,
  dataLog: ProtoType.object.isRequired,
  niveau: ProtoType.string,
  option: ProtoType.array,
  selectOption: ProtoType.string,
  readOptionEtablissement: ProtoType.func.isRequired,
  codeInscription: ProtoType.string,
  id: ProtoType.any.isRequired,
  postEleve: ProtoType.func.isRequired,
  items: ProtoType.array.isRequired,
}

export default React.memo(FormInscription)
