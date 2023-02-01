import React, { useState } from 'react'
import { useForm, Controller } from 'react-hook-form'
import { InputText } from 'primereact/inputtext'
import { Button } from 'primereact/button'
import { classNames } from 'primereact/utils'
import axios from 'axios'
import { lien_create } from 'Utils'
import { Message } from 'primereact/message'
import { Table } from 'reactstrap'
import './style.css'
import DialogDemo from 'Controls/Popup'
import { lien_update, isEmpty } from 'Utils'
import { lien_delete } from 'Utils'
import jsCookie from 'js-cookie'

const Options = ({ donner }) => {
  const [MessageData, setMessageData] = useState()
  const [visible, setVisible] = useState(false)
  const [OptionSelect, setOptionSelect] = useState()
  const [maxima, setMaxima] = useState('')

  const defaultValues = {
    option: '',
  }

  const {
    control,
    formState: { errors },
    handleSubmit,
    reset,
  } = useForm({ defaultValues })
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jsCookie.get('token'),
    },
  }
  const ShowFormulaire = () => {
    setOptionSelect(null)
    setVisible(true)
  }
  const onSubmit = (data) => {
    if (OptionSelect) {
      axios.put(
        `${lien_update}/updateoption`,
        {
          _id: OptionSelect._id,
          option_modification: data.option,
          max: maxima === 0 || isEmpty(maxima) ? OptionSelect.max : maxima,
        },
        config,
      )
    } else {
      axios
        .post(
          `${lien_create}/addoption`,
          {
            code_Section: donner.code_Section,
            option: data.option,
            id: new Date(),
            max: parseInt(maxima),
          },
          config,
        )
        .then((response) => {
          setMessageData(response.data)
        })
    }

    reset()
  }
  const setModification = (data) => {
    setOptionSelect(data)
    setVisible(true)
  }

  const getFormErrorMessage = (name) => {
    return (
      errors[name] && <small className="p-error">{errors[name].message}</small>
    )
  }

  const [messageDelete, setMessageDelete] = useState()
  const deleteFonction = async (e) => {
    const response = await axios.delete(`${lien_delete}/option/${e}`, config)
    setMessageDelete(response.data)
  }

  return (
    <div>
      <div>
        <p onClick={() => ShowFormulaire(true)} style={{ cursor: 'pointer' }}>
          Cliquez ici pour ajouter une option
        </p>
        <div style={{ marginBottom: '15px', width: '100%' }}>
          {messageDelete && (
            <Message
              severity={messageDelete.error}
              text={messageDelete.message}
              style={{ width: '100%' }}
            />
          )}
        </div>
        <Table responsive>
          <thead className="text-primary">
            <tr>
              <td>Code section</td>
              <td>Code Option</td>
              <td>Min</td>
              <td>Option</td>
              <td>Action</td>
            </tr>
          </thead>
          <tbody>
            {donner.option.map((index) => {
              return (
                <tr key={index._id}>
                  <td>{index.code_Section}</td>
                  <td>{index.code_Option}</td>
                  <td>{index.max}</td>
                  <td>{index.option}</td>
                  <td className="actions">
                    <i
                      className="nc-icon nc-tag-content"
                      onClick={() => setModification(index)}
                    />
                    <i
                      className="nc-icon nc-simple-remove"
                      onClick={() => deleteFonction(index.code_Option)}
                    />
                  </td>
                </tr>
              )
            })}
          </tbody>
        </Table>
      </div>
      <DialogDemo
        visible={visible}
        setVisible={setVisible}
        title="Ajouter une option"
      >
        <div style={{ marginBottom: '15px' }}>
          {MessageData && (
            <Message
              severity={MessageData.error}
              text={MessageData.message}
              style={{ width: '100%' }}
            />
          )}
        </div>
        <form onSubmit={handleSubmit(onSubmit)} className="p-fluid">
          <div className="field" style={{ marginBottom: '15px' }}>
            <span className="p-float-label">
              <InputText
                id="max"
                placeholder="Maxima"
                value={maxima}
                min={50}
                max={100}
                autoFocus
                type="number"
                onChange={(e) => setMaxima(e.target.value)}
                // className={classNames({
                //   'p-invalid': fieldState.invalid,
                // })}
              />
            </span>
            {getFormErrorMessage('max')}
          </div>
          <div className="field">
            <span className="p-float-label">
              <Controller
                name="option"
                control={control}
                rules={{ required: "L'option est obligatoire" }}
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
                htmlFor="name"
                className={classNames({ 'p-error': errors.option })}
              >
                Option*
              </label>
            </span>
            {getFormErrorMessage('option')}
          </div>

          <Button
            type="submit"
            label={!isEmpty(OptionSelect) ? 'Modification' : 'Enregistrer'}
            className="mt-2"
          />
        </form>
      </DialogDemo>
    </div>
  )
}
export default Options
