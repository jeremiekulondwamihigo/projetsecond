import React, { useEffect, useState } from 'react'
import {
  Button,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  CardTitle,
  FormGroup,
  Form,
  Input,
  Row,
  Col,
} from 'reactstrap'
import { useParams } from 'react-router-dom'
import axios from 'axios'
import { lien_read } from 'Utils.jsx'
import './style.css'

function InfoAgent() {
  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }
  const { codeAgent } = useParams()
  const [agent, setAgent] = useState()
  const loadingAgent = async () => {
    const response = await axios.get(
      `${lien_read}/oneAgent/${codeAgent}`,
      config,
    )
    setAgent(response.data)
  }
  useEffect(() => {
    loadingAgent()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [codeAgent])

  return (
    <>
      {agent && (
        <>
          <div className="content">
            <Row>
              <Col md="4">
                <Card className="card-user">
                  <div className="image">
                    <img
                      alt="..."
                      src={require('assets/img/damir-bosnjak.jpg')}
                    />
                  </div>
                  <CardBody>
                    <div className="author">
                      <a href="#pablo" onClick={(e) => e.preventDefault()}>
                        <img
                          alt="..."
                          className="avatar border-gray"
                          src={require('assets/img/mike.jpg')}
                        />
                        <h6 className="title">{`${agent.nom} ${agent.postnom} ${agent.prenom}`}</h6>
                      </a>
                      <p
                        className={`description ${
                          agent.active ? 'enFonction' : 'bloquer'
                        }`}
                      >
                        {agent.active ? 'En fonction' : 'Agent bloquer'}
                      </p>
                    </div>
                    <p className="description text-center">
                      Dernier Message : <br />
                      Bonjour Monsieur le president de la republique
                      democratique du congo, je suis un enseignant au Complexe
                      scolaire PINSON, j'ai été aggresser par mon employer
                    </p>
                  </CardBody>
                  <CardFooter>
                    <hr />
                    <div className="button-container">
                      <Row>
                        <Col className="ml-auto" lg="3" md="6" xs="6">
                          <h5>
                            2022 <br />
                            <small>Début</small>
                          </h5>
                        </Col>
                        <Col className="ml-auto mr-auto" lg="4" md="6" xs="6">
                          <h5>
                            16 ans <br />
                            <small>Déjà</small>
                          </h5>
                        </Col>
                        <Col className="mr-auto" lg="3">
                          <h5>
                            {agent.agent_save} <br />
                            <small>Save</small>
                          </h5>
                        </Col>
                      </Row>
                    </div>
                  </CardFooter>
                </Card>
                <Card>
                  <CardHeader>
                    <CardTitle tag="h4">Team Members</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <ul className="list-unstyled team-members">
                      <li>
                        <Row>
                          <Col md="2" xs="2">
                            <div className="avatar">
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require('assets/img/faces/ayo-ogunseinde-2.jpg')}
                              />
                            </div>
                          </Col>
                          <Col md="7" xs="7">
                            DJ Khaled <br />
                            <span className="text-muted">
                              <small>Offline</small>
                            </span>
                          </Col>
                          <Col className="text-right" md="3" xs="3">
                            <Button
                              className="btn-round btn-icon"
                              color="success"
                              outline
                              size="sm"
                            >
                              <i className="fa fa-envelope" />
                            </Button>
                          </Col>
                        </Row>
                      </li>
                      <li>
                        <Row>
                          <Col md="2" xs="2">
                            <div className="avatar">
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require('assets/img/faces/joe-gardner-2.jpg')}
                              />
                            </div>
                          </Col>
                          <Col md="7" xs="7">
                            Creative Tim <br />
                            <span className="text-success">
                              <small>Available</small>
                            </span>
                          </Col>
                          <Col className="text-right" md="3" xs="3">
                            <Button
                              className="btn-round btn-icon"
                              color="success"
                              outline
                              size="sm"
                            >
                              <i className="fa fa-envelope" />
                            </Button>
                          </Col>
                        </Row>
                      </li>
                      <li>
                        <Row>
                          <Col md="2" xs="2">
                            <div className="avatar">
                              <img
                                alt="..."
                                className="img-circle img-no-padding img-responsive"
                                src={require('assets/img/faces/clem-onojeghuo-2.jpg')}
                              />
                            </div>
                          </Col>
                          <Col className="col-ms-7" xs="7">
                            Flume <br />
                            <span className="text-danger">
                              <small>Busy</small>
                            </span>
                          </Col>
                          <Col className="text-right" md="3" xs="3">
                            <Button
                              className="btn-round btn-icon"
                              color="success"
                              outline
                              size="sm"
                            >
                              <i className="fa fa-envelope" />
                            </Button>
                          </Col>
                        </Row>
                      </li>
                    </ul>
                  </CardBody>
                </Card>
              </Col>
              <Col md="8">
                <Card className="card-user">
                  <CardHeader>
                    <CardTitle tag="h5">Profil de l'agent</CardTitle>
                  </CardHeader>
                  <CardBody>
                    <Form>
                      <Row>
                        <Col className="pr-1" md="5">
                          <FormGroup>
                            <label>Code agent</label>
                            <Input
                              defaultValue={codeAgent}
                              disabled
                              placeholder="Code agent"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="px-1" md="3">
                          <FormGroup>
                            <label>Nom</label>
                            <Input
                              defaultValue={agent.nom}
                              placeholder="Nom"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="4">
                          <FormGroup>
                            <label htmlFor="exampleInputEmail1">PostNom</label>
                            <Input
                              placeholder="PostNom"
                              defaultValue={agent.postnom}
                              type="postnom"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col className="pr-1" md="6">
                          <FormGroup>
                            <label>Prenom</label>
                            <Input
                              defaultValue={agent.prenom}
                              placeholder="Prenom"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                        <Col className="pl-1" md="6">
                          <FormGroup>
                            <label>Contact</label>
                            <Input
                              defaultValue={agent.telephone}
                              placeholder="Contact"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Address</label>
                            <Input
                              defaultValue="Melbourne, Australia"
                              placeholder="Home Address"
                              type="text"
                            />
                          </FormGroup>
                        </Col>
                      </Row>

                      <Row>
                        <Col md="12">
                          <FormGroup>
                            <label>Message</label>
                            <Input
                              type="textarea"
                              defaultValue="Oh so, your weak rhyme You doubt I'll bother, reading into it"
                            />
                          </FormGroup>
                        </Col>
                      </Row>
                      <Row>
                        <div className="update ml-auto mr-auto">
                          <Button
                            className="btn-round"
                            color="primary"
                            type="submit"
                          >
                            Envoyer Message
                          </Button>
                        </div>
                      </Row>
                    </Form>
                  </CardBody>
                </Card>
              </Col>
            </Row>
          </div>
        </>
      )}
    </>
  )
}

export default InfoAgent
