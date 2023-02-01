import React, { useEffect, useState } from 'react'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import {
  isEmpty,
  lien_delete,
  lien_read,
  lien_update,
} from '../../../Static/Liens'
import LinearProgress from '@mui/material/LinearProgress'
import Box from '@mui/material/Box'
import { Edit, Delete, Done } from '@mui/icons-material'
import Anne from '../Anne'
import Popup from '../../../Static/Popup'
import { Fab, Grid, Paper } from '@mui/material'
import AddIcon from '@mui/icons-material/Add'
import BarCharts from '../../../Chart/BarChart'
import PropType from 'prop-types'
import Fade from '@mui/material/Fade'
import Slide from '@mui/material/Slide'
import Snackbar from '@mui/material/Snackbar'

function SlideTransition(props) {
  return <Slide {...props} direction="left" />
}

function Tab_Annee() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('authToken'),
    },
  }

  const [row, setRow] = useState([])

  const readYear = async () => {
    const response = await axios.get(`${lien_read}/readyear`, config)
    setRow(response.data.all_year)
  }
  useEffect(() => {
    readYear()
  }, [])

  const [messageE, setMessage] = useState({ message: '' })
  const { message } = messageE

  const updateYear = (id, valeur, Transition) => () => {
    axios
      .put(
        `${lien_update}/updateyear`,
        {
          id,
          valeur,
        },
        config,
      )
      .then((response) => {
        setMessage(response.data)
        setState({
          open: true,
          Transition,
        })

        readYear()
      })
  }

  const DeleteYear = async (code) => {
    axios.delete(`${lien_delete}/year/${code}`, config).then((response) => {
      if (response) {
        readYear()
      }
    })
  }

  const columns = [
    {
      field: 'id',
      headerName: 'Date',
      width: 100,
      renderCell: (params) => {
        return (
          <span>{new Date(params.row.id).toLocaleDateString().toString()}</span>
        )
      },
    },
    {
      field: 'annee',
      headerName: 'Annee',
      width: 130,
    },

    {
      field: 'active',
      headerName: 'Active',
      width: 100,
      renderCell: (params) => {
        return params.row.active ? 'En cours' : 'En attente'
      },
    },
    {
      field: 'action',
      headerName: 'Action',
      width: 110,
      renderCell: (params) => {
        return (
          <span
            style={{
              marginRight: '30px',
              justifyContent: 'space-between',
            }}
          >
            <Fab
              size="small"
              onClick={updateYear(
                params.row._id,
                !params.row.active,
                SlideTransition,
              )}
            >
              {params.row.active ? (
                <Done
                  style={{
                    color: 'blue',
                    cursor: 'pointer',
                  }}
                />
              ) : (
                <Edit
                  style={{
                    color: 'red',
                    cursor: 'pointer',
                  }}
                />
              )}{' '}
            </Fab>
            <Fab
              size="small"
              style={{ marginLeft: '10px' }}
              onClick={() => {
                DeleteYear(params.row.code_Annee)
              }}
            >
              <Delete />
            </Fab>
          </span>
        )
      },
    },
  ]
  const [openPopup, setOpenPopup] = useState(false)

  const data = [
    {
      annee: '2020 - 2021',
      effectif: 1500,
    },
    {
      annee: '2021 - 2022',
      effectif: 900,
    },
    {
      annee: '2023 - 2024',
      effectif: 2200,
    },
    {
      annee: '2023 - 2024',
      effectif: 2000,
    },
    {
      annee: '2023 - 2024',
      effectif: 2900,
    },
  ]

  const [state, setState] = React.useState({
    open: false,
    Transition: Fade,
  })

  const handleCloseSnack = () => {
    setState({
      ...state,
      open: false,
    })
  }

  return (
    <React.Fragment>
      {' '}
      {!row && (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      )}
      <div
        style={{
          margin: '30px',
          position: 'absolute',
          top: '5px',
          right: '12px',
        }}
      >
        <Fab
          variant="extended"
          color="primary"
          aria-label="add"
          onClick={() => setOpenPopup(true)}
        >
          <AddIcon sx={{ mr: 1 }} />
          Ajouter
        </Fab>
      </div>
      <Grid style={{ width: '100%' }} container>
        <Grid item lg={6} sm={12} md={12}>
          {!isEmpty(row) && (
            <Paper elevation={3}>
              <div
                style={{
                  width: '100%',
                  height: 450,
                  marginRight: '2%',
                }}
              >
                <DataGrid
                  rows={row}
                  columns={columns}
                  pageSize={6}
                  rowsPerPageOptions={[6]}
                  checkboxSelection
                />
              </div>
            </Paper>
          )}{' '}
        </Grid>
        <Grid item lg={6} sm={12} md={12}>
          <Paper
            style={{
              height: 450,
              marginLeft: '5px',
              width: '100%',
              paddingRight: '30px',
              justifyContent: 'center',
              alignItems: 'center',
              display: 'flex',
            }}
          >
            <BarCharts
              data={data}
              title="annee"
              cle="effectif"
              largeur={550}
              hauteur={300}
            />
          </Paper>
        </Grid>
      </Grid>
      <Popup
        openPopup={openPopup}
        setOpenPopup={setOpenPopup}
        title="Enregistrer l'année"
      >
        <Anne readYear={readYear} />
      </Popup>
      <Snackbar
        open={state.open}
        onClose={handleCloseSnack}
        TransitionComponent={state.Transition}
        message={message}
        key={state.Transition.name}
      />
    </React.Fragment>
  )
}

Tab_Annee.PropType = {
  config: PropType.object.isRequired,
  row: PropType.array,
  readYear: PropType.func.isRequired,
  updateYear: PropType.func.isRequired,
  DeleteYear: PropType.func.isRequired,
  columns: PropType.array.isRequired,
  openPopup: PropType.bool.isRequired,
  data: PropType.array.isRequired,
  message: PropType.string,
}

export default Tab_Annee
