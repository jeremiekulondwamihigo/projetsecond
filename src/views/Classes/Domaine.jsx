import React, { useState } from 'react'
import { lien_create } from 'Utils'
import axios from 'axios'
import { Message } from 'primereact/message'
import { useForm, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'

function Domaine({ niveau }) {
  const [MessageData, setMessageData] = useState()
  const defaultValues = {
    domaine: '',
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues })

  const id = new Date()
  const onSubmit = (data) => {
    const config = {
      headers: {
        'Content-Type': 'application/json',
        Authorization: 'Bearer ' + localStorage.getItem('token'),
      },
    }
    axios
      .post(
        `${lien_create}/adddomaine`,
        {
          domaines: data.domaine,
          classe: niveau,
          id: id,
        },
        config,
      )
      .then((response) => {
        setMessageData(response.data)
      })
    reset()
  }

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    )
  }
  return (
    <div>
      <div style={{ marginBottom: '15px' }}>
        {MessageData && (
          <Message
            severity={MessageData.error ? 'error' : 'success'}
            text={MessageData.message}
            style={{ width: '100%' }}
          />
        )}
      </div>
      <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
        <div className="field">
          <span className="p-float-label">
            <Controller
              name="domaine"
              control={control}
              rules={{ required: 'Le domaine est obligatoire' }}
              render={({ field, fieldState }) => (
                <InputText
                  id={field.name}
                  {...field}
                  className={classNames({
                    'p-invalid': fieldState.invalid,
                  })}
                />
              )}
            />
            <label
              htmlFor="section"
              className={classNames({ 'p-error': errors.domaine })}
            >
              Domaine
            </label>
          </span>
          {getFormErrorMessage('domaine')}
        </div>

        <Button type="submit" label="Enregistrer" className="mt-2" />
      </form>
    </div>
  )
}

export default Domaine
