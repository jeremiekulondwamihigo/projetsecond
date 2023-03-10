import React, { useContext, useLayoutEffect } from 'react'
import { NavLink, useHistory } from 'react-router-dom'
import { Nav } from 'reactstrap'
// javascript plugin used to create scrollbars on windows
import PerfectScrollbar from 'perfect-scrollbar'
import { CreateContexte } from 'ContextAll'

import logo from 'logo.svg'
import { useSelector } from 'react-redux'
import { CircularProgress } from '@mui/material'

var ps

function Sidebar(props) {
  const { user } = useContext(CreateContexte)

  const sidebar = React.useRef()
  // verifies if routeName is the one active (in browser input)
  const activeRoute = (routeName) => {
    return props.location.pathname.indexOf(routeName) > -1 ? 'active' : ''
  }
  React.useEffect(() => {
    if (navigator.platform.indexOf('Win') > -1) {
      ps = new PerfectScrollbar(sidebar.current, {
        suppressScrollX: true,
        suppressScrollY: false,
      })
    }
    return function cleanup() {
      if (navigator.platform.indexOf('Win') > -1) {
        ps.destroy()
      }
    }
  })
  const history = useHistory()
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
  const activeYear = useSelector((state) => state.active)
  return (
    <div
      className="sidebar"
      data-color={props.bgColor}
      data-active-color={props.activeColor}
    >
      <div className="logo">
        <a href="/admin/dashboard" className="simple-text logo-mini">
          <div className="logo-img">
            <img src={logo} alt="react-logo" />
          </div>
        </a>
        <a href="/admin/dashboard" className="simple-text logo-normal">
          {activeYear.getYear === 'pending' ? <CircularProgress /> : null}
          {activeYear.getYear === 'success' && activeYear.year.annee}
        </a>
      </div>
      <div className="sidebar-wrapper" ref={sidebar}>
        <Nav>
          {props.routes.map((prop, key) => {
            return (
              <li
                className={
                  activeRoute(prop.path) + (prop.pro ? ' active-pro' : '')
                }
                key={key}
              >
                <NavLink
                  to={prop.layout + prop.path}
                  className="nav-link"
                  activeClassName="active"
                >
                  <i className={prop.icon} />
                  <p>{prop.name}</p>
                </NavLink>
              </li>
            )
          })}
        </Nav>
      </div>
    </div>
  )
}

export default Sidebar
