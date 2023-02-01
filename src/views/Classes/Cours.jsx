import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import axios from 'axios'
import ButtonDemo from 'Controls/Button'
import { isEmpty, lien_create, lien_update } from 'Utils.jsx'
import { Message } from 'primereact/message'

function Cour({ niveau, loadingCours, data }) {
  const [messageData, setMessage] = useState()

  const [initiale, setInitiale] = useState({ branche: '', maxima: '' })
  const { branche, maxima } = initiale
  useEffect(() => {
    if (!isEmpty(data)) {
      setInitiale({ ...data })
    }
  }, [data])
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }

  let id = new Date()
  const [loading, setLoading] = useState(false)
  const submitCours = async () => {
    setLoading(true)
    const response = await axios.post(
      `${lien_create}/cours`,
      {
        valeur: { branche, maxima },
        classe: niveau,
        id,
        validExamen: true,
        //identifiant,
        code_Option: 'Education de Base',
      },
      config,
    )
    loadingCours()
    setMessage(response.data)
    setLoading(false)
  }
  const modification = () => {
    setLoading(true)
    axios
      .put(
        `${lien_update}/cours`,
        {
          valeur: { branche, maxima },
          validExamen: true,
          id: data._id,
        },
        config,
      )
      .then((response) => {
        setMessage(response.data)
      })
      .finally(() => {
        loadingCours()
        setLoading(false)
      })
  }
  return (
    <>
      <div style={{ marginBottom: '15px' }}>
        {messageData && (
          <Message
            severity={messageData.error ? 'error' : 'success'}
            text={messageData.message}
            style={{ width: '100%' }}
          />
        )}
      </div>
      <div className="field" style={{ marginTop: '15px' }}>
        <span className="p-float-label">
          <InputText
            id="branche"
            placeholder="Branche"
            value={branche}
            autoFocus
            style={{ width: '100%' }}
            onChange={(e) =>
              setInitiale({ ...initiale, branche: e.target.value })
            }
          />
          <label htmlFor="branche">Branche</label>
        </span>
      </div>
      <div className="field" style={{ marginTop: '15px' }}>
        <span className="p-float-label">
          <InputText
            id="max"
            placeholder="Maxima"
            value={maxima}
            type="number"
            style={{ width: '100%' }}
            onChange={(e) =>
              setInitiale({ ...initiale, maxima: e.target.value })
            }
          />
          <label htmlFor="max">Maxima</label>
        </span>
      </div>
      <ButtonDemo
        loading={loading}
        label={!isEmpty(data) ? 'Modifier' : 'Enregistrer'}
        executer={!isEmpty(data) ? modification : submitCours}
      />
    </>
  )
}

export default Cour
