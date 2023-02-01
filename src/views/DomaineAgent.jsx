import React, { useEffect, useState } from 'react'
import { lien_create, lien_read, isEmpty } from 'Utils'
import { useForm, Controller } from 'react-hook-form'
import axios from 'axios'
import { classNames } from 'primereact/utils'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { Row, Col, Table } from 'reactstrap'
import { Message } from 'primereact/message'

function DomaineAgent() {
  const defaultValues = {
    domaine: '',
  }
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues })

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    )
  }
  const [rows, setRows] = useState([])
  const [message, setMessage] = useState()
  const readDomaine = async () => {
    const response = await axios.get(`${lien_read}/domaine`, config)
    setRows(response.data)
  }
  useEffect(() => {
    readDomaine()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  console.log(rows)
  const id = new Date()
  const onSubmit = async (data) => {
    const response = await axios.post(
      `${lien_create}/domaineAgent`,
      { domaine: data.domaine, id },
      config,
    )
    readDomaine()
    reset()
    setMessage(response.data)
  }
  return (
    <>
      <Row>
        <Col md="6" lg="6" sm="12">
          <div style={{ marginBottom: '15px' }}>
            {message && (
              <Message
                severity={message.error ? 'error' : 'success'}
                text={message.message}
                style={{ width: '100%' }}
              />
            )}
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
            <div className="field" style={{ marginTop: '24px' }}>
              <span className="p-float-label">
                <Controller
                  name="domaine"
                  control={control}
                  rules={{ required: 'le domaine est obligatoire' }}
                  render={({ field, fieldState }) => (
                    <InputText
                      id="domaine"
                      {...field}
                      autoFocus={true}
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
            <div style={{ marginTop: '15px' }}>
              <Button label="Enregistrer" iconPos="right" loading={false} />
            </div>
          </form>
        </Col>
        <Col lg="6" md="6" sm="12">
          <Table responsive>
            <thead>
              <tr>
                <td>Domaine</td>
                <td>Nombre</td>
              </tr>
            </thead>
            <tbody>
              {rows ? (
                rows.map((index, key) => {
                  return (
                    <tr key={key}>
                      <td>{index.title}</td>
                      <td>{index.total}</td>
                    </tr>
                  )
                })
              ) : (
                <p>Loading...</p>
              )}
            </tbody>
          </Table>
        </Col>
      </Row>
    </>
  )
}

export default DomaineAgent
