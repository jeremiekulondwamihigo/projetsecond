import React, { useContext, useEffect } from 'react'
import PerfectScrollbar from 'perfect-scrollbar'
import { Route, Switch, useLocation } from 'react-router-dom'

import DemoNavbar from 'components/Navbars/DemoNavbar.jsx'
import Sidebar from 'components/Sidebar/Sidebar.jsx'

import { routes } from 'routes.jsx'
import { CreateContexte } from 'ContextAll'
import UserConnect from 'views/UserConnect'
import { useDispatch } from 'react-redux'
import { readEleveEt } from 'Redux/Eleves'
import { readOptions } from 'Redux/Option'
import { readInfoEtab } from 'Redux/InfoEtab'
import { readActiveYear } from 'Redux/YearActive'
import { readRecru } from 'Redux/Recruter'

var ps

function Dashboard(props) {
  const mainPanel = React.useRef()
  const location = useLocation()
  const { user } = useContext(CreateContexte)

  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(mainPanel.current)
      document.body.classList.toggle('perfect-scrollbar-on')
    }
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
        document.body.classList.toggle('perfect-scrollbar-on')
      }
    }
  })
  React.useEffect(() => {
    mainPanel.current.scrollTop = 0
    document.scrollingElement.scrollTop = 0
  }, [location])

  const dispatch = useDispatch()
  useEffect(() => {
    if (user && user.fonction === 'etablissement') {
      const etab = user.data[0].codeEtablissement
      dispatch(readEleveEt(etab))
      dispatch(readOptions(etab))
      dispatch(readInfoEtab(etab))
      dispatch(readRecru(etab))
    }
    dispatch(readActiveYear())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])
  return (
    <UserConnect>
      <div className="wrapper">
        <Sidebar
          {...props}
          routes={routes(user.fonction)}
          bgColor="black"
          activeColor="info"
        />
        <div className="main-panel" ref={mainPanel}>
          <DemoNavbar {...props} />
          <Switch>
            {routes(user.fonction).map((prop, key) => {
              return (
                <Route
                  path={prop.layout + prop.path}
                  component={prop.component}
                  key={key}
                />
              )
            })}
          </Switch>
        </div>
      </div>
    </UserConnect>
  )
}

export default Dashboard
