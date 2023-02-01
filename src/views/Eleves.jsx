import React from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'
import BasicTabs from 'Controls/Tabs'
import Recruter from './Etablissement/Recruter.jsx'
import ElevesInscrit from './Etablissement/ElevesInscrit.jsx'
import { Person, People } from '@mui/icons-material'

function Eleves() {
  const titres = [
    { id: 0, label: 'Recruter', icon: <Person /> },
    { id: 1, label: 'Inscrits', icon: <People /> },
  ]
  const component = [
    { id: 0, component: <Recruter /> },
    { id: 1, component: <ElevesInscrit /> },
  ]
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <BasicTabs titres={titres} components={component} />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Eleves
