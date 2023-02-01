import React, { createContext, useState } from 'react'

export const ValeurContext = createContext()
function Context(props) {
  const [value, setValue] = useState({
    add: null,
    adf: null,
    dpsm: null, //Début du premier semestre
    fpsm: null, //Fin du premier semestre
    dssm: null, //Début second semestre
    fssm: null, //Fin second semestre
    //Periode
    dpp: null,
    fpp: null,
    ddp: null,
    fdp: null,
    dtp: null,
    ftp: null,
    dqp: null,
    fqp: null,
  })
  const [observation, setObservation] = useState([])
  console.log(observation)
  const [uneSeule, setUneSeule] = useState(true)
  const changeUneseule = () => {
    setUneSeule(!uneSeule)
  }

  const [activeIndex, setActiveIndex] = useState(0)
  const [erreur, setErreur] = useState('')

  const changeValue = (data) => {
    setValue(data)
  }
  const changeObservation = (data) => {
    setObservation([
      ...observation,
      {
        observation: data.observation,
        dateDebut: data.date1,
        dateFin: data.date2,
      },
    ])
  }
  let test = parseInt(value.adf - value.add) / 86400000
  let joursScolaire = test >= 0 ? test + 1 : test

  const changeIndex = (e, data) => {
    e.preventDefault()
    setActiveIndex(data)
  }

  const showError = (e, valeur) => {
    e.preventDefault()
    setErreur(valeur)
  }

  return (
    <ValeurContext.Provider
      value={{
        value,
        changeValue,
        joursScolaire,
        activeIndex,
        changeIndex,
        erreur,
        showError,
        changeObservation,
        observation,
        changeUneseule,
        uneSeule,
      }}
    >
      {props.children}
    </ValeurContext.Provider>
  )
}

export default Context
