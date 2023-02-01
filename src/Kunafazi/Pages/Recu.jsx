import React, { useState } from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'
import axios from 'axios'
import { useEffect } from 'react'
import { lien_read, isEmpty } from 'Kunafazi/Static/Liens'
import AutoComplement from 'Kunafazi/Static/Grouped'
import SelectOption from 'Kunafazi/Static/Select'
import { Button } from '@mui/material'
import ReactHTMLTable from 'react-html-table-to-excel'
import Facturation from './Rapport/Facturation'

function Clients() {
  const [rows, setRow] = useState()
  const [dataSearch, setDataSearch] = useState([])

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

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
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
                          <div className="col-md-6 col-sm-12 col-lg-6">
                            <Button
                              variant="contained"
                              style={{ width: '100%', heigth: '100%' }}
                              onClick={() => handleChange()}
                            >
                              Chercher
                            </Button>
                          </div>
                          <div className="col-md-6 col-sm-12 col-lg-6">
                            <Facturation data={filterFn.fn(rows)} />
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Clients
