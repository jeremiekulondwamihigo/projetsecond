import React, { useState } from 'react'
import { Card, CircularProgress, Fab } from '@mui/material'
import RecruterForm from 'views/Etablissement/RecruterForm.jsx'
import './style.css'
import { useSelector } from 'react-redux'
import { DateActuelle } from 'Utils.jsx'
import { InputGroup, InputGroupText, InputGroupAddon, Input } from 'reactstrap'
import { CardHeader, CardBody, CardFooter } from 'reactstrap'
import { dashboardEmailStatisticsChart } from 'variables/charts.jsx'
import { Pie } from 'react-chartjs-2'
import Popup from 'Controls/Popup.jsx'
import { Add, Delete, Edit } from '@mui/icons-material'
import { isEmpty, lien_image_admin } from 'Utils.jsx'
import ConfirmDialog from 'Controls/ConfirmDialog.jsx'
import Avatar from '@mui/material/Avatar'
import { useDispatch } from 'react-redux'
import { deleteInfo } from 'Redux/Recruter'

function Recruter() {
  const dispatch = useDispatch()
  const eleve = useSelector((state) => state.recru)
  const [open, setOpen] = useState(false)
  const [update, setUpdate] = useState(false)
  const [dataUpdate, setDataUpdate] = useState()

  const updateFonction = (e, data) => {
    e.preventDefault()
    if (!isEmpty(data)) {
      setDataUpdate(data)
      setUpdate(true)
    } else {
      alert('Data not found')
    }
  }
  const fonction = (e) => {
    e.preventDefault()
    setOpen(true)
  }
  const [confirmDialog, setConfirmDialog] = useState({
    isOpen: false,
    title: '',
    subTitle: '',
  })
  const deleteEleve = (index) => {
    setConfirmDialog({
      ...confirmDialog,
      isOpen: false,
    })
    dispatch(deleteInfo(index))
  }

  const [filterFn, setFilterFn] = useState({
    fn: (items) => {
      return items
    },
  })
  const handleChange = (e) => {
    let target = e.target.value.toUpperCase()

    setFilterFn({
      fn: (items) => {
        if (target === '') {
          return items
        } else {
          return items.filter((x) => x.nom.includes(target))
        }
      },
    })
  }
  return (
    <div className="container">
      <div className="row">
        <div
          className="col-md-3 col-sm-12 col-lg-3"
          style={{ marginBottom: '10px' }}
        >
          <InputGroup className="no-border">
            <Input
              placeholder="Chercher un élève"
              onChange={(e) => handleChange(e)}
            />
            <InputGroupAddon addonType="append">
              <InputGroupText>
                <i className="nc-icon nc-zoom-split" />
              </InputGroupText>
            </InputGroupAddon>
          </InputGroup>
          <div className="carte">
            {eleve.getEleves === 'pending' && eleve.recrutement.length < 1 ? (
              <CircularProgress size={24} color="info" />
            ) : (
              filterFn.fn(eleve.recrutement).map((index, key) => {
                return (
                  <Card
                    variant="outlined"
                    sx={{
                      width: '100%',
                      margin: 0,
                      cursor: 'pointer',
                      padding: '5px',
                      marginBottom: '10px',
                    }}
                    key={key}
                  >
                    <p className="nom">
                      {index.nom + ' ' + index.postNom + ' ' + index.prenom}
                    </p>
                    <p className="autres">Genre : {index.genre}</p>
                    <p className="autres">
                      Né à {index.lieu_naissance}, le{' '}
                      {DateActuelle(index.date_Naissance)}
                    </p>
                    <p className="autres">
                      Code d'inscription : {index.codeInscription}
                    </p>
                    <p className="autres">Code élève : {index.code_eleve}</p>
                    <p className="autres">Téléphone tuteur : ...............</p>
                    <hr className="hr" />

                    <div className="container-footer">
                      <div className="divAvatar">
                        <Avatar
                          alt={index.nom}
                          src={`${lien_image_admin}/${index.filename}`}
                          className="avatar"
                        />
                      </div>
                      <div className="icons foote">
                        <Edit
                          fontSize="small"
                          className="icons edit"
                          onClick={(e) => updateFonction(e, index)}
                        />
                        <Delete
                          fontSize="small"
                          color="secondary"
                          className="icons"
                          onClick={() => {
                            setConfirmDialog({
                              isOpen: true,
                              title:
                                'Voudriez-vous supprimé cette information ?',
                              onConfirm: () => {
                                deleteEleve(index._id)
                              },
                            })
                          }}
                        />
                      </div>
                    </div>
                  </Card>
                )
              })
            )}
          </div>
        </div>
        <div
          className="col-md-9 col-sm-12 col-lg-9"
          style={{ marginBottom: '10px' }}
        >
          <Card>
            <CardHeader>
              <p className="card-category">Last Campaign Performance</p>
              <Fab
                color="primary"
                style={{ position: 'absolute', right: 30, top: 10 }}
                onClick={(e) => fonction(e)}
              >
                <Add />
              </Fab>
            </CardHeader>
            <CardBody style={{ height: '266px' }}>
              <Pie
                data={dashboardEmailStatisticsChart.data}
                options={dashboardEmailStatisticsChart.options}
              />
            </CardBody>
            <CardFooter>
              <hr />
              <div className="stats">
                <i className="fa fa-calendar" /> Inscrit
                {eleve.getEleves === 'pending' ? (
                  <CircularProgress size={24} color="info" />
                ) : (
                  ` ${eleve.recrutement.length} élèves`
                )}
              </div>
            </CardFooter>
          </Card>
        </div>
      </div>
      <Popup visible={open} setVisible={setOpen} title="Recruter">
        <RecruterForm />
      </Popup>
      <Popup visible={update} setVisible={setUpdate} title="Modifier">
        <RecruterForm dataUpdate={dataUpdate} />
      </Popup>
      <ConfirmDialog
        confirmDialog={confirmDialog}
        setConfirmDialog={setConfirmDialog}
      />
    </div>
  )
}

export default Recruter
