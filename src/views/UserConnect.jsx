import React, { useContext } from 'react'
import { CreateContexte } from 'ContextAll.jsx'

function UserConnect(props) {
  const { user } = useContext(CreateContexte)

  if (
    (user && user.error === 'Not authorization to access this id') ||
    !user.fonction
  ) {
    window.location.replace('/users/login')
  } else {
    return <>{props.children}</>
  }
}

export default UserConnect
