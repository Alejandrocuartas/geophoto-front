import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Container from 'react-bootstrap/Container';
import Form from 'react-bootstrap/Form';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { BiImageAdd } from 'react-icons/Bi'
import { useGlobalState } from '../context';

import './styles/Navbar.css'
import LoginModal from './LoginModal';
import SignupModal from './SignupModal';
import NewPhotoModal from './NewPhotoModal';

const NavBar = () => {
  const { logged, user } = useGlobalState()
  const [isOpenLogin, setOpenLogin] = useState(false)
  const [isOpenSignup, setOpenSignup] = useState(false)
  const [isOpenNewPhoto, setOpenNewPhoto] = useState(false)
  const openLogin = () => {
    setOpenLogin(true)
  }
  const openSignup = () => {
    setOpenSignup(true)
  }
  const openNewPhoto = () => {
    if (!logged) {
      return alert("Please Sign Up.")
    }
    setOpenNewPhoto(true)
  }
  return (
    <Navbar className='bg-default' expand="lg">
      <Container fluid>
        <Navbar.Brand href="#">
          <img className='brand' src="https://th.bing.com/th/id/OIP.UePFyP0eu2qCIV7W2lUe4wHaHa?pid=ImgDet&rs=1" alt="logo" />
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbarScroll" />
        <Navbar.Collapse id="navbarScroll">
          <Nav
            className="me-auto my-2 my-lg-0"
            style={{ maxHeight: '100px' }}
            navbarScroll
          >
            {
              logged ? (<Navbar.Text>
                Signed in as: <a href="#">{user.username}</a>
              </Navbar.Text>) : (
                <NavDropdown title="Log In" id="navbarScrollingDropdown">
                  <NavDropdown.Item onClick={openLogin}>
                    Log In
                  </NavDropdown.Item>
                  <NavDropdown.Divider />
                  <NavDropdown.Item onClick={openSignup}>
                    Sign Up
                  </NavDropdown.Item>
                </NavDropdown>
              )
            }
          </Nav>
          <Button onClick={openNewPhoto} variant="light">
            <BiImageAdd style={{ height: "30px", width: "30px" }}></BiImageAdd>
          </Button>
        </Navbar.Collapse>
      </Container>
      <LoginModal isOpen={isOpenLogin} show={openLogin} handleClose={() => setOpenLogin(false)}></LoginModal>
      <SignupModal isOpen={isOpenSignup} show={openSignup} handleClose={() => setOpenSignup(false)}></SignupModal>
      <NewPhotoModal isOpen={isOpenNewPhoto} show={openNewPhoto} handleClose={() => setOpenNewPhoto(false)}></NewPhotoModal>
    </Navbar >
  );
}

export default NavBar;