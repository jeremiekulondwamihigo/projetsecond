import {
  lien_read,
  Loading,
  isEmpty,
  Converter_Month,
} from 'Kunafazi/Static/Liens'
import React, { useState } from 'react'
import AutoComplement from 'Kunafazi/Static/Grouped'
import { TextField, Button } from '@mui/material'
import { Add } from '@mui/icons-material'
import axios from 'axios'
import { lien_create } from 'Kunafazi/Static/Liens'
import { Alert, Stack } from '@mui/material'
import { Skeleton } from '@mui/material'
import TableVersement from 'Kunafazi/Control/TableVersement'
import { useEffect } from 'react'

function Versement() {
  const [items, loading] = Loading(`${lien_read}/quartier`)
  const [value, setValues] = useState('')
  const id = new Date().toISOString()
  const [montant, setMontant] = useState()
  const [message, setMessage] = useState()
  const [submited, setSubmited] = useState(false)

  const [item, setItems] = useState()
  const loadingItems = async () => {
    const response = await axios.get(`${lien_read}/versement`)
    setItems(response.data)
  }
  useEffect(() => {
    loadingItems()
  }, [])

  let [information, setInformation] = useState()
  const loadingInformation = async () => {
    const response = await axios.get(
      `${lien_read}/financequartier/${value._id}`,
    )
    setInformation(response.data)
  }
  useEffect(() => {
    if (!isEmpty(value)) {
      loadingInformation()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value])
  const submit = (e) => {
    e.preventDefault()
    setSubmited(true)
    if (isEmpty(value.superviseur)) {
      setMessage({
        message: 'Veuillez renseigner le superviseur',
        error: true,
      })
      setSubmited(false)
    } else {
      axios
        .post(`${lien_create}/versement`, {
          idQuartier: value._id,
          dateVersement: id.split('T')[0],
          id: id,
          montant: montant,
          codeAgent: value.superviseur[0].codeAgent,
        })
        .then((response) => {
          setMessage(response.data)
        })
        .finally(() => {
          loadingItems()
          loadingInformation()
          setSubmited(false)
        })
    }
  }

  return (
    <div className="container">
      <div className="row">
        <div className="col-md-6 col-lg-6 col-sm-12">
          {message && (
            <Stack sx={{ marginBottom: '15px' }}>
              <Alert
                variant="filled"
                severity={message.error ? 'warning' : 'info'}
              >
                {message.message}
              </Alert>
            </Stack>
          )}
          {!loading && !isEmpty(items) && (
            <AutoComplement
              value={value}
              setValue={setValues}
              options={items}
              title="Selectionnez le quartier"
            />
          )}
          <TextField
            autoComplete="off"
            type="number"
            sx={{ marginTop: '10px', marginBottom: '15px' }}
            name="montant"
            onChange={(e) => setMontant(e.target.value)}
            fullWidth
            label="Montant"
          />
          <Button
            variant="contained"
            endIcon={<Add />}
            color="secondary"
            disabled={submited}
            onClick={(e) => submit(e)}
          >
            Enregistrer
          </Button>
        </div>
        <div className="col-md-6 col-lg-6 col-sm-12">
          <div
            style={{
              width: '100%',
              backgroundColor: 'black',
              height: '40px',
              color: 'white',
              fontWeight: 'bolder',
              textAlign: 'center',
            }}
          >
            <p>
              Mois de {Converter_Month(new Date().getMonth())}{' '}
              {new Date().getFullYear()}
            </p>
          </div>
          <div style={{ display: 'flex' }}>
            <div style={{ marginRight: '20px', width: '45%' }}>
              <p>
                {' '}
                {!isEmpty(value) ? (
                  'Superviseur'
                ) : (
                  <Skeleton animation="wave" />
                )}{' '}
              </p>
              <p>
                {!isEmpty(value) ? 'Poids fin' : <Skeleton animation="wave" />}{' '}
              </p>
              <p>
                {!isEmpty(value) ? (
                  'Montant à recouvrer '
                ) : (
                  <Skeleton animation="wave" />
                )}{' '}
              </p>
              <p>
                {!isEmpty(value) ? (
                  'Montant déjà recouvrer'
                ) : (
                  <Skeleton animation="wave" />
                )}{' '}
              </p>
            </div>
            <div style={{ width: '50%', marginTop: 0 }}>
              <p>
                {' '}
                {!isEmpty(value) && !isEmpty(value.superviseur) ? (
                  value.superviseur[0].nom
                ) : (
                  <Skeleton animation="wave" />
                )}
              </p>
              <p>
                {!isEmpty(information) ? (
                  information[0].client.length + ' Client(s)'
                ) : (
                  <Skeleton animation="wave" />
                )}
              </p>
              <p>
                {!isEmpty(value) && !isEmpty(information) ? (
                  information[0].arecouvrer + '$'
                ) : (
                  <Skeleton animation="wave" />
                )}
              </p>
              <p>
                {!isEmpty(value) && !isEmpty(information) ? (
                  information[0].dejaRecouvrer + '$'
                ) : (
                  <Skeleton animation="wave" />
                )}
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <TableVersement items={item} />
      </div>
    </div>
  )
}

export default Versement
