import React, { useEffect, useState, useContext } from 'react'
import { Grid, TextField, Button, Stack, Alert } from '@mui/material'
import Autocompletion from 'Controls/AutoComplete'
import axios from 'axios'
import { lien_create, lien_read } from 'Utils.jsx'
import ProtoType from 'prop-types'
import { CreateContexte } from 'ContextAll.jsx'
import BasicTabs from 'Controls/Tabs'
import { Person } from '@mui/icons-material'
import { lien_update } from 'Utils'
import jsCookie from 'js-cookie'

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
  const [option, setOption] = useState([])
  const [selectOption, setSelectOption] = useState('')
  console.log(option)

  const readOptionEtablissement = async () => {
    const response = await axios.get(
      `${lien_read}/optionEtablissement/${data[0].codeEtablissement}`,
      config,
    )
    setOption(response.data)
  }
  useEffect(() => {
    readOptionEtablissement()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeEtablissement])

  const [codeInscription, setCodeInscription] = useState('')
  const id = new Date()
  const [message, setMessage] = useState()

  const postEleve = async (e) => {
    e.preventDefault()
    const response = await axios.post(
      `${lien_create}/inscription`,
      {
        niveau: niveau.id,
        codeEtablissement,
        codeInscription,
        code_Option:
          niveau.id > 5 ? 'Education de Base' : selectOption.code_Option,
        id,
      },
      config,
    )
    loadingEleve()
    setMessage(response.data)
  }

  function Recruter() {
    return (
      <div>
        <div>
          <Grid style={{ marginRight: '10px' }}>
            <div style={{ marginBottom: '15px' }}>
              <Autocompletion
                sx={{ marginBottom: '10px' }}
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
            >
              Inscrire
            </Button>
          </Grid>
        </div>
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
      <div>
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
