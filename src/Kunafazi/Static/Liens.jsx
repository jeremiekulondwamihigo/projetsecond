import React from 'react'
import axios from 'axios'
export const lien_create = 'http://localhost:8080/usafi/create'
export const lien_read = 'http://localhost:8080/usafi/read'
export const lien_update = 'http://localhost:8080/usafi/update'
export const lien_delete = 'http://localhost:8080/usafi/delete'

export const isEmpty = function (value) {
  return (
    value === undefined ||
    value === null ||
    value === [] ||
    value === {} ||
    (typeof value === 'object' && Object.keys(value).length === 0) ||
    (typeof value === 'string' && value.trim().length === 0)
  )
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
export const createHeaders = (keys) => {
  var result = []
  for (var i = 0; i < keys.length; i += 1) {
    result.push({
      id: keys[i],
      name: keys[i],
      prompt: keys[i],
      width: 65,
      align: 'left',
      padding: 0,
    })
  }
  return result
}
export const addFooters = (doc) => {
  const pageCount = doc.internal.getNumberOfPages()

  doc.setFont('helvetica', 'italic')
  doc.setFontSize(5)
  for (var i = 1; i <= pageCount; i++) {
    doc.setPage(i)

    doc.text(
      'Page ' + String(i) + ' of ' + String(pageCount),
      doc.internal.pageSize.width / 2,
      290,
      {
        align: 'center',
      },
    )
  }
}
export const Converter_Month = (data) => {
  const valeur = new Date(data).getMonth()
  switch (valeur) {
    case 0:
      return 'Janvier'
    case 1:
      return 'Février'
    case 2:
      return 'Mars'
    case 3:
      return 'Avril'
    case 4:
      return 'Mai'
    case 5:
      return 'Juin'
    case 6:
      return 'Juillet'
    case 7:
      return 'Août'
    case 8:
      return 'Septembre'
    case 9:
      return 'Octobre'
    case 10:
      return 'Novembre'
    case 11:
      return 'Décembre'
    default:
      return 'Not undefined'
  }
}
export const Loading = (url) => {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }
  const [state, setState] = React.useState({
    items: [],
    loading: true,
  })
  React.useEffect(function () {
    ;(async function () {
      const response = await axios.get(url, config)

      if (response.statusText === 'OK') {
        if (response.data === 'Not authorization') {
          LogOut()
        }
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
export const DateActuelle = (data) => {
  const jour = new Date(data).getDate()
  const mois = new Date(data).getMonth()
  const annee = new Date(data).getFullYear()
  return `${jour}/${mois + 1}/${annee}`
}
export const LogOut = () => {
  localStorage.removeItem('token')
  window.location.replace('/login/login')
}
