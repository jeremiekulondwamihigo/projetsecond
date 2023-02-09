import { CircularProgress } from '@mui/material'
import React, {  useEffect } from 'react'
import { Line, Pie } from 'react-chartjs-2'
import { useSelector } from 'react-redux'
import moment from 'moment'
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
import { isEmpty } from 'Utils'
import { useState } from 'react'

function Dashboard() {
  const eleve = useSelector((state) => state.infoEtab)
  const annee = useSelector((state) => state.active)
  const [donner, setDonner] = useState({ total: 0 })

  const loading = () => {
    let a = 0
    for (let i = 0; i < eleve.info[0].dejainscrit.length; i++) {
      a = a + eleve.info[0].dejainscrit[i].nombre
    }
    setDonner({ ...donner, total: a })
  }
  useEffect(() => {
    if (!isEmpty(eleve.info)) {
      loading()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [eleve])

  return (
      <div className="content">
        <Row>
          <Col lg="3" md="6" sm="6">
            <Card className="card-stats">
              <CardBody>
                <Row>
                  <Col md="4" xs="5">
                    <div className="icon-big text-center icon-warning">
                      <i className="nc-icon nc-single-02 text-warning" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Effectif</p>
                      <CardTitle tag="p">
                        {eleve.infoEtab === 'pending' || isEmpty(eleve.info) ? (
                          <CircularProgress size={24} color="info" />
                        ) : (
                          eleve.info[0].eleves.length
                        )}
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
                  {annee.getYear === 'pending' || isEmpty(annee.year) ? (
                    <CircularProgress size={24} color="info" />
                  ) : (
                    `Année scolaire ${annee && annee.year.annee}`
                  )}
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
                      <p className="card-category">Enseignants</p>
                      <CardTitle tag="p">
                        {eleve.infoEtab === 'pending' || isEmpty(eleve.info) ? (
                          <CircularProgress size={24} color="info" />
                        ) : (
                          eleve.info[0].agent.length
                        )}
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
                  {annee.getYear === 'pending' || isEmpty(annee.year) ? (
                    <CircularProgress size={24} color="info" />
                  ) : (
                    `Année scolaire ${annee && annee.year.annee}`
                  )}
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
                      <p className="card-category">Options</p>
                      <CardTitle tag="p">
                        {eleve.infoEtab === 'pending' || isEmpty(eleve.info) ? (
                          <CircularProgress size={24} color="info" />
                        ) : (
                          eleve.info[0].code_option.length
                        )}
                      </CardTitle>
                      <p />
                    </div>
                  </Col>
                </Row>
              </CardBody>
              <CardFooter>
                <hr />
                <div className="stats">
                  <i className="far fa-clock" />
                  {annee.getYear === 'pending' || isEmpty(annee.year) ? (
                    <CircularProgress size={24} color="info" />
                  ) : (
                    `Année scolaire ${annee && annee.year.annee}`
                  )}
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
                      <i className="nc-icon nc-single-02 text-primary" />
                    </div>
                  </Col>
                  <Col md="8" xs="7">
                    <div className="numbers">
                      <p className="card-category">Total inscrit</p>
                      <CardTitle tag="p">
                        {eleve.infoEtab === 'pending' || isEmpty(eleve.info) ? (
                          <CircularProgress size={24} color="info" />
                        ) : (
                          donner.total
                        )}
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
                  Toute les années
                </div>
              </CardFooter>
            </Card>
          </Col>
        </Row>

        <Row>
          <Col md="4">
            <Card>
              <CardHeader>
                <CardTitle tag="h5">Chaque option</CardTitle>
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
              </CardFooter>
            </Card>
          </Col>
          <Col md="8">
            <Card className="card-chart">
              {eleve.infoEtab === 'pending' || isEmpty(eleve.info) ? (
                <CircularProgress size={24} color="info" />
              ) : (
                <>
                  <CardHeader>
                    <CardTitle tag="h5">Statistique d'inscriptions</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Line
                      data={dashboardNASDAQChart.data(
                        eleve.info[0].dejainscrit,
                      )}
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
                      <i className="fa fa-check" /> Ecole créée{' '}
                      {moment(new Date(eleve.info[0].id)).fromNow()}
                    </div>
                  </CardFooter>
                </>
              )}
            </Card>
          </Col>
        </Row>
      </div>
  )
}

export default Dashboard
