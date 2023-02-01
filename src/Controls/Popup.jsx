// import React from 'react'
// import { Dialog } from 'primereact/dialog'

// const DialogDemo = ({ visible, children, setVisible, title }) => {
//   const onHide = () => {
//     setVisible(false)
//   }

//   return (
//     <div className="dialog-demo">
//       <div className="card">
//         <Dialog
//           header={title}
//           visible={visible}
//           style={{ width: '50vw' }}
//           onHide={() => onHide()}
//         >
//           {children}
//         </Dialog>
//       </div>
//     </div>
//   )
// }
// export default DialogDemo

import * as React from 'react'
import Dialog from '@mui/material/Dialog'
import DialogContent from '@mui/material/DialogContent'
import DialogTitle from '@mui/material/DialogTitle'
import Slide from '@mui/material/Slide'

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />
})

function Popup({ visible, children, setVisible, title }) {
  const handleClose = () => {
    setVisible(false)
  }

  return (
    <div>
      <Dialog
        open={visible}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogTitle>{title}</DialogTitle>
        <DialogContent>{children}</DialogContent>
      </Dialog>
    </div>
  )
}
export default Popup
