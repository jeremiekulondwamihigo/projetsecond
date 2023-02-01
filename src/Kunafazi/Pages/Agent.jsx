import React, { useState } from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'
import AgentFormulaire from 'Kunafazi/Form/Agent'
import axios from 'axios'
import { lien_read } from 'Kunafazi/Static/Liens'
import { useEffect } from 'react'
import { Edit } from '@mui/icons-material'
import { DataGrid } from '@mui/x-data-grid'
import Popup from 'Kunafazi/Static/Popup'

function Agent() {
  const [row, setRow] = useState()
  const [open, setOpen] = useState(false)
  const loadingAgent = () => {
    axios.get(`${lien_read}/agent`).then((response) => {
      setRow(response.data)
    })
  }
  useEffect(() => {
    loadingAgent()
  }, [])

  const columns = [
    {
      field: 'active',
      headerName: 'Active',
      width: 80,
    },

    {
      field: 'nom',
      headerName: 'Nom complet',
      width: 180,
    },

    {
      field: 'fonction',
      headerName: 'Fonction',
      width: 130,
    },
    {
      field: 'codeAgent',
      headerName: 'Code agent',
      width: 150,
    },

    {
      field: 'action',
      headerName: 'Action',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            <Edit />
          </>
        )
      },
    },
  ]
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <p onClick={() => setOpen(true)} style={{ cursor: 'pointer' }}>
                  Ajouter un agent
                </p>

                {row && (
                  <div
                    style={{
                      width: '65%',
                      height: 480,
                      zIndex: 0,
                      marginTop: '20px',
                    }}
                  >
                    <DataGrid
                      rows={row}
                      columns={columns}
                      pageSize={10}
                      rowsPerPageOptions={[10]}
                      style={{ zIndex: 0 }}
                    />
                  </div>
                )}
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Popup visible={open} setVisible={setOpen} title="Ajouter un agent">
          <AgentFormulaire loading={loadingAgent} />
        </Popup>
      </div>
    </>
  )
}

export default Agent
