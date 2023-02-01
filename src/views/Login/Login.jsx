import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Password } from 'primereact/password'
import { classNames } from 'primereact/utils'
import './style.css'
import { lien_create } from 'Utils.jsx'
import axios from 'axios'
import { Message } from 'primereact/message'
import { setCookie } from 'Controls/Cookie'

export const ReactHookFormDemo = () => {
  const defaultValues = {
    email: '',
    password: '',
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues })

  const [show, setShow] = useState(false)
  const [message, setMessage] = useState('')
  const [loading, setLoading] = useState(false)

  const onSubmit = async (data) => {
    setLoading(true)
    const response = await axios.post(`${lien_create}/login`, {
      username: data.email,
      password: data.password,
    })
    if (response.data.sucess) {
      setCookie('token', response.data.token)
      window.location.replace('/admin/dashboard')
    } else {
      setMessage(response.data.error)
      reset()
      setShow(false)
      setLoading(false)
      setShow(true)
    }
  }

  return (
    <div className="form-demo">
      <div className="flex justify-content-center">
        <div className="card">
          <h5 className="text-center">Connexion</h5>
          {show && <Message severity="error" text={message} />}
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field">
              <span className="p-float-label p-input-icon-right">
                <i className="pi pi-envelope" />
                <Controller
                  name="email"
                  control={control}
                  rules={{
                    required: 'Email is required.',
                    pattern: {
                      value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i,
                      message:
                        'Invalid email address. E.g. congosoft@email.com',
                    },
                  }}
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
                  htmlFor="email"
                  className={classNames({ 'p-error': !!errors.email })}
                >
                  username
                </label>
              </span>
            </div>
            <div className="field">
              <span className="p-float-label">
                <Controller
                  name="password"
                  control={control}
                  rules={{ required: 'Password is required.' }}
                  render={({ field, fieldState }) => (
                    <Password id={field.name} {...field} feedback={false} />
                  )}
                />
                <label
                  htmlFor="password"
                  className={classNames({ 'p-error': errors.password })}
                >
                  Password
                </label>
              </span>
            </div>

            <Button
              type="submit"
              label="Submit"
              className="mt-2"
              loading={loading}
            />
          </form>
          <div className="message">
            <p>Congosof</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default ReactHookFormDemo
