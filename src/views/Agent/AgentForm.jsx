import React, { useEffect, useState, useContext } from 'react'
import { InputText } from 'primereact/inputtext'
import { lien_create, lien_read } from 'Utils'
import axios from 'axios'
import { Row, Col } from 'reactstrap'
import './style.css'
import { Button } from '@mui/material'
import { CreateContexte } from 'ContextAll.jsx'
import { TextField } from '@mui/material'
import Alert from '@mui/material/Alert'
import { isEmpty } from 'Utils'
import AutoComplement from 'Controls/AutoComplete.jsx'
import SelectOption from 'Controls/Select.jsx'
import jsCookie from 'js-cookie'

function AddAgent(props) {
  const { read_All_Agent } = props
  const { user } = useContext(CreateContexte)
  const formulaire = [
    {
      id: 'nom',
      title: 'Nom',
      name: 'nom',
      focus: true,
      type: 'text',
    },
    {
      id: 'postnom',
      title: 'Postnom',
      name: 'postnom',
      type: 'text',
    },
    {
      id: 'prenom',
      title: 'Prenom',
      name: 'prenom',
      type: 'text',
    },
    { id: 'matricule', title: 'Matricule', name: 'matricule', type: 'text' },
    {
      id: 'dateNaissance',
      title: 'Date de naissance',
      name: 'dateNaissance',
      type: 'date',
    },
    {
      id: 'nationalite',
      title: 'Nationalité',
      name: 'nationalite',
      type: 'text',
    },
    {
      id: 'telephone',
      title: 'Telephone',
      name: 'telephone',
      type: 'text',
    },

    {
      id: 'dateEngagement',
      title: "Date d'engagement",
      name: 'dateEngagement',
      type: 'date',
    },
  ]

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jsCookie.get('token'),
    },
  }

  const [domaine, setDomaine] = useState()
  const loadDomaine = async () => {
    const response = await axios.get(`${lien_read}/domaine`, config)
    setDomaine(response.data)
  }
  useEffect(() => {
    loadDomaine()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  const [domaineSelect, setDomaineSelect] = useState('')

  const [genre, setGenre] = useState('')
  const sexe = [
    { id: 1, title: 'Masculin', value: 'M' },
    { id: 2, title: 'Féminin', value: 'F' },
  ]
  const [initialeValue, setInitialeValue] = useState()
  const [message, setMessage] = useState()
  const handleChange = (e) => {
    const { name, value } = e.target
    setMessage()
    setInitialeValue({
      ...initialeValue,
      [name]: value,
    })
  }

  const id = new Date()

  const onSubmit = (e) => {
    e.preventDefault()
    if (isEmpty(domaineSelect)) {
      setMessage({ error: true, message: 'Veuillez selectionner le domaine' })
    } else {
      axios
        .post(
          `${lien_create}/agent`,
          {
            initialeValue,
            genre,
            agent_save: user.data[0].code_province,
            id,
            codeDomaine: domaineSelect.codeDomaine,
            fonction: 'enseignant',
          },
          config,
        )
        .then((response) => {
          setMessage(response.data)
        })
        .finally(() => {
          read_All_Agent()
        })
    }
  }

  return (
    <form className="p-fluid">
      <div style={{ margin: '20px' }}>
        {message && (
          <Alert severity={message.error ? 'error' : 'success'}>
            {message.message}
          </Alert>
        )}
      </div>
      <Row>
        {formulaire.map((index, key) => {
          return (
            <Col lg="6" md="6" sm="12" key={key}>
              <div
                className="field"
                style={{ marginTop: '15px' }}
                key={index.id}
              >
                <span className="p-float-label">
                  {index.type === 'date' ? (
                    <TextField
                      id="date"
                      label={index.title}
                      type="date"
                      onChange={(e) => handleChange(e)}
                      defaultValue={new Date().toISOString().split('T')[0]}
                      style={{ width: '100%' }}
                      InputLabelProps={{
                        shrink: true,
                      }}
                    />
                  ) : (
                    <InputText
                      id={index.name}
                      name={index.name}
                      style={{ width: '100%' }}
                      type={index.type}
                      autoFocus={index.focus}
                      onChange={(e) => handleChange(e)}
                    />
                  )}

                  <label htmlFor={index.id}>{index.title}</label>
                </span>
              </div>
            </Col>
          )
        })}
      </Row>
      <Row>
        <Col lg="6" md="6" sm="12">
          <div className="field">
            {domaine && (
              <AutoComplement
                value={domaineSelect}
                setValue={setDomaineSelect}
                options={domaine}
                title="Selectionnez le domaine"
              />
            )}
          </div>
          <div style={{ marginTop: '20px' }}>
            <Button
              onClick={(e) => onSubmit(e)}
              color="primary"
              variant="contained"
            >
              Enregistrer
            </Button>
          </div>
        </Col>
        <Col lg="6" md="6" sm="12">
          <div style={{ marginTop: '15px' }}>
            <SelectOption
              option={sexe}
              value={genre}
              setValue={setGenre}
              title="Selectionnez le genre"
            />
          </div>
        </Col>
      </Row>
    </form>
  )
}

export default AddAgent
