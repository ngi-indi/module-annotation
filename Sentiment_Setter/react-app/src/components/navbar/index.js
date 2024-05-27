

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Navigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { Row } from 'reactstrap';
import  { useAuth } from '../../context/AuthProvider';

const Navbarcustom = () => {
    const auth=useAuth();
    const location = useLocation();

    const handleLogout= async () => {

      auth.logOut();
  
    };

    const links = [
        { text: 'contact', destination: '#contattaci', scope: ['/']},
        { text: 'Profilo', destination: '/userProfile', scope: ['/dashboard','/annotation','/Frasi_Classificate']},
        { text: 'Logout', onclick:{handleLogout}, destination:'/', scope:['/dashboard','/annotation','Frasi_Classificate','/Frasi_Classificate']},
        { text: 'Login', destination: '/login', scope:['/login','/register','/landingpage','/']},
        { text: 'Signup', destination: '/registration', scope: ['/login','/register','/landingpage','/']},
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
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top" >
        <Container >
          <Navbar.Brand href="/">Sentiment Setter</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='ml-auto'>
            <Nav className="me-auto">
                {/* Empty Nav to push other Nav items to the right */}
            </Nav>
            <Nav>
            {visibleLinks.map((link, index) => (
              <a key={index} 
              href={link.destination} 
              className="nav-link"
              >
                {link.text}
              </a>
            ))}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
};

export default Navbarcustom;

