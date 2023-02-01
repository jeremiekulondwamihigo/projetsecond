import React, { useState } from 'react'
import { Card, CardBody, Row, Col } from 'reactstrap'
import AddProvince from './Province/AddProvince'
import { Button } from 'primereact/button'
import './style.css'
import DialogDemo from 'Controls/Popup'

function Province() {
  const [open, setOpen] = useState(false)
  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            <Card>
              <CardBody>
                <div className="btn-add-province">
                  <Button
                    onClick={() => setOpen(true)}
                    icon="nc-icon nc-simple-add"
                    className="p-button-rounded"
                    aria-label="Filter"
                  />
                </div>
              </CardBody>
            </Card>
          </Col>
        </Row>
        <DialogDemo
          visible={open}
          setVisible={setOpen}
          title="Ajouter une entité"
        >
          <AddProvince />
        </DialogDemo>
      </div>
    </>
  )
}

export default Province
