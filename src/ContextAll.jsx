import React, { useState, createContext, useEffect } from 'react'
import { lien_read } from 'Utils'
import './style.css'
import axios from 'axios'
import jsCookie from 'js-cookie'
import { isEmpty } from 'Utils'
import { useHistory } from 'react-router-dom'
export const CreateContexte = createContext()

const config = {
  headers: {
    'Content-Type': 'application/json',
    authorization: 'Bearer ' + jsCookie.get('token'),
  },
}

function useFetch(url) {
  const [state, setState] = useState({
    items: [],
    loading: true,
  })
  useEffect(
    function () {
      ;(async function () {
        const response = await axios.get(url, config)

        if (!isEmpty(response.data)) {
          setState({ items: response.data, loading: false })
        } else {
          setState({
            items: [],
            loading: false,
          })
        }
      })()
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [],
  )
  return [state.items, state.loading]
}

const ContexteAll = (props) => {
  const [items, loading] = useFetch(`${lien_read}/user`)
  const history = useHistory()
  const LogOut = () => {
    jsCookie.remove('token')
    history.push('/users/login')
  }

  const [valueRecherche, setValueRecherche] = useState('')

  return (
    <CreateContexte.Provider
      value={{
        user: items,
        loading,
        LogOut,
        setValueRecherche,
        valueRecherche,
      }}
    >
      {loading ? (
        <div className="loader">
          <div></div>
        </div>
      ) : (
        props.children
      )}
    </CreateContexte.Provider>
  )
}
export default React.memo(ContexteAll)
