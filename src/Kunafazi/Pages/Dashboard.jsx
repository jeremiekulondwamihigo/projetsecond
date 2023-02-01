import axios from 'axios'
import { Converter_Month } from 'Kunafazi/Static/Liens'
import { isEmpty } from 'Kunafazi/Static/Liens'
import { Loading } from 'Kunafazi/Static/Liens'
import { lien_read } from 'Kunafazi/Static/Liens'
import React, { useState, useEffect } from 'react'
import { Line, Pie } from 'react-chartjs-2'
import BackDropFonction from 'Kunafazi/Control/BackDrop'
import {
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  Row,
  Col,
} from 'reactstrap'
import {
  dashboardEmailStatisticsChart,
  dashboardNASDAQChart,
} from 'variables/charts.jsx'
import './style.css'

function Dashboard() {
  const [activeOR, setActiveOr] = useState([])
  const loadingInformation = async () => {
    const response = await axios.get(`${lien_read}/active`)
    setActiveOr(response.data)
  }
  useEffect(() => {
    loadingInformation()
  }, [])
  const chercherActif = (string) => {
    if (!isEmpty(activeOR)) {
      const data = activeOR.filter((x) => x._id === string)

      if (!isEmpty(data)) {
        return data[0].count
      } else {
        return 0
      }
    }
  }
  const today = new Date().getMonth() + 1
  const [total, setTotal] = useState(0)
  const loadingMontantPayer = async () => {
    let day = today < 10 ? `0${today}` : today
    let montant = 0
    const response = await axios.get(
      `${lien_read}/evolutionFin/${day}/${new Date().getFullYear()}`,
    )
    for (let i = 0; i < response.data.length; i++) {
      montant = montant + response.data[i].totalVersement
    }
    setTotal(montant)
  }
  useEffect(() => {
    loadingMontantPayer()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])
  let annee = new Date().getFullYear()

  const [item, loading] = Loading(`${lien_read}/readuser`)

  return (
    <div className="content">
      {loading ? (
        <BackDropFonction open={loading} />
      ) : (
        <>
          <Row>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-globe text-warning" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Clients</p>
                        <CardTitle tag="p">
                          {!isEmpty(activeOR) && chercherActif(true)}
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="fas fa-sync-alt" />
                    Clients actifs, Année {annee}
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-money-coins text-success" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Clients</p>
                        <CardTitle tag="p">
                          {!isEmpty(activeOR) && chercherActif(false)}
                        </CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-calendar" />
                    Clients non actifs Année {annee}
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-vector text-danger" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">Agents</p>
                        <CardTitle tag="p">23</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-clock" />
                    Nombre d'agents Année {annee}
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col lg="3" md="6" sm="6">
              <Card className="card-stats">
                <CardBody>
                  <Row>
                    <Col md="4" xs="5">
                      <div className="icon-big text-center icon-warning">
                        <i className="nc-icon nc-favourite-28 text-primary" />
                      </div>
                    </Col>
                    <Col md="8" xs="7">
                      <div className="numbers">
                        <p className="card-category">
                          {Converter_Month(new Date().getMonth())}-{annee}
                        </p>
                        <CardTitle tag="p">${total}</CardTitle>
                        <p />
                      </div>
                    </Col>
                  </Row>
                </CardBody>
                <CardFooter>
                  <hr />
                  <div className="stats">
                    <i className="far fa-clock" />
                    Montant déjà versé
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>

          <Row>
            <Col md="4">
              <Card>
                <CardHeader>
                  <CardTitle tag="h5">Email Statistics</CardTitle>
                  <p className="card-category">Last Campaign Performance</p>
                </CardHeader>
                <CardBody style={{ height: '266px' }}>
                  <Pie
                    data={dashboardEmailStatisticsChart.data}
                    options={dashboardEmailStatisticsChart.options}
                  />
                </CardBody>
                <CardFooter>
                  <div className="legend">
                    <i className="fa fa-circle text-primary" /> Opened{' '}
                    <i className="fa fa-circle text-warning" /> Read{' '}
                    <i className="fa fa-circle text-danger" /> Deleted{' '}
                    <i className="fa fa-circle text-gray" /> Unopened
                  </div>
                  <hr />
                  <div className="stats">
                    <i className="fa fa-calendar" /> Number of emails sent
                  </div>
                </CardFooter>
              </Card>
            </Col>
            <Col md="8">
              <Card className="card-chart">
                <CardHeader>
                  <CardTitle tag="h5">Statistique clients</CardTitle>
                  <p className="card-category">Annee {annee}</p>
                </CardHeader>
                <CardBody>
                  <Line
                    data={dashboardNASDAQChart.data}
                    options={dashboardNASDAQChart.options}
                    width={400}
                    height={100}
                  />
                </CardBody>
                <CardFooter>
                  <div className="chart-legend">
                    <i className="fa fa-circle text-info" /> Tesla Model S{' '}
                    <i className="fa fa-circle text-warning" /> BMW 5 Series
                  </div>
                  <hr />
                  <div className="card-stats">
                    <i className="fa fa-check" /> Data information certified
                  </div>
                </CardFooter>
              </Card>
            </Col>
          </Row>
        </>
      )}
    </div>
  )
}
// const style = {
//   loader : {
//     height: "100vh",
//     width: "100vw",
//     overflow: "hidden",
//     backgroundColor: "#16191e",
//     position: "absolute"
// },

// loaderdiv : {
//     height: "100px",
//     width: "100px",
//     border: "15px solid #45474b",
//     borderTopColor: "#2a88e6",
//     position: "absolute",
//     margin: "auto",
//     top: 0,
//     bottom: 0,
//     left: 0,
//     right: 0,
//     borderRadius: "50%",
//     animation: spin 1.5s infinite linear;
//     overflow: hidden;
// }
// }
export default Dashboard
