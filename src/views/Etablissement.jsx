import React from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'
import EtablissementTable from './Etablissement/TableEtablissement.jsx'

function Etablissement() {
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <EtablissementTable />
              </CardBody>
            </Card>
          </Col>
        </Row>
      </div>
    </>
  )
}

export default Etablissement
