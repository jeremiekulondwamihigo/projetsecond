import React, { useState, createContext } from 'react'

export const ContextRapport = createContext()

function Context(props) {
  const [moisValue, setMoisValues] = useState('')
  const [anneeValue, setAnneeValue] = useState('')
  const [datacontext, setDataContext] = useState()
  return (
    <ContextRapport.Provider
      value={{ moisValue, anneeValue, setMoisValues, setAnneeValue, datacontext, setDataContext }}
    >
      {props.children}
    </ContextRapport.Provider>
  )
}

export default Context
