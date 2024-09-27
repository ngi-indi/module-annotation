

import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';
import { Link, Navigate, useLocation } from 'react-router-dom';
import { NavLink } from 'react-router-dom';
import React from 'react';
import { Row } from 'reactstrap';
import  { useAuth } from '../../context/AuthProvider';

const Navbarcustom = () => {
    const auth=useAuth();
    const location = useLocation();

    const handleLogout= async () => {

      auth.logOut();
      //Navigate('/');
    };

    /*const links = [
      <Link to="/login">Login</Link>,
      <Link to="/registration">Signup</Link>,
      <Link to="/dashboard">Dashboard</Link>,
      <Link to="/userProfile">Profilo</Link>,
    ];*/
    const links = [
        { text: 'Dashboard', destination: '/dashboard', scope: ['/userProfile','/annotation','/Frasi_Classificate','/annotation-admin','/admin'],id:'dashboard'},
        { text: 'Settings', destination: '/userProfile', scope: ['/dashboard','/annotation','/Frasi_Classificate'],id:'profilo'},
        { text: 'Log out', onclick:handleLogout, destination:{location}, scope:['/dashboard','/annotation','Frasi_Classificate','/Frasi_Classificate','/annotation-admin','/admin'],id:'logout'},
        { text: 'Log in', destination: '/login', scope:['/login','/register','/landingpage', '/registration','/'],id:'login'},
        { text: 'Sign up', destination: '/registration', scope: ['/login','/registration','/landingpage','/'],id:'signup'},

    ];
  // Function to determine if a link should be active based on the current location
  const visibleLinks = links.filter(link => {
    //return link.scope === location.pathname;
    return link.scope.includes(location.pathname);
  });



  //console.log('visibleLinks',visibleLinks);
  //console.log('location.pathname',location.pathname);
    return (
        <Navbar bg="primary" variant="dark" expand="lg" fixed="top" >
        <Container className="container-fluid">
          <Navbar.Brand href="/">INDI</Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav" className='ml-auto'>
            <Nav className="me-auto">
                {/* Empty Nav to push other Nav items to the right */}
            </Nav>
            <Nav>
            {visibleLinks.map((link) => (
              <Link
                key={link.id}
                to={link.destination?link.destination:''}
                onClick={link.onclick?link.onclick:null}
                className="nav-link">
                {link.text}
              </Link>
            ))}
            </Nav>
            </Navbar.Collapse>
        </Container>
        </Navbar>
    );
};

export default Navbarcustom;

