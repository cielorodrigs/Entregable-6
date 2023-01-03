import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, useNavigate } from 'react-router-dom';
import CartSideBars from './CartSideBars';

const NavBar = () => {
   const [show, setShow] = useState(false);
   const login = localStorage.getItem('token');
   const navigate = useNavigate()
   const handleClose = () => setShow(false);
   const handleShow = () => setShow(true);

   return (
      <div className='navbar'>

         <Navbar style={{backgroundColor: "red"}} className="navbar" >
            <Container>
               <Navbar.Brand as={Link} to='/' className="navbar-name">Total Store</Navbar.Brand>
               <Navbar.Toggle aria-controls="responsive-navbar-nav" />
               <Navbar.Collapse id="responsive-navbar-nav">
                  <Nav className="me-auto">
                  </Nav>
                  <Nav >
                     <Nav.Link as={Link} to='/login' eventKey={2}  >
                        <i style={{color: "#6a6a6a"}} className="bi bi-person"  ></i>
                     </Nav.Link>
                     <Nav.Link as={Link} to='/purchases' eventKey={2}  >
                        <i style={{color: "#6a6a6a"}} className="bi bi-bag"></i>
                     </Nav.Link>
                     <Nav.Link onClick={() => login ? handleShow() : navigate('/login') } eventKey={2} >
                        <i style={{color: "#6a6a6a"}} className="bi bi-cart3"></i>
                     </Nav.Link>
                  </Nav>
               </Navbar.Collapse>
            </Container>
         </Navbar>

         <CartSideBars show={show} handleClose={handleClose} setShow={setShow} />

      </div>
   );
};

export default NavBar;