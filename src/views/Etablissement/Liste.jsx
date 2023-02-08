import axios from 'axios'
import React, { useContext, useState } from 'react'
import { lien_update } from 'Utils'
import './style.css'
import { DataGrid } from '@mui/x-data-grid'
import { DateActuelle } from 'Utils.jsx'
import { DoDisturbAlt, East, Flight } from '@mui/icons-material'
import { CreateContexte } from 'ContextAll.jsx'
import { useEffect } from 'react'
import { Avatar, CircularProgress } from '@mui/material'
import { useHistory } from 'react-router-dom'
import jsCookie from 'js-cookie'
import { useDispatch, useSelector } from 'react-redux'
import { BloquerEleve } from 'Redux/Eleves'

function MediaCard(props) {
  const { rows } = props

  const history = useHistory()

  const information = (_id) => {
    history.push('/params/informationEleve/' + _id)
  }

  const dispatch = useDispatch()
  const eleve = useSelector((state) => state.eleve)
  const ActionBloquer = (id, valeur) => {
    let data = {
      id: id,
      valeur: !valeur,
    }
    dispatch(BloquerEleve(data))
  }

  const column = [
    {
      field: 'filename',
      headerName: '#',
      width: 50,
      renderCell: (params) => {
        return <Avatar>{params.row.eleveinscrit.nom.substr(0, 1)}</Avatar>
      },
    },
    {
      field: 'nom',
      headerName: 'Nom & PostNom',
      width: 200,
      renderCell: (params) => {
        return (
          <>{`${params.row.eleveinscrit.nom} ${params.row.eleveinscrit.postNom}`}</>
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
            {params.row.classe.niveau} <sup>e</sup>{' '}
          </>
        )
      },
    },
    {
      field: 'code',
      headerName: 'Code option',
      width: 150,
      renderCell: (params) => {
        return <>{params.row.classe.code_Option}</>
      },
    },
    {
      field: 'annee',
      headerName: 'Annee scolaire',
      width: 110,
      renderCell: (params) => {
        return <>{params.row.annee.annee}</>
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
                params.row.classe.resultat > params.row.resultat
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
        return <>{DateActuelle(params.row.eleveinscrit.date_Naissance)}</>
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
                  params.row.eleveinscrit._id,
                  params.row.eleveinscrit.libre,
                )
              }}
            >
              {eleve.updateEleve === 'pending' ? (
                <CircularProgress size={24} color="info" />
              ) : params.row.eleveinscrit.libre ? (
                <Flight style={{ color: 'blue' }} />
              ) : (
                <DoDisturbAlt style={{ color: 'red' }} />
              )}
            </div>
            <div
              className="second"
              onClick={() => information(params.row.eleveinscrit._id)}
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
