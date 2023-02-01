import React, { useEffect, useState } from 'react'
import { InputText } from 'primereact/inputtext'
import ButtonDemo from 'Controls/Button'
import axios from 'axios'
import { lien_create } from 'Utils.jsx'
import { Message } from 'primereact/message'
import { lien_read } from 'Utils'
import './style.css'

function Autres({ niveau, option }) {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }
  const [values, setValues] = useState({ effectif: '', pourcentage: '' })
  const { effectif, pourcentage } = values
  const [message, setMessage] = useState()
  const [loading, setLoading] = useState(false)
  const [setting, setSetting] = useState()
  const load = async () => {
    const response = await axios.get(
      `${lien_read}/autres/${option}/${niveau}`,
      config,
    )
    setSetting(response.data)
  }
  useEffect(() => {
    load()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [niveau, option])
  console.log(setting)

  const submit = () => {
    setLoading(true)
    axios
      .post(`${lien_create}/classe`, {
        code_Option: option,
        effectif,
        resultat: pourcentage,
        niveau,
      })
      .then((response) => {
        setMessage(response.data)
      })
      .finally(() => setLoading(false))
  }
  return (
    <div>
      <div style={{ marginBottom: '25px' }}>
        {message && (
          <Message
            severity={message.error ? 'error' : 'success'}
            text={message.message}
            style={{ width: '100%' }}
          />
        )}
      </div>
      {setting && (
        <div className="stat">
          <p className="effet">
            Effectif : {setting.effectif} élèves au maximum
          </p>
          <p className="pourcent">
            Pourcentage total : {setting.resultat}% au minimum
          </p>
        </div>
      )}

      <div className="field" style={{ marginTop: '15px' }}>
        <span className="p-float-label">
          <InputText
            id="effectif"
            placeholder="Effectif total à y inscrire"
            value={effectif}
            type="number"
            style={{ width: '100%' }}
            onChange={(e) => setValues({ ...values, effectif: e.target.value })}
          />
          <label htmlFor="effectif">Effectif total à y inscrire</label>
        </span>
      </div>
      <div className="field" style={{ marginTop: '15px' }}>
        <span className="p-float-label">
          <InputText
            id="pourcentage"
            placeholder="Pourcentage minimum à obtenir"
            value={pourcentage}
            type="number"
            style={{ width: '100%' }}
            onChange={(e) =>
              setValues({ ...values, pourcentage: e.target.value })
            }
          />
          <label htmlFor="pourcentage">Pourcentage minimum à obtenir</label>
        </span>
      </div>
      <ButtonDemo label="Envoyer" loading={loading} executer={submit} />
    </div>
  )
}

export default Autres
