import React from 'react'
import axios from 'axios'
import jsCookie from 'js-cookie'

export const isEmpty = (value) => {
  if (
    value === undefined ||
    value === null ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  ) {
    return true
  } else {
    return false
  }
}
export const lien_read = 'http://localhost:8080/bulletin/read'
export const lien_create = 'http://localhost:8080/bulletin/create'
export const lien_delete = 'http://localhost:8080/bulletin/delete'
export const lien_update = 'http://localhost:8080/bulletin/update'
export const lien_image_admin = 'http://localhost:8080/image'
//  export const lien_read =
//    'https://expensive-puce-magpie.cyclic.app/bulletin/read'
//  export const lien_create =
//    'https://expensive-puce-magpie.cyclic.app/bulletin/create'
//  export const lien_delete =
//    'https://expensive-puce-magpie.cyclic.app/bulletin/delete'
//  export const lien_update =
//    'https://expensive-puce-magpie.cyclic.app/bulletin/update'

//  export const lien_image_admin = 'https://expensive-puce-magpie.cyclic.app/image'
// export const lien_image_eleve = 'image_eleve'

export const config = {
  headers: {
    'Content-Type': 'application/json',
    Authorization: 'Bearer ' + jsCookie.get('token'),
  },
}

export const Loading = (url) => {
  const [state, setState] = React.useState({
    items: [],
    loading: true,
  })
  React.useEffect(function () {
    ;(async function () {
      const response = await axios.get(url, config)

      if (response.statusText === 'OK') {
        setState({ items: response.data, loading: false })
      } else {
        setState({
          items: [],
          loading: false,
        })
      }
    })()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  return [state.items, state.loading]
}
export const difference = (a) => {
  const b = new Date().toISOString().split('T')[0]
  const date1 = new Date(a)
  const date2 = new Date(b)
  const date1utc = Date.UTC(
    date1.getFullYear(),
    date1.getMonth(),
    date1.getDate(),
  )
  const date2utc = Date.UTC(
    date2.getFullYear(),
    date2.getMonth(),
    date2.getDate(),
  )
  let day = 1000 * 60 * 60 * 24
  const total = (date2utc - date1utc) / day
  return parseInt(total / 366)
}
export const DateActuelle = (data) => {
  const jour = new Date(data).getDate()
  const mois = new Date(data).getMonth()
  const annee = new Date(data).getFullYear()
  return `${jour}/${mois}/${annee}`
}
