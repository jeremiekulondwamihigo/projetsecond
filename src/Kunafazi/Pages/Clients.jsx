import React, { useState } from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'
import Membre from 'Kunafazi/Form/Membre'
import Popup from 'Kunafazi/Static/Popup'
import { DataGrid } from '@mui/x-data-grid'
import axios from 'axios'
import { Edit } from '@mui/icons-material'
import { useEffect } from 'react'
import { lien_read, isEmpty } from 'Kunafazi/Static/Liens'
import AutoComplement from 'Kunafazi/Static/Grouped'
import SelectOption from 'Kunafazi/Static/Select'
import { Button } from '@mui/material'
import ReactHTMLTable from 'react-html-table-to-excel'

function Clients() {
  const [openClient, setOpenClient] = useState(false)
  const [rows, setRow] = useState()
  const [dataSearch, setDataSearch] = useState([])

  const columns = [
    {
      field: 'active',
      headerName: 'Active',
      width: 80,
    },

    {
      field: 'responsable',
      headerName: 'Responsable',
      width: 180,
    },
    {
      field: 'quartier',
      headerName: 'Quartier',
      width: 110,
      renderCell: (params) => {
        return (
          <>
            {params.row.quartierbd[0]
              ? params.row.quartierbd[0].quartier
              : 'Non spécifié'}
          </>
        )
      },
    },
    {
      field: 'avenue',
      headerName: 'Avenue',
      width: 100,
      renderCell: (params) => {
        return (
          <>
            {params.row.avenuebd[0]
              ? params.row.avenuebd[0].avenue
              : 'Non spécifié'}
          </>
        )
      },
    },
    {
      field: 'telephone_one',
      headerName: 'Téléphone',
      width: 120,
    },
    {
      field: 'enseigne',
      headerName: 'Enseigne',
      width: 120,
    },
    {
      field: 'types',
      headerName: 'Types',
      width: 150,
    },
    {
      field: 'tarif',
      headerName: 'Tarif',
      width: 50,
      renderCell: (params) => {
        return <>{params.row.tarif}$</>
      },
    },
    {
      field: 'actions',
      headerName: 'Actions',
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
  const loadingClient = async () => {
    const response = await axios.get(`${lien_read}/membre`)
    setRow(response.data)
  }
  useEffect(() => {
    loadingClient()
  }, [])
  const [recherche, setRecherche] = useState('')
  const [dataSearchValue, setDataSearchValue] = useState('')

  const dataRecherche = [
    { id: 'Commune', title: 'Commune' },
    { id: 'Quartier', title: 'Quartier' },
    { id: 'Avenue', title: 'Avenue' },
  ]
  const [quartier, setQuartier] = useState()
  const loadingQuartier = async () => {
    const response = await axios.get(`${lien_read}/quartier`)
    setQuartier(response.data)
  }
  const [avenue, setAvenue] = useState()
  const loadingAvenue = async () => {
    const response = await axios.get(`${lien_read}/avenue`)
    setAvenue(response.data)
  }
  useEffect(() => {
    loadingQuartier()
    loadingAvenue()
  }, [])

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items
    },
  })
  console.log(dataSearchValue)
  const handleChange = () => {
    setFilterFn({
      fn: (items) => {
        if (isEmpty(recherche)) return items
        else {
          if (recherche === 'Commune') {
            return items.filter((x) =>
              x.quartierbd[0].commune.includes(dataSearchValue.title),
            )
          }
          if (recherche === 'Quartier') {
            return items.filter((x) =>
              x.quartierbd[0].quartier.includes(dataSearchValue.quartier),
            )
          }
          if (recherche === 'Avenue') {
            return items.filter((x) =>
              x.avenuebd[0].avenue.includes(dataSearchValue.avenue),
            )
          }
        }
      },
    })
  }
  let commune = [
    { id: 1, title: 'Goma' },
    { id: 2, title: 'Karisimbi' },
  ]
  const loading = async () => {
    if (!isEmpty(recherche)) {
      if (recherche === 'Commune') {
        setDataSearch(commune)
      }
      if (recherche === 'Quartier') {
        setDataSearch(quartier)
      }
      if (recherche === 'Avenue') {
        setDataSearch(avenue)
      }
    }
  }
  useEffect(() => {
    loading()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [recherche])
  const poidFin = (data) => {
    let sommes = 0
    if (!isEmpty(filterFn.fn(rows))) {
      for (let i = 0; i < data.length; i++) {
        sommes = sommes + data[i].tarif
      }
    }
    return `${sommes}$`
  }
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <p
                  style={{ cursor: 'pointer' }}
                  onClick={() => setOpenClient(true)}
                >
                  Ajouter un client
                </p>
                <div className="container">
                  <div className="row">
                    <div className="col-md-4 col-sm-12 col-lg-4">
                      <SelectOption
                        option={dataRecherche}
                        value={recherche}
                        setValue={setRecherche}
                        title="Zone de recherche"
                      />
                    </div>

                    {!isEmpty(dataSearch) && (
                      <div className="col-md-4 col-sm-12 col-lg-4">
                        <AutoComplement
                          options={dataSearch}
                          value={dataSearchValue}
                          setValue={setDataSearchValue}
                          title="Rechercher maintenant"
                        />
                      </div>
                    )}

                    <div className="col-md-4 col-sm-12 col-lg-4">
                      <div className="container">
                        <div className="row">
                          <div
                            className="col-md-6 col-sm-12 col-lg-6"
                            style={{ marginTop: '10px' }}
                          >
                            <Button
                              variant="contained"
                              style={{ width: '100%', heigth: '100%' }}
                              onClick={() => handleChange()}
                            >
                              Chercher
                            </Button>
                          </div>
                          <div className="col-md-6 col-sm-12 col-lg-6">
                            <ReactHTMLTable
                              className="btn btn-success excel"
                              table="tableauSortie"
                              filename="Liste des clients"
                              sheet="LISTE CLIENTS"
                              buttonText="Excel"
                            />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {rows && (
                  <div
                    style={{
                      width: '100%',
                      height: 480,
                      zIndex: 0,
                      marginTop: '20px',
                    }}
                  >
                    <DataGrid
                      rows={filterFn.fn(rows)}
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
        <Popup
          visible={openClient}
          setVisible={setOpenClient}
          title="Ajouter un client"
        >
          <Membre loadingClient={loadingClient} />
        </Popup>
        <table id="tableauSortie" style={style.table}>
          <thead>
            <tr>
              <td colSpan="6">
                {recherche} : {recherche === 'Commune' && dataSearchValue.title}
                {recherche === 'Quartier' && dataSearchValue.quartier}
                {recherche === 'Avenue' && dataSearch.avenue}
              </td>
            </tr>
            <tr>
              <td colSpan="6">Poind fin : {poidFin(filterFn.fn(rows))}</td>
            </tr>
            <tr>
              <td colSpan="6">
                Effectif :
                {!isEmpty(filterFn.fn(rows)) && filterFn.fn(rows).length}
              </td>
            </tr>
            <tr>
              <td style={style.td}>N°</td>
              <td style={style.td}>Quartier</td>
              <td style={style.td}>Avenue</td>
              <td style={style.td}>Téléphone</td>
              <td style={style.td}>Responsable</td>
              <td style={style.td}>Tarif</td>
            </tr>
          </thead>
          <tbody>
            {rows &&
              filterFn.fn(rows).map((index, key) => {
                return (
                  <tr key={key}>
                    <td style={style.td}>{key + 1}</td>
                    <td style={style.td}>{index.quartierbd[0].quartier}</td>
                    <td style={style.td}>{index.avenuebd[0].avenue}</td>
                    <td style={style.td}>{index.telephone_one}</td>
                    <td style={style.td}>{index.responsable}</td>
                    <td style={style.td}>{index.tarif}</td>
                  </tr>
                )
              })}
          </tbody>
        </table>
      </div>
    </>
  )
}
let style = {
  td: {
    border: '1px solid black',
  },
  table: {
    display: 'none',
  },
}

export default Clients
