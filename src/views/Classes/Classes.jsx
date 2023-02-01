import React, { useState, useRef, useEffect } from 'react'
import { Card, Row, Col } from 'reactstrap'
import './style.css'
import { ProgressBar } from 'primereact/progressbar'
import { Loading, lien_read, isEmpty } from 'Utils.jsx'
import { Menu } from 'primereact/menu'
import axios from 'axios'
import CoursList from './CoursList'
import Domaine from './Domaine'
import DialogDemo from 'Controls/Popup'
import SousDomaine from './SousDomaine'
import Cours from './CoursEB'
import Autres from './Autres'
import CustomizedAccordions from 'Controls/Accordion'

function Classes() {
  const [niveauSelect, setNiveauSelect] = useState()
  const [openDomaine, setOpenDomaine] = useState(false)
  const [openSousDomaine, setOpenSousDomaine] = useState(false)
  const [openCours, setOpenCours] = useState(false)
  const [openAutre, setOpenAutre] = useState(false)

  const menu = useRef(null)
  const menusecond = useRef(null)
  const itemss = [
    {
      label: 'Parametrage',
      items: [
        {
          label: 'Domaine',
          command: () => {
            setOpenDomaine(true)
          },
        },
        {
          label: 'Sous domaine',
          command: () => {
            setOpenSousDomaine(true)
          },
        },
        {
          label: 'Cours',
          command: () => {
            setOpenCours(true)
          },
        },
        {
          label: 'Autres',
          command: () => {
            setOpenAutre(true)
          },
        },
      ],
    },
  ]
  const item_option = [
    {
      label: 'Parametrage',
      items: [
        {
          label: 'Cours',
          command: () => {
            setOpenCours(true)
          },
        },
        {
          label: 'Autres',
          command: () => {
            setOpenAutre(true)
          },
        },
      ],
    },
  ]

  const config = {
    headers: {
      'Content-Type': 'application/json',
      Authorization: 'Bearer ' + localStorage.getItem('token'),
    },
  }
  const [items, loading] = Loading(`${lien_read}/readsectionoption`, config)
  const [optionSelect, setOptionSelect] = useState({ option: '' })
  const niveau = [
    { id: 1, title: '1', color: '#CA1' },
    { id: 2, title: '2', color: '#005' },
    { id: 3, title: '3', color: '#A02' },
    { id: 4, title: '4', color: '#0A1' },
  ]
  const educationDeBase = [
    { id: 7, title: '7', color: '#CA1' },
    { id: 8, title: '8', color: '#005' },
  ]
  const OnEducationDeBase = (event, data, valeur) => {
    if (valeur) {
      menu.current.toggle(event)
      setNiveauSelect(data)
    } else {
      menusecond.current.toggle(event)
      setNiveauSelect(data)
    }
  }
  const [coursFound, setCoursFound] = useState(null)
  const loadingCours = () => {
    const option = !optionSelect.id
      ? 'Education de Base'
      : optionSelect.code_Option
    axios
      .get(`${lien_read}/coursimple/${niveauSelect.id}/${option}`, config)
      .then((response) => {
        if (!isEmpty(response.data)) {
          setCoursFound(Array.from(response.data))
        } else {
          setCoursFound(null)
        }
      })
  }
  useEffect(() => {
    if (niveauSelect) {
      loadingCours()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [niveauSelect, optionSelect])

  return (
    <div className="content">
      <Menu model={itemss} popup ref={menu} id="popup_menu" />
      <Menu model={item_option} popup ref={menusecond} id="popup_option" />
      <Card>
        <Row>
          <Col md="3">
            {loading ? (
              <ProgressBar
                mode="indeterminate"
                style={{ height: '1px' }}
              ></ProgressBar>
            ) : (
              <div className="accordion-demo">
                <p
                  onClick={() => setOptionSelect('education')}
                  style={{ cursor: 'pointer', margin: '10px' }}
                >
                  Education de base
                </p>
                <CustomizedAccordions
                  data={items}
                  setOptionSelect={setOptionSelect}
                />
              </div>
            )}
          </Col>
          <Col md="9">
            <div className="information">
              <p className="options">
                {optionSelect !== 'education' &&
                !isEmpty(optionSelect.option) ? (
                  <span>{optionSelect.option}</span>
                ) : (
                  <>
                    <span style={{ marginLeft: '10px' }}>
                      {' '}
                      Education de base
                    </span>
                  </>
                )}{' '}
              </p>
              {optionSelect !== 'education' && !isEmpty(optionSelect.option)
                ? niveau.map((index) => {
                    return (
                      <div
                        className="niveau"
                        key={index.id}
                        style={{
                          backgroundColor: `${index.color}`,
                          cursor: 'pointer',
                        }}
                        onClick={(e) => OnEducationDeBase(e, index, false)}
                        aria-controls="popup_option"
                        aria-haspopup
                      >
                        {index.title}
                        <sup style={{ marginRight: '5px' }}>
                          {index.id > 1 ? 'eme' : 'ere'}
                        </sup>
                        {optionSelect.option.substr(0, 1)}
                      </div>
                    )
                  })
                : educationDeBase.map((index) => {
                    return (
                      <div
                        className="niveau"
                        key={index.id}
                        style={{
                          backgroundColor: `${index.color}`,
                          cursor: 'pointer',
                        }}
                        onClick={(e) => OnEducationDeBase(e, index, true)}
                        aria-controls="popup_menu"
                        aria-haspopup
                      >
                        {index.title}
                        <sup style={{ marginRight: '5px' }}>eme</sup>EB
                      </div>
                    )
                  })}
            </div>
            <div>
              {!coursFound && (
                <ProgressBar
                  mode="indeterminate"
                  style={{ height: '1px', margin: '2px' }}
                ></ProgressBar>
              )}
              <div style={{ marginTop: '15px' }}>
                {coursFound && <CoursList cours={coursFound} edit={true} />}
              </div>
            </div>
          </Col>
        </Row>
      </Card>
      {niveauSelect && (
        <DialogDemo
          visible={openDomaine}
          setVisible={setOpenDomaine}
          title="Domaine"
        >
          <Domaine niveau={niveauSelect.id} />
        </DialogDemo>
      )}
      {niveauSelect && (
        <DialogDemo
          visible={openSousDomaine}
          setVisible={setOpenSousDomaine}
          title="Sous domaine"
        >
          <SousDomaine niveau={niveauSelect.id} />
        </DialogDemo>
      )}
      {niveauSelect && (
        <DialogDemo
          visible={openCours}
          setVisible={setOpenCours}
          title="Ajouter un cours"
        >
          <Cours
            niveau={niveauSelect.id}
            loadingCours={loadingCours}
            option={optionSelect}
          />
        </DialogDemo>
      )}
      {niveauSelect && (
        <DialogDemo
          visible={openAutre}
          setVisible={setOpenAutre}
          title="Autres"
        >
          <Autres
            niveau={niveauSelect.id}
            option={
              isEmpty(optionSelect.option)
                ? 'Education de Base'
                : optionSelect.code_Option
            }
          />
        </DialogDemo>
      )}
    </div>
  )
}

export default Classes
