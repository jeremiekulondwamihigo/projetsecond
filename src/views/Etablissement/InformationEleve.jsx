import React, { useState } from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'
import { useParams } from 'react-router-dom'
import { useEffect } from 'react'
import { Loading } from 'Utils.jsx'
import { lien_read } from 'Utils'
import Box from '@mui/material/Box'
import LinearProgress from '@mui/material/LinearProgress'
import { Dialog } from 'primereact/dialog'
import Avatar from 'react-avatar-edit'
import { Button } from 'primereact/button'
import img from 'assets/img/bg5.jpg'
import { DateActuelle } from 'Utils'
import { FileCopy, DoDisturbAlt } from '@mui/icons-material'
import './style.css'
import axios from 'axios'
import { lien_create } from 'Utils'

function InformationEleve() {
  const { codeEleve } = useParams()

  useEffect(() => {
    let classe = document.getElementsByClassName('defaultBrand')
    classe.innerHTML = 'JERE'
  }, [codeEleve])

  const [row, loading] = Loading(`${lien_read}/informationEleve/${codeEleve}`)
  const { eleve, inscription, information } = row
  const [imageCrop, setImageCrop] = useState(false)
  const [src, setSrc] = useState(false)
  const [profile, setProfile] = useState([])
  const [pview, setPview] = useState(false)

  const profileFinal = profile.map((item) => item.pview)

  const onClose = () => {
    setPview(null)
  }
  const onCrop = (view) => {
    setPview(view)
  }
  const saveCropImage = () => {
    setProfile([...profile, { pview }])
    setImageCrop(false)
  }

  const save = () => {
    let doc = document.querySelector('#image')
    let docs = document.querySelector('#second')
    console.log(doc, docs.value)
  }
  const handleChangeImage = (e) => {
    console.log(e)
  }

  return (
    <>
      {loading ? (
        <Box sx={{ width: '100%' }}>
          <LinearProgress />
        </Box>
      ) : (
        <div className="content">
          <Row>
            <Col md="12">
              <Card>
                <CardBody>
                  <div className="container-fluid">
                    <div className="row">
                      <div className="col-lg-4 col-md-4 col-sm-12 identification">
                        <p>Identification</p>
                        <div className="profile_img text-center">
                          <div className="flex flex-column justify-content-center align-items-center">
                            <img
                              style={{
                                width: '100px',
                                height: '100px',
                                borderRadius: '50%',
                                objectFit: 'cover',
                                border: '4px solid black',
                              }}
                              onChange={(event) => handleChangeImage(event)}
                              onClick={() => setImageCrop(true)}
                              src={
                                profileFinal.length
                                  ? profileFinal[profileFinal.length - 1]
                                  : img
                              }
                              alt="photoeleve"
                              id="image"
                            />
                            <input type="file" id="second" />
                            <button onClick={() => save()}>Save</button>
                            <Dialog
                              visible={imageCrop}
                              header={() => {
                                return (
                                  <p className="text-2xl font-semibold textColor">
                                    Modifiez la photo de profil
                                  </p>
                                )
                              }}
                              onHide={() => setImageCrop(false)}
                            >
                              <div className="confirmation-content flex flex-column align-items-center">
                                <Avatar
                                  width={500}
                                  height={400}
                                  onCrop={onCrop}
                                  onClose={onClose}
                                  src={src}
                                  shadingColor={'#474649'}
                                  backgroundColor={'#474649'}
                                />
                                <div className="flex flex-column align-items-center mt-1 w-12">
                                  <div className="flex justify-content-around w-12 mt-2">
                                    <Button
                                      onClick={saveCropImage}
                                      label="Save"
                                      icon="pi pi-check"
                                    />
                                  </div>
                                </div>
                              </div>
                            </Dialog>
                          </div>
                        </div>
                        <div className="informationss">
                          <p>
                            Nom Complet :{' '}
                            {`${eleve.nom} ${eleve.postNom} ${eleve.prenom}`}
                          </p>
                          <p>
                            Genre:{' '}
                            {eleve.genre === 'M' ? 'Masculin' : 'Féminin'}
                          </p>
                          <p>Lieu de Naissance : {eleve.lieu_naissance}</p>
                          <p>
                            Lieu de Naissance :{' '}
                            {DateActuelle(eleve.date_Naissance)}
                          </p>
                          <p>
                            Nom du père/Profession : {eleve.nomPere}/
                            {eleve.professionPere}
                          </p>
                          <p>
                            Nom de la mère/Profession : {eleve.nomMere}/
                            {eleve.professionMere}
                          </p>
                          <p>Nom du Tuteur : A coder</p>
                          <p>Contact du tuteur : A coder</p>
                          <div className="mesBouttons">
                            <div className="file">
                              <FileCopy />
                              <span>Fiche d'identification</span>
                            </div>
                            <div className="liberer">
                              <DoDisturbAlt />
                              <span>Libérer</span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 identification">
                        <p>Parcours scolaire</p>
                        {inscription.map((index, key) => {
                          return (
                            <div key={key} className="infoParcours">
                              <table className="tableHead">
                                <thead>
                                  <tr>
                                    <td className="anneeInfo">
                                      Année scolaire {index.annee[0].annee}
                                    </td>
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr>
                                    <td className="contentInfo">
                                      <p>
                                        Ecole:{' '}
                                        {index.etablissement[0].etablissement}
                                      </p>
                                      <p>
                                        Classe : {index.classe[0].niveau}
                                        <sup>e</sup>
                                        {` ${index.classe[0].code_Option}`}
                                      </p>
                                      <p>Application : A coder "TB"</p>
                                      <p
                                        style={{
                                          color: `${
                                            index.classe[0].resultat >
                                            index.resultat
                                              ? 'red'
                                              : 'blue'
                                          }`,
                                        }}
                                      >
                                        Pourcentage : {index.resultat}%
                                        {`${
                                          index.classe[0].resultat >
                                          index.resultat
                                            ? ' Echec'
                                            : ' Reussite'
                                        }`}
                                      </p>
                                    </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                          )
                        })}
                      </div>
                      <div className="col-lg-4 col-md-4 col-sm-12 identification">
                        <p>Toute les Inscriptions</p>
                        {information &&
                          information.map((index, key) => {
                            return (
                              <div key={key} className="infoParcours">
                                <table className="tableHead">
                                  <thead>
                                    <tr>
                                      <td className="anneeInfo">
                                        Année scolaire {index.annee[0].annee}
                                      </td>
                                    </tr>
                                  </thead>
                                  <tbody>
                                    <tr>
                                      <td className="contentInfo">
                                        <p>
                                          Ecole:{' '}
                                          {index.etablissement[0].etablissement}
                                        </p>

                                        <p>
                                          Date : {DateActuelle(index.id)} à{' '}
                                          {new Date(index.id).getHours()}:
                                          {new Date(index.id).getMinutes()}:
                                          {new Date(index.id).getSeconds()}
                                        </p>
                                      </td>
                                    </tr>
                                  </tbody>
                                </table>
                              </div>
                            )
                          })}
                      </div>
                    </div>
                  </div>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      )}
    </>
  )
}

export default InformationEleve
