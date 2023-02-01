import React from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'
import Versement from 'Kunafazi/Form/Versement'
import BasicTabs from 'Kunafazi/Control/Tabs'
import { MonetizationOn, DeliveryDining } from '@mui/icons-material'
import Depenses from 'Kunafazi/Control/Depenses'

function Comptabilite() {
  const titres = [
    { id: 0, label: 'Versement', icon: <MonetizationOn /> },
    { id: 1, label: 'Dépenses', icon: <DeliveryDining /> },
  ]
  const component = [
    { id: 0, component: <Versement /> },
    { id: 1, component: <Depenses /> },
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

export default Comptabilite
