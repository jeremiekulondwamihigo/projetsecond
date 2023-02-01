import React, { useState, useContext } from 'react'
import { Loading } from 'Utils.jsx'
import { lien_read } from 'Utils'
import DialogDemo from 'Controls/Popup'
import Option from 'Formulaire/Option'
import { ProgressBar } from 'primereact/progressbar'
import { CreateContexte } from 'ContextAll'
import { Card, CardBody, Table, Row, Col } from 'reactstrap'
import Section from 'Formulaire/Section'

function Tables() {
  const [items, loading] = Loading(`${lien_read}/readsectionoption`)

  const [showDialog, setDialog] = useState(false)
  const [dataChange, setDataChange] = useState()

  const OpenPopup = (data, e) => {
    e.preventDefault()
    setDataChange(data)
    setDialog(true)
  }
  const [open, setOpen] = useState(false)

  return (
    <>
      <div className="content">
        <Row>
          <Col md="12">
            {loading ? (
              <ProgressBar
                mode="indeterminate"
                style={{ height: '6px' }}
              ></ProgressBar>
            ) : (
              <Card>
                <p
                  style={{ margin: '10px', cursor: 'pointer' }}
                  onClick={() => setOpen(true)}
                >
                  Cliquez ici pour ajouter une section
                </p>
                <CardBody>
                  <Table responsive>
                    <thead className="text-primary">
                      <tr>
                        <th>Code section</th>
                        <th>Date</th>
                        <th>Nbre Options</th>
                        <th>Section</th>
                        <th className="text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {items.map((index) => {
                        return (
                          <tr key={index._id}>
                            <td>{index.code_Section}</td>
                            <td>{new Date(index.id).toLocaleDateString()}</td>
                            <td>{index.option.length}</td>
                            <td>{index.section}</td>
                            <td className="text-right">
                              <i
                                className="nc-icon nc-simple-add"
                                onClick={(e) => OpenPopup(index, e)}
                                style={{
                                  marginRight: '20px',
                                  cursor: 'pointer',
                                }}
                              />
                              <i
                                className="nc-icon nc-simple-remove"
                                style={{
                                  marginRight: '10px',
                                  cursor: 'pointer',
                                }}
                              />
                            </td>
                          </tr>
                        )
                      })}
                    </tbody>
                  </Table>
                </CardBody>
              </Card>
            )}
          </Col>
        </Row>
        <DialogDemo
          visible={showDialog}
          setVisible={setDialog}
          title="Ajouter une option"
        >
          {dataChange && <Option donner={dataChange} />}
        </DialogDemo>
        <DialogDemo
          visible={open}
          setVisible={setOpen}
          title="Ajouter une section"
        >
          {items && <Section items={items} />}
        </DialogDemo>
      </div>
    </>
  )
}

export default Tables
