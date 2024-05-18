

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { Row } from 'reactstrap';

const Navbarcustom = () => {
    const location = useLocation();
    const links = [
        { text: 'Profilo', destination: '/userProfile', scope: ['/dashboard','/annotation','/Frasi_Classificate']},
        { text: 'Logout', destination: '/logout', scope:['/dashboard','/annotation','Frasi_Classificate','/Frasi_Classificate']},
        { text: 'Login', destination: '/login', scope:['/login','/register','/landingpage','/']},
        { text: 'Signup', destination: '/register', scope: ['/login','/register','/landingpage','/']},
        { text: 'Dashboard', destination: '/dashboard', scope: ['/userProfile','/annotation','/Frasi_Classificate']},
    ];
  // Function to determine if a link should be active based on the current location
  const visibleLinks = links.filter(link => {
    
    //return link.scope === location.pathname;
    return link.scope.includes(location.pathname);
  });
  console.log('visibleLinks',visibleLinks);
  console.log('location.pathname',location.pathname);
    return (
        <Navbar bg="primary" variant="dark" expand="lg">
        <Container fluid>
          <Navbar.Brand href="#home">Sentiment Setter</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='ml-auto'>
            <Nav className="me-auto">
                {/* Empty Nav to push other Nav items to the right */}
            </Nav>
            <Nav>
            {visibleLinks.map((link, index) => (
              <Nav.Link
                key={index}
                as={NavLink}
                to={link.destination}
              >
                {link.text}
              </Nav.Link>
            ))}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
};

export default Navbarcustom;

