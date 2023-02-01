import axios from 'axios'
import React, { useContext, useState } from 'react'
import { lien_update } from 'Utils'
import './style.css'
import { DataGrid } from '@mui/x-data-grid'
import { DateActuelle } from 'Utils.jsx'
import { DoDisturbAlt, East, Flight } from '@mui/icons-material'
import { CreateContexte } from 'ContextAll.jsx'
import { useEffect } from 'react'
import { Avatar } from '@mui/material'
import { useHistory } from 'react-router-dom'
import jsCookie from 'js-cookie'

function MediaCard(props) {
  const { rows, loadingEleve } = props

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jsCookie.get('token'),
    },
  }
  const history = useHistory()

  const information = (_id) => {
    history.push('/params/informationEleve/' + _id)
  }

  const ActionBloquer = (id, valeur) => {
    axios
      .put(
        `${lien_update}/bloqueleve`,
        {
          id: id,
          valeur: !valeur,
        },
        config,
      )
      .then((response) => {
        console.log(response)
        loadingEleve()
      })
  }

  const column = [
    {
      field: 'filename',
      headerName: '#',
      width: 50,
      renderCell: (params) => {
        return <Avatar>{params.row.eleve[0].nom.substr(0, 1)}</Avatar>
      },
    },
    {
      field: 'nom',
      headerName: 'Nom & PostNom',
      width: 200,
      renderCell: (params) => {
        return (
          <>{`${params.row.eleve[0].nom} ${params.row.eleve[0].postNom}`}</>
        )
      },
    },
    {
      field: 'codeEleve',
      headerName: 'Code élève',
      width: 100,
      renderCell: (params) => {
        return <>{params.row.code_eleve}</>
      },
    },
    {
      field: 'classe',
      headerName: 'Classe',
      width: 60,
      renderCell: (params) => {
        return (
          <>
            {params.row.classe[0].niveau} <sup>e</sup>{' '}
          </>
        )
      },
    },
    {
      field: 'code',
      headerName: 'Code option',
      width: 150,
      renderCell: (params) => {
        return <>{params.row.classe[0].code_Option}</>
      },
    },
    {
      field: 'annee',
      headerName: 'Annee scolaire',
      width: 110,
      renderCell: (params) => {
        return <>{params.row.annee[0].annee}</>
      },
    },
    {
      field: 'resultat',
      headerName: 'Résultat',
      width: 70,
      renderCell: (params) => {
        return (
          <p
            style={{
              color: `${
                params.row.classe[0].resultat > params.row.resultat
                  ? 'red'
                  : 'blue'
              }`,
            }}
          >
            {params.row.resultat} %
          </p>
        )
      },
    },
    {
      field: 'naissance',
      headerName: 'Date Naiss',
      width: 90,
      renderCell: (params) => {
        return <>{DateActuelle(params.row.eleve[0].date_Naissance)}</>
      },
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 90,
      renderCell: (params) => {
        return (
          <div className="actions">
            <div
              className="first"
              onClick={() => {
                ActionBloquer(
                  params.row.eleve[0]._id,
                  params.row.eleve[0].libre,
                )
              }}
            >
              {params.row.eleve[0].libre ? (
                <Flight style={{ color: 'blue' }} />
              ) : (
                <DoDisturbAlt style={{ color: 'red' }} />
              )}
            </div>
            <div
              className="second"
              onClick={() => information(params.row.eleve[0]._id)}
            >
              <East />
            </div>
          </div>
        )
      },
    },
  ]

  const { valueRecherche, setValueRecherche } = useContext(CreateContexte)

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items
    },
  })
  useEffect(() => {
    setValueRecherche('')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    setFilterFn({
      fn: (items) => {
        if (valueRecherche === '') {
          return items
        } else {
          return items.filter((x) =>
            x.eleve[0].nom.includes(valueRecherche.toUpperCase().trim()),
          )
        }
      },
    })
  }, [valueRecherche])

  return (
    <div className="cards">
      {rows && (
        <div style={{ width: '100%', height: 450, zIndex: 0 }}>
          <DataGrid
            rows={filterFn.fn(rows)}
            columns={column}
            pageSize={7}
            rowsPerPageOptions={[7]}
          />
        </div>
      )}
    </div>
  )
}
export default MediaCard
