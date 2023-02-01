import React, { useState } from 'react'
import { TextField } from '@mui/material'
import { Loading } from 'Utils.jsx'
import { lien_read } from 'Utils.jsx'
import AutoComplement from 'Controls/AutoComplete'
import { Button } from '@mui/material'
import axios from 'axios'
import { lien_update } from 'Utils'
import { isEmpty } from 'Utils'
import { Alert, Stack } from '@mui/material'
import { useEffect } from 'react'
import jsCookie from 'js-cookie'

function AjouterUneOption({ code, action }) {
  const [items, loading] = Loading(`${lien_read}/option`)
  const [value, setValue] = useState('')

  const config = {
    headers: {
      'Content-Type': 'Application/json',
      Authorization: 'Bearer ' + jsCookie.get('token'),
    },
  }
  const [message, setMessage] = useState()
  const addOption = (e) => {
    e.preventDefault()
    if (!isEmpty(value)) {
      axios
        .put(
          `${lien_update}/optionEtablissement`,
          {
            id: code,
            codeOption: value.code_Option,
            action: action,
          },
          config,
        )
        .then((response) => {
          setMessage(response.data)
        })
    }
  }
  useEffect(() => {
    setTimeout(() => {
      setMessage()
      setValue('')
    }, 4000)
  }, [message])
  return (
    <div>
      {message && (
        <Stack sx={{ marginBottom: '15px' }}>
          <Alert
            variant="filled"
            severity={message.error === false ? 'success' : 'warning'}
          >
            {message.message}
          </Alert>
        </Stack>
      )}
      <TextField
        autoComplete="off"
        type="text"
        value={code}
        name="code"
        disabled={true}
        sx={{ marginBottom: '10px' }}
        fullWidth
      />
      {!loading && (
        <AutoComplement
          value={value}
          setValue={setValue}
          options={items}
          title="Ajoutez une option"
        />
      )}
      <Button
        onClick={(e) => addOption(e)}
        variant="contained"
        style={{ width: '100%', marginTop: '10px' }}
      >
        Contained
      </Button>
    </div>
  )
}

export default AjouterUneOption
