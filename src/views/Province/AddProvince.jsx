import React, { useState } from 'react'
import ButtonDemo from 'Controls/Button'
import { lien_create } from 'Utils'
import axios from 'axios'
import { TextField } from '@mui/material'
import { Alert, Stack } from '@mui/material'

function AddProvince() {
  const formulaire = [
    {
      id: 'code_province',
      title: 'Code Province',
      name: 'code_province',
      focus: true,
    },
    { id: 'code_agent', title: 'Code Agent responsable', name: 'code_agent' },
    { id: 'denomination', title: 'Dénomination', name: 'denomination' },
  ]

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }
  const [initialeValue, setInitialeValue] = useState()
  const handleChange = (e) => {
    const { name, value } = e.target
    setInitialeValue({
      ...initialeValue,
      [name]: value,
    })
  }
  const id = new Date()
  const [message, setMessage] = useState()
  const onSubmit = (e) => {
    e.preventDefault()
    axios
      .post(`${lien_create}/addprovince`, { valeur: initialeValue, id }, config)
      .then((response) => {
        console.log(response.data)
        setMessage(response.data)
      })
      .finally(() => {})
  }
  return (
    <div>
      <Stack sx={{ width: '100%' }} spacing={2}>
        <div>
          {message && (
            <Stack sx={{ width: '100%' }} spacing={2}>
              <Alert severity={!message.success ? 'error' : 'success'}>
                {message.error}
              </Alert>
            </Stack>
          )}
        </div>
        {formulaire.map((index) => {
          return (
            <div style={{ marginTop: '15px' }} key={index.id}>
              <TextField
                fullWidth
                label={index.title}
                id="fullWidth"
                name={index.name}
                onChange={(e) => handleChange(e)}
              />
            </div>
          )
        })}
        <ButtonDemo label="Ajouter" loading={false} executer={onSubmit} />
      </Stack>
    </div>
  )
}

export default AddProvince
