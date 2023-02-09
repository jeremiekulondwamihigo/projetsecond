import React, { useContext, useLayoutEffect } from 'react'
import PerfectScrollbar from 'perfect-scrollbar'
import { Route, Switch, useHistory, useLocation } from 'react-router-dom'
import DemoNavbar from 'components/Navbars/DemoNavbar.jsx'
import Sidebar from 'components/Sidebar/Sidebar.jsx'

import { routes } from 'routes.jsx'
import { CreateContexte } from 'ContextAll'
import { useDispatch } from 'react-redux'
import { readEleveEt } from 'Redux/Eleves'
import { readOptions } from 'Redux/Option'
import { readInfoEtab } from 'Redux/InfoEtab'
import { readActiveYear } from 'Redux/YearActive'
import { readRecru } from 'Redux/Recruter'
import { readEleve } from 'Redux/Inscription'

var ps

function Dashboard(props) {
  const mainPanel = React.useRef()
  const location = useLocation()
  const { user } = useContext(CreateContexte)
  const history = useHistory()

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
  useLayoutEffect(() => {
    if (user && user.fonction === 'etablissement') {
      const etab = user.data[0].codeEtablissement
      dispatch(readOptions(etab))
      dispatch(readInfoEtab(etab))
      dispatch(readRecru(etab))
      dispatch(readEleve(etab))
    }
    dispatch(readActiveYear())

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [dispatch])

  useLayoutEffect(() => {
    if (
      (user && user === 'Not authorization to access this id') ||
      user === 'Not authorization to access this route' ||
      !user.fonction
    ) {
      history.push('/users/login')
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return (
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
  )
}

export default Dashboard
