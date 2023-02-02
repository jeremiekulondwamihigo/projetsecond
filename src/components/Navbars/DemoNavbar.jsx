import React, { useContext, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import {
  Collapse,
  Navbar,
  NavbarToggler,
  NavbarBrand,
  Nav,
  NavItem,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
  Container,
  InputGroup,
  InputGroupText,
  InputGroupAddon,
  Input,
} from 'reactstrap'

import { routes } from 'routes.jsx'
import routeOther from 'routesOther.jsx'
import { CreateContexte } from 'ContextAll.jsx'
import DialogDemo from 'Controls/Popup'
import DomaineAgent from 'views/DomaineAgent'
import { Paper } from '@mui/material'

function Header(props) {
  const { user, LogOut, setValueRecherche } = useContext(CreateContexte)
  const { data } = user
  const denomination = data[0].denomination
    ? data[0].denomination
    : data[0].etablissement
  const [openDomaine, setOpenDomaine] = useState(false)

  const handleChange = (e) => {
    let target = e.target.value
    setValueRecherche(target)
  }
  const [isOpen, setIsOpen] = React.useState(false)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [color, setColor] = React.useState('transparent')
  const sidebarToggle = React.useRef()
  const location = useLocation()
  const toggle = () => {
    if (isOpen) {
      setColor('transparent')
    } else {
      setColor('dark')
    }
    setIsOpen(!isOpen)
  }

  const dropdownToggle = (e) => {
    setDropdownOpen(!dropdownOpen)
  }
  const getBrand = () => {
    let brandName = 'Default Brand'
    routes(user.fonction).map((prop) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = `${prop.name} ${denomination}`
      }
      return null
    })
    if (brandName === 'Default Brand') {
      routeOther.map((item) => {
        if (window.location.href.indexOf(item.layout + item.path) !== -1) {
          brandName = `${item.brandName} ${denomination}`
        }
        return null
      })
    }
    return brandName
  }
  const openSidebar = () => {
    document.documentElement.classList.toggle('nav-open')
    sidebarToggle.current.classList.toggle('toggled')
  }
  // function that adds color dark/transparent to the navbar on resize (this is for the collapse)
  const updateColor = () => {
    if (window.innerWidth < 993 && isOpen) {
      setColor('dark')
    } else {
      setColor('transparent')
    }
  }
  React.useEffect(() => {
    window.addEventListener('resize', updateColor.bind(this))
  })
  React.useEffect(() => {
    if (
      window.innerWidth < 993 &&
      document.documentElement.className.indexOf('nav-open') !== -1
    ) {
      document.documentElement.classList.toggle('nav-open')
      sidebarToggle.current.classList.toggle('toggled')
    }
  }, [location])
  return (
    // add or remove classes depending if we are on full-screen-maps page or not

    <Navbar
      color={
        props.location.pathname.indexOf('full-screen-maps') !== -1
          ? 'dark'
          : color
      }
      expand="lg"
      className={
        props.location.pathname.indexOf('full-screen-maps') !== -1
          ? 'navbar-absolute fixed-top'
          : 'navbar-absolute fixed-top ' +
            (color === 'transparent' ? 'navbar-transparent ' : '')
      }
    >
      <Container fluid>
        <div className="navbar-wrapper">
          <div className="navbar-toggle">
            <button
              type="button"
              ref={sidebarToggle}
              className="navbar-toggler"
              onClick={() => openSidebar()}
            >
              <span className="navbar-toggler-bar bar1" />
              <span className="navbar-toggler-bar bar2" />
              <span className="navbar-toggler-bar bar3" />
            </button>
          </div>
          <NavbarBrand className="defaultBrand" onClick={() => LogOut()}>
            <p className="defaultBrandparagraphe">{getBrand()}</p>
          </NavbarBrand>
        </div>
        <NavbarToggler onClick={toggle}>
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
          <span className="navbar-toggler-bar navbar-kebab" />
        </NavbarToggler>
        <Collapse isOpen={isOpen} navbar className="justify-content-end">
          <form>
            <InputGroup className="no-border">
              <Input
                placeholder="Search..."
                onChange={(e) => handleChange(e)}
              />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <Nav navbar>
            {user && (
              <Dropdown
                nav
                isOpen={dropdownOpen}
                toggle={(e) => dropdownToggle(e)}
              >
                <DropdownToggle caret nav>
                  <i className="nc-icon nc-settings-gear-65" />
                  <p>
                    <span className="d-lg-none d-md-block">Paramétre</span>
                  </p>
                </DropdownToggle>
                {/* 1 = Nationale, 2=Provinciale, 3=Etablissement */}
                <DropdownMenu right style={{ cursor: 'pointer' }}>
                  {user.fonction === 'nationale' && (
                    <Link
                      to="/params/calendrier"
                      style={{ textDecoration: 'none' }}
                    >
                      <DropdownItem tag="p">Calendrier scolaire</DropdownItem>
                    </Link>
                  )}
                  {user.fonction === 'nationale' && (
                    <Link
                      to="/params/options"
                      style={{ textDecoration: 'none' }}
                    >
                      <DropdownItem tag="p">Options et sections</DropdownItem>
                    </Link>
                  )}
                  {user.fonction === 'nationale' && (
                    <Link
                      to="/params/classe"
                      style={{ textDecoration: 'none' }}
                    >
                      <DropdownItem tag="p">Classes</DropdownItem>
                    </Link>
                  )}
                  {user.fonction === 'nationale' && (
                    <Link
                      to="/params/province"
                      style={{ textDecoration: 'none' }}
                    >
                      <DropdownItem tag="p">Province</DropdownItem>
                    </Link>
                  )}

                  <Link
                    to="/params/personnels"
                    style={{ textDecoration: 'none' }}
                  >
                    <DropdownItem tag="p">Personnels</DropdownItem>
                  </Link>
                  <DropdownItem tag="p" onClick={() => setOpenDomaine(true)}>
                    Domaine agent
                  </DropdownItem>
                  {user.fonction === 'nationale' ||
                    (user.fonction === 'province' && (
                      <Link
                        to="/params/etablissement"
                        style={{ textDecoration: 'none' }}
                      >
                        <DropdownItem tag="p">Etablissements</DropdownItem>
                      </Link>
                    ))}
                </DropdownMenu>
              </Dropdown>
            )}
            <NavItem onClick={(e) => LogOut(e)}>
              <Link to="#pablo" className="nav-link btn-rotate">
                <i className="nc-icon nc-button-power" />
                <p>
                  <span className="d-lg-none d-md-block">Déconnecter</span>
                </p>
              </Link>
            </NavItem>
          </Nav>
        </Collapse>
      </Container>
      {openDomaine && (
        <DialogDemo
          visible={openDomaine}
          setVisible={setOpenDomaine}
          title="Domaine agent"
        >
          <DomaineAgent />
        </DialogDemo>
      )}
    </Navbar>
  )
}

export default Header
