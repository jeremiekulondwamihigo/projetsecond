import React, { useEffect } from 'react'
import { Card, CardBody, Row, Col, Table } from 'reactstrap'
import AjouterQuartier from 'Kunafazi/Form/EntiteQuartier'
import EntiteAvenue from 'Kunafazi/Form/EntiteAvenue'
import Popup from 'Kunafazi/Static/Popup'
import { useState } from 'react'
import { lien_read, isEmpty, Loading } from 'Kunafazi/Static/Liens'
import axios from 'axios'
import ListAvenue from 'Kunafazi/Control/ListAvenue'
import FormCalculFin from 'Kunafazi/Control/FormCalculFin'

function Quartier() {
  const [openQuartier, setOpenQuartier] = useState(false)
  const [openavenue, setOpenAvenue] = useState(false)
  const [openliste, setOpenListe] = useState(false)
  const [dataList, setDataList] = useState()
  const [openCalcul, setOpenCalcul] = useState(false)
  const [dataQuartier, setDataQuartier] = useState()
  const [modificationQuartier, setModification] = useState(false)
  const [quartierSelect, setQuartierSelect] = useState()

  const [item, loading] = Loading(`${lien_read}/readuser`)
  const { login } = item

  const selectQ = (e, data) => {
    if (!isEmpty(login) && login.fonction === 'admin') {
      e.preventDefault()
      setQuartierSelect(data)
      setModification(true)
    }
  }

  const openFonctionCalcul = (e, data) => {
    e.preventDefault()
    setDataQuartier(data)
    setOpenCalcul(true)
  }

  const [quartier, setQuartier] = useState()

  const openListeFonction = (data) => {
    setDataList(data)
    setOpenListe(true)
  }
  const loadingAvenue = () => {
    axios.get(`${lien_read}/quartier`).then((res) => {
      setQuartier(res.data)
    })
  }
  useEffect(() => {
    loadingAvenue()
  }, [])

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <div
                  style={{ display: 'flex', justifyContent: 'space-between' }}
                >
                  <div
                    onClick={() => setOpenQuartier(true)}
                    style={{ cursor: 'pointer' }}
                  >
                    <p>Enregistrer le quartier</p>
                  </div>
                  <div
                    onClick={() => setOpenAvenue(true)}
                    style={{ cursor: 'pointer' }}
                  >
                    <p>Enregistrer l'avenue</p>
                  </div>
                </div>
                {/* Tableau des quartiers et avenues */}
                <Table responsive>
                  <thead>
                    <tr
                      style={{
                        backgroundColor: '#dedede',
                        fontWeight: 'bolder',
                      }}
                    >
                      <td>Commune</td>
                      <td>Quartier</td>
                      <td>Nbre Av</td>
                      <td>Superviseur</td>
                      <td>Plus</td>
                    </tr>
                  </thead>
                  <tbody>
                    {quartier &&
                      quartier.map((index, key) => {
                        return (
                          <tr key={key}>
                            <td>{index.commune}</td>
                            <td>{index.quartier}</td>
                            <td
                              style={{ width: '100px', cursor: 'pointer' }}
                              onClick={() => openListeFonction(index.avenues)}
                            >
                              00{index.avenues.length}
                            </td>
                            <td
                              style={{
                                color: `${
                                  !isEmpty(index.superviseur) ? 'black' : 'red'
                                }`,
                                cursor: 'pointer',
                              }}
                              onClick={(e) => selectQ(e, index)}
                            >
                              {!isEmpty(index.superviseur)
                                ? index.superviseur[0].nom
                                : 'Affectez un superviseur'}
                            </td>
                            <td
                              style={{ cursor: 'pointer' }}
                              onClick={(e) => openFonctionCalcul(e, index)}
                            >
                              Plus
                            </td>
                          </tr>
                        )
                      })}
                  </tbody>
                </Table>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <Popup
          visible={openQuartier}
          setVisible={setOpenQuartier}
          title="Ajouter le quartier"
        >
          <AjouterQuartier load={loadingAvenue} />
        </Popup>
        <Popup
          visible={modificationQuartier}
          setVisible={setModification}
          title="Modifier"
        >
          <AjouterQuartier
            quartierProps={quartierSelect}
            load={loadingAvenue}
          />
        </Popup>
        <Popup
          visible={openavenue}
          setVisible={setOpenAvenue}
          title="Ajouter l'avenue"
        >
          <EntiteAvenue />
        </Popup>
        <Popup visible={openliste} setVisible={setOpenListe} title="">
          <ListAvenue avenue={dataList} />
        </Popup>
        {dataQuartier && (
          <Popup
            visible={openCalcul}
            setVisible={setOpenCalcul}
            title={`Calcul financier, quartier ${dataQuartier.quartier}`}
          >
            <FormCalculFin quartier={dataQuartier} />
          </Popup>
        )}
      </div>
    </>
  )
}

export default Quartier
