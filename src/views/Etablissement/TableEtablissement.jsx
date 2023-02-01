import React, { useState, useEffect, useContext } from 'react'
import { Fab } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Popup from 'Controls/Popup.jsx'
import { Add, Edit } from '@mui/icons-material'
import { lien_read } from 'Utils.jsx'
import axios from 'axios'
import AddEcole from './AddEtablissement.jsx'
import { Link, useHistory } from 'react-router-dom'
import ProtoType from 'prop-types'
import { CreateContexte } from 'ContextAll.jsx'
import './style.css'
import jsCookie from 'js-cookie'

function EtablissementTable() {
  const { user } = useContext(CreateContexte)
  const { data } = user
  const { code_province } = data[0]

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jsCookie.get('token'),
    },
  }

  const [rows, setRows] = useState([])
  const [openPopup, setOpenPopup] = useState(false)

  const read_Etablissement = async () => {
    const etablissement = await axios.get(
      `${lien_read}/readetablissement/${code_province}`,
      config,
    )
    setRows(etablissement.data)
  }

  useEffect(() => {
    read_Etablissement()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const [dataChange, setDataChange] = useState([])
  const [openPopupModifier, setOpenPopupModifier] = useState(false)

  const Modification = (e, params) => {
    e.preventDefault()
    setDataChange(params)
    setOpenPopupModifier(true)
  }
  const history = useHistory()

  // const information = (code) => {
  //   history.push('/params/infoEtablissement/' + code)
  // }

  const columns = [
    {
      field: 'active',
      headerName: 'Active',
      width: 80,
      renderCell: (params) => {
        return (
          <>
            <div
              style={{
                backgroundColor: `${params.row.active ? 'green' : 'red'}`,
              }}
              className="trueAndFalse"
            >
              <div></div>
            </div>
          </>
        )
      },
    },
    {
      field: 'id',
      headerName: 'Date',
      width: 80,
      renderCell: (params) => {
        return <>{new Date(params.row.id).toLocaleDateString()}</>
      },
    },
    { field: 'etablissement', headerName: 'Etablissement', width: 250 },
    { field: 'codeEtablissement', headerName: 'Code', width: 100 },

    {
      field: 'option',
      headerName: 'Options',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.code_option.length < 1
              ? 'Aucune'
              : params.row.code_option.length}
          </>
        )
      },
    },
    {
      field: 'effectif',
      headerName: 'Effectif',
      width: 100,
      renderCell: (params) => {
        return <>00000</>
      },
    },
    {
      field: 'agent',
      headerName: "Chef d'établissement",
      width: 150,
      renderCell: (params) => {
        return (
          <>{`${params.row.agent[0].nom} ${params.row.agent[0].postnom} ${params.row.agent[0].prenom}`}</>
        )
      },
    },
    {
      field: 'telephone',
      headerName: 'Téléphone',
      width: 120,
      renderCell: (params) => {
        return <>{params.row.agent[0].telephone}</>
      },
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Edit
              color="primary"
              style={{ cursor: 'pointer', marginRight: '20px' }}
              onClick={(e) => Modification(e, params.row)}
            />

            {/* <span onClick={() => information(params.row.codeEtablissement)}>
              Plus
            </span> */}
            <Link
              to={{
                pathname: '/params/infoEtablissement',
                state: {
                  etablissement: params.row,
                },
              }}
            >
              Plus
            </Link>
          </>
        )
      },
    },
  ]

  return (
    <div style={{ width: 1000 }}>
      {rows ? (
        <>
          <div
            style={{
              marginTop: '10px',
              position: 'absolute',
              right: '12px',
              top: '0px',
            }}
          >
            <Fab
              variant="extended"
              color="primary"
              aria-label="add"
              onClick={() => setOpenPopup(true)}
            >
              <Add sx={{ mr: 1 }} />
              Ajouter
            </Fab>
          </div>
          <div
            style={{ width: '100%', height: 480, zIndex: 0, marginTop: '20px' }}
          >
            <DataGrid
              rows={rows}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              style={{ zIndex: 0 }}
            />
          </div>
          <Popup
            visible={openPopup}
            setVisible={setOpenPopup}
            title="Etablissement"
          >
            <AddEcole />
          </Popup>
          <Popup
            visible={openPopupModifier}
            setVisible={setOpenPopupModifier}
            title="Modification"
          >
            <AddEcole dataModifier={dataChange} />
          </Popup>
        </>
      ) : (
        <div className="loader">
          <div></div>
        </div>
      )}
    </div>
  )
}
EtablissementTable.ProtoType = {
  Popup: ProtoType.node.isRequired,
  AddEcole: ProtoType.node.isRequired,
  dataLog: ProtoType.object.isRequired,
  data: ProtoType.array.isRequired,
  code_proved: ProtoType.string.isRequired,
  config: ProtoType.object.isRequired,
  rows: ProtoType.array,
  openPopup: ProtoType.bool.isRequired,
  read_Etablissement: ProtoType.func.isRequired,
  dataChange: ProtoType.any,
  openPopupModifier: ProtoType.bool.isRequired,
  Modification: ProtoType.func.isRequired,
  columns: ProtoType.array.isRequired,
}
export default EtablissementTable
