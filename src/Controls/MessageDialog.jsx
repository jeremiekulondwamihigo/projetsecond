import React from 'react'
import { Dialog } from 'primereact/dialog'
import { Button } from 'primereact/button'

function MessageDialog(props) {
  const { showMessage, setShowMessage, message, error } = props
  const dialogFooter = (
    <div className="flex justify-content-center">
      <Button
        label="OK"
        className="p-button-text"
        autoFocus
        onClick={() => setShowMessage(false)}
      />
    </div>
  )
  return (
    <div>
      <Dialog
        visible={showMessage}
        onHide={() => setShowMessage(false)}
        position="top"
        footer={dialogFooter}
        showHeader={false}
        breakpoints={{ '960px': '80vw' }}
        style={{ width: '30vw' }}
      >
        <div className="flex justify-content-center flex-column pt-6 px-3">
          <i
            className="pi pi-check-circle"
            style={{ fontSize: '5rem', color: 'var(--green-500)' }}
          ></i>
          <h5>{error ? 'Erreur' : 'Opération éffectuée'}</h5>
          <p style={{ lineHeight: 1.5, textIndent: '1rem' }}>{message}</p>
        </div>
      </Dialog>
    </div>
  )
}
export default MessageDialog
