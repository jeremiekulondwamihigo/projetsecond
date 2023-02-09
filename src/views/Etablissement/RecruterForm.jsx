import React, { useState, useContext } from 'react'
import { TextField, Button, Paper } from '@mui/material'
import { Add, Edit } from '@mui/icons-material'
import { Alert } from '@mui/material'
import DatePickers from 'Controls/DatePicker'
import prototype from 'prop-types'
import { CreateContexte } from 'ContextAll.jsx'
import SelectOption from 'Controls/Select'
import { useEffect } from 'react'
import { isEmpty } from 'Utils'
import { useDispatch, useSelector } from 'react-redux'
import { addElevePremiere } from 'Redux/Recruter'
import { CircularProgress } from '@mui/material'
import { modifierInfo } from 'Redux/Recruter'

function Recruter(props) {
  const { dataUpdate } = props
  const { user } = useContext(CreateContexte)
  const { data } = user
  const dispatch = useDispatch()
  const eleveState = useSelector((state) => state.recru)

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

  const handleSave = () => {
    let donner = {
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
    }
    if (dataUpdate) {
      let donner = { id: dataUpdate._id, data: values }
      dispatch(modifierInfo(donner))
    } else {
      dispatch(addElevePremiere(donner))
    }
  }

  useEffect(() => {
    if (!isEmpty(dataUpdate)) {
      setValue({ ...values, ...dataUpdate })
      setValueGender(...dataUpdate.genre)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dataUpdate])

  return (
    <Paper elevation={0} style={{ padding: '0px' }}>
      {eleveState.addNewRecru === 'rejected' ? (
        <Alert severity="error">{eleveState.addNewRecruError}</Alert>
      ) : null}
      {eleveState.addNewRecru === 'success' ? (
        <Alert severity="success">Enregistrement effectué</Alert>
      ) : null}
      {eleveState.updateRecru === 'rejected' ? (
        <Alert severity="error">{eleveState.updateRecruError}</Alert>
      ) : null}
      {eleveState.updateRecru === 'success' ? (
        <Alert severity="success">Modification effectuée</Alert>
      ) : null}

      <div className="container" style={{ marginTop: '15px' }}>
        <div className="row">
          <div className="col-md-6 col-sm-12 col-lg-6">
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
              format="dd/mm/yyyy"
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
                endIcon={dataUpdate ? <Edit /> : <Add />}
                color={dataUpdate ? 'secondary' : 'primary'}
              >
                {eleveState.addNewRecru === 'pending' ||
                eleveState.updateRecru === 'pending' ? (
                  <CircularProgress size={24} color="info" />
                ) : dataUpdate ? (
                  'Modifier'
                ) : (
                  'Enregistrer'
                )}
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
