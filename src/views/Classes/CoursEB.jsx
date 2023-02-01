import React, { useEffect, useState } from 'react'
import { Dropdown } from 'primereact/dropdown'
import { InputText } from 'primereact/inputtext'
import axios from 'axios'
import { lien_read, lien_update } from 'Utils.jsx'
import ButtonDemo from 'Controls/Button'
import { isEmpty, lien_create } from 'Utils.jsx'
import { Message } from 'primereact/message'
import { RadioButton } from 'primereact/radiobutton'
import './style.css'

function CoursEB({ niveau, loadingCours, data, option }) {
  const validation = [
    { id: 1, name: 'Domaine', value: true },
    { id: 2, name: 'SousDomaine', value: false },
  ]
  const validExam = [
    { id: 1, title: 'Examen autoriser', value: true },
    { id: 2, title: 'Examen non autoriser', value: false },
  ]
  const [valid, setValid] = useState(true)
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
  const [domaine, setDomaine] = useState(null)
  const [dataSousDomaine, setDataSousDomaine] = useState([])

  const [domaineData, setDomaineData] = useState([])
  const [value, setValue] = useState()

  const loadSousDomaine = async () => {
    let table = []
    const response = await axios.get(
      `${lien_read}/readdomaine/${'code'}/${niveau}`,
      config,
    )
    for (let iteration = 0; iteration < response.data.length; iteration++) {
      table = table.concat(response.data[iteration].sousDomaine)
    }
    setDomaineData(Array.from(response.data))
    setDataSousDomaine(Array.from(table))
  }
  useEffect(() => {
    loadSousDomaine()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [niveau])

  let id = new Date()
  const [loading, setLoading] = useState(false)
  const submitCours = async () => {
    if ((!value || !domaine) && niveau > 5) {
      setMessage({
        error: true,
        message: 'Selectionner le domaine ou sous domaine',
      })
      setLoading(false)
    } else {
      setLoading(true)
      let identifiant =
        niveau > 5
          ? domaine
            ? value.code_domaine
            : value.code_sous_domaine
          : ''
      const response = await axios.post(
        `${lien_create}/cours`,
        {
          valeur: { branche, maxima },
          classe: niveau,
          id,
          validExamen: valid,
          identifiant,
          code_Option: niveau > 5 ? 'Education de Base' : option.code_Option,
        },
        config,
      )
      loadingCours()
      setMessage(response.data)
      setLoading(false)
    }
  }
  const modification = () => {
    setLoading(true)
    axios
      .put(
        `${lien_update}/cours`,
        {
          valeur: { branche, maxima },
          validExamen: valid,
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
      <div>
        {niveau > 5 && (
          <>
            <Dropdown
              value={domaine}
              options={validation}
              onChange={(e) => setDomaine(e.value)}
              optionLabel="name"
              style={{ width: '100%' }}
              placeholder="Cours appartenant au"
            />
            <div style={{ marginTop: '15px' }}>
              <div>
                {domaine && (
                  <Dropdown
                    value={value}
                    options={domaineData}
                    onChange={(e) => setValue(e.value)}
                    optionLabel="domaine"
                    style={{ width: '100%' }}
                    placeholder="Domaine"
                  />
                )}
              </div>
              <div>
                {!domaine && (
                  <Dropdown
                    value={value}
                    options={dataSousDomaine}
                    onChange={(e) => setValue(e.value)}
                    optionLabel="titre_sous_domaine"
                    style={{ width: '100%' }}
                    placeholder="Sous domaine"
                  />
                )}
              </div>
            </div>
          </>
        )}
      </div>
      <div>
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
        <div className="checkbo">
          {validExam.map((index) => {
            return (
              <React.Fragment key={index.id} className="checkb">
                <div className="field-radiobutton checkb">
                  <RadioButton
                    inputId={index.id}
                    name={index.title}
                    value={index.value}
                    onChange={(e) => setValid(e.value)}
                    checked={index.value === valid}
                  />
                </div>
                <div className="chektext">
                  <label htmlFor={index.id}>{index.title}</label>
                </div>
              </React.Fragment>
            )
          })}
        </div>

        <ButtonDemo
          loading={loading}
          label={!isEmpty(data) ? 'Modifier' : 'Enregistrer'}
          executer={!isEmpty(data) ? modification : submitCours}
        />
      </div>
    </>
  )
}

export default CoursEB
