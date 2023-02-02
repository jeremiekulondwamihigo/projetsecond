import React, { useState, useEffect, useContext } from 'react'
import { Avatar, Fab, Paper } from '@mui/material'
import { DataGrid } from '@mui/x-data-grid'
import Popup from 'Controls/Popup'
import { Add } from '@mui/icons-material'
import { lien_read, lien_image_admin, difference, isEmpty } from 'Utils.jsx'
import SpeedDial from '@mui/material/SpeedDial'
import SpeedDialAction from '@mui/material/SpeedDialAction'
import axios from 'axios'
import AddAgent from './AgentForm'
import { Delete, Block, Info, Autorenew, CameraAlt } from '@mui/icons-material'
import { useHistory } from 'react-router-dom'
import ManageHistoryIcon from '@mui/icons-material/ManageHistory'
import Image from './Image.jsx'
import Skeleton from '@mui/material/Skeleton'
import jsCookie from 'js-cookie'
import { CreateContexte } from 'ContextAll'

function Table(props) {
  const { user } = useContext(CreateContexte)

  const [openImage, setOpenImage] = useState(false)
  const [agentImage, setAgentImage] = useState()
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + jsCookie.get('token'),
    },
  }
  const [openPopup, setOpenPopup] = useState(false)
  const [all_Agent, setAll_Agent] = useState([])

  const read_All_Agent = async () => {
    if (user && user.fonction === 'etablissement') {
      const { data } = user
      const response = await axios.get(
        `${lien_read}/agentListe/${data[0].codeEtablissement}`,
        config,
      )
      if (response) {
        console.log(response)
        setAll_Agent(response.data)
      }
    } else {
      const response = await axios.get(`${lien_read}/agentListe/tous`, config)
      if (response) {
        setAll_Agent(response.data)
      }
    }
  }

  useEffect(() => {
    read_All_Agent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  const history = useHistory()
  const ActionClick = (e, data, agent) => {
    e.preventDefault()

    if (data === 'information') {
      history.push('/params/informationAgent/' + agent)
    }
    if (data === 'image') {
      setAgentImage(agent)
      setOpenImage(true)
    }
  }
  const actions = [
    { icon: <Autorenew fontSize="small" />, name: 'Modification' },
    { icon: <Delete fontSize="small" />, name: 'Supprimer' },
    { icon: <Block fontSize="small" />, name: 'Blocker' },
    { icon: <CameraAlt fontSize="small" />, name: 'image' },
    {
      icon: <Info fontSize="small" />,
      name: 'information',
    },
  ]

  const columns = [
    {
      field: 'id',
      headerName: '#',
      width: 55,
      renderCell: (params) => {
        return (
          <Avatar>
            {isEmpty(params.row.filename) ? (
              <Skeleton variant="circular" width={40} height={40} />
            ) : (
              <img
                src={`${lien_image_admin}/${params.row.filename}`}
                alt={params.row._id}
              />
            )}
          </Avatar>
        )
      },
    },
    { field: 'code_agent', headerName: 'ID Agent', width: 80 },
    { field: 'nom', headerName: 'Nom et postnom', width: 150 },
    { field: 'matricule', headerName: 'Matricule', width: 100 },
    {
      field: 'dateNaissance',
      headerName: 'Age',
      width: 70,
      renderCell: (params) => {
        return <>{difference(params.row.dateNaissance)} ans</>
      },
    },
    { field: 'nationalite', headerName: 'Nationalité', width: 100 },
    { field: 'telephone', headerName: 'Téléphone', width: 100 },
    {
      field: 'dateEngagement',
      headerName: 'Encieneté',
      width: 100,
      renderCell: (params) => {
        return <>{difference(params.row.dateEngagement)} ans</>
      },
    },
    { field: 'fonction', headerName: 'Fonction', width: 100 },

    { field: 'genre', headerName: 'Genre', width: 100 },
    {
      field: 'etat',
      headerName: 'Etat',
      width: 100,
    },
    {
      field: 'action',
      headerName: 'Actions',
      width: 100,
      renderCell: (params) => {
        return (
          <SpeedDial
            sx={{ mb: 1, mt: 1 }}
            ariaLabel={params.row._id}
            style={{ right: 5, position: 'absolute' }}
            direction="left"
            icon={<ManageHistoryIcon fontSize="small" />}
          >
            {actions.map((action) => (
              <SpeedDialAction
                key={action.name}
                onClick={(e) =>
                  ActionClick(e, action.name, params.row.code_agent)
                }
                icon={action.icon}
                tooltipTitle={action.name}
              />
            ))}
          </SpeedDial>
        )
      },
    },
  ]

  return (
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
          Agent
        </Fab>
      </div>
      {all_Agent && (
        <Paper elevation={0}>
          <div style={{ width: '100%', height: 480 }}>
            <DataGrid
              rows={all_Agent}
              columns={columns}
              pageSize={10}
              rowsPerPageOptions={[10]}
              checkboxSelection
            />
          </div>
        </Paper>
      )}

      <Popup
        visible={openPopup}
        setVisible={setOpenPopup}
        title="Enregistrer un enseignant"
      >
        <AddAgent read_All_Agent={read_All_Agent} />
      </Popup>

      <Popup
        visible={openImage}
        setVisible={setOpenImage}
        title="Importer une image"
      >
        <Image concerner={agentImage} loading={read_All_Agent} />
      </Popup>
    </>
  )
}

export default Table
