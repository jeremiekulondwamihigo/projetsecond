import React, { useState } from 'react'
import { AutoComplete } from 'primereact/autocomplete'
import { Loading, lien_create, lien_read } from 'Utils'
import { ProgressBar } from 'primereact/progressbar'
import { Message } from 'primereact/message'
import { useForm, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import axios from 'axios'

function SousDomaine({ niveau }) {
  const [domaineSelect, setSelect] = useState(null)
  const [countries, loading] = Loading(
    `${lien_read}/readdomaine/${'code'}/${niveau}`,
  )

  const defaultValues = {
    domaine: '',
    sousDomaine: '',
  }
  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues })
  const id = new Date()

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }

  const [messageData, setMessage] = useState()
  const onSubmit = async (data) => {
    const response = await axios.post(
      `${lien_create}/sousdomaine`,
      {
        code_domaine: domaineSelect.code_domaine,
        titre_sous_domaine: data.sousDomaine,
        id,
      },
      config,
    )
    setMessage(response.data)
    reset()
  }
  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    )
  }
  const [filteredCountries, setFilteredCountries] = useState(null)
  const searchCountry = (event) => {
    setTimeout(() => {
      let _filteredCountries
      if (!event.query.trim().length) {
        _filteredCountries = [...countries]
      } else {
        _filteredCountries = countries.filter((country) => {
          return country.domaine
            .toLowerCase()
            .startsWith(event.query.toLowerCase())
        })
      }

      setFilteredCountries(_filteredCountries)
    }, 50)
  }
  return (
    <>
      {loading ? (
        <ProgressBar
          mode="indeterminate"
          style={{ height: '1px' }}
        ></ProgressBar>
      ) : (
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
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field">
              <AutoComplete
                value={domaineSelect}
                suggestions={filteredCountries}
                completeMethod={searchCountry}
                field="domaine"
                onFocus={true}
                onChange={(e) => setSelect(e.value)}
                aria-label="domaine"
                dropdownAriaLabel="Select Domaine"
              />
            </div>
            <div className="field" style={{ marginTop: '20px' }}>
              <span className="p-float-label">
                <Controller
                  name="sousDomaine"
                  control={control}
                  rules={{ required: 'Le sous domaine est obligatoire' }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id={field.name}
                      autoFocus
                      {...field}
                      className={classNames({
                        'p-invalid': fieldState.invalid,
                      })}
                    />
                  )}
                />
                <label
                  htmlFor="sousDomaine"
                  className={classNames({ 'p-error': errors.sousDomaine })}
                >
                  Sous domaine
                </label>
              </span>
              {getFormErrorMessage('sousDomaine')}
            </div>
            <Button type="submit" label="Enregistrer" className="mt-2" />
          </form>
        </>
      )}
    </>
  )
}

export default SousDomaine
