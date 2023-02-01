import React from 'react'
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

import { routes } from '../Routes.jsx'
import Popup from 'Kunafazi/Static/Popup.jsx'
import CreateLogin from 'Kunafazi/Pages/CreateLogin.jsx'
import { useState } from 'react'
import { LogOut } from 'Kunafazi/Static/Liens.jsx'
import { Loading } from 'Kunafazi/Static/Liens.jsx'
import { lien_read } from 'Kunafazi/Static/Liens.jsx'
import { isEmpty } from 'Kunafazi/Static/Liens.jsx'

function Header(props) {
  const [isOpen, setIsOpen] = React.useState(false)
  const [dropdownOpen, setDropdownOpen] = React.useState(false)
  const [color, setColor] = React.useState('transparent')
  const sidebarToggle = React.useRef()
  const location = useLocation()
  const [open, setOpen] = useState(false)
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
    routes('all').map((prop) => {
      if (window.location.href.indexOf(prop.layout + prop.path) !== -1) {
        brandName = `${prop.name}`
      }
      return null
    })

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

  const [item, loading] = Loading(`${lien_read}/readuser`)
  const { login } = item
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
              <Input placeholder="Search..." />
              <InputGroupAddon addonType="append">
                <InputGroupText>
                  <i className="nc-icon nc-zoom-split" />
                </InputGroupText>
              </InputGroupAddon>
            </InputGroup>
          </form>
          <Nav navbar>
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
                <Link to="/params/quartier" style={{ textDecoration: 'none' }}>
                  <DropdownItem tag="a">Quartier</DropdownItem>
                </Link>
                {!isEmpty(login) && login.fonction === 'admin' && (
                  <DropdownItem tag="a" onClick={() => setOpen(true)}>
                    Créer un Login
                  </DropdownItem>
                )}
              </DropdownMenu>
            </Dropdown>

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
      <Popup visible={open} setVisible={setOpen} title="Créer un login">
        <CreateLogin />
      </Popup>
    </Navbar>
  )
}

export default Header
