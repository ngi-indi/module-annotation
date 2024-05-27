import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate,useLocation } from "react-router-dom";
import Navbarcustom   from "../navbar";
import { Container, Row, Col, Button } from 'react-bootstrap';

{/* 
import React, { useContext, useState,useEffect } from "react";

//import CustomNav from "../CustomNav";<CustomNav />
//import { userData } from "../../helpers";//{username}
import { Link, useNavigate,useLocation } from "react-router-dom";
import Navbarcustom   from "../navbar";
import { Container, Row, Col, Button } from 'react-bootstrap';

import { UserContext } from "../../context/UserContext";



const DashboardPage = () => {

  const { user, setUser } = useContext(UserContext)

  useEffect(() => {
    console.log("Dashboard user:", user);  // Debugging line to check user
  }, [user]);

  console.log(user);
  const navigate = useNavigate();
  const location = useLocation();

  //console.log(location.pathname);

  const handleAnnotationPage = () => {//cambiare nome della funzione
  
    navigate("/annotation");
  };
  const handleFrasi_classificate= () => {//messa per provare la get
  
    navigate("/Frasi_Classificate");
  };

  return (
    <div className="dashboard">
      <Navbarcustom />
      <div class="d-flex flex-column content">
        <h2>Welcome {user?.username}</h2>
        <p>What do you want to do?</p>
        <Container>
          <Row className="mt-3">
            <Col className="d-flex justify-content-around">
              <Button onClick={handleAnnotationPage} variant="primary" class="mt-2">
                View frasi da classificare
              </Button>
              <Button onClick={handleFrasi_classificate} variant="primary" class="mt-2">
                View frasi che hai già classificato
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    
  );

};

export default DashboardPage;

*/}

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const auth = useAuth();

  const user =JSON.parse(auth.user) ;

  console.log("user",typeof user,user);
  //console.log("token",typeof auth.token);
  
  try {
    //const userjson = JSON.parse(user)
    console.log("username",(user.username));
    //console.log("userjson",typeof userjson.username)
    //console.log("user plain",user.username)
  }
  catch (e) {
    console.log("error",e);
  }
  
  const handleAnnotationPage = () => {//cambiare nome della funzione
  
    navigate("/annotation");
  };
  const handleFrasi_classificate= () => {//messa per provare la get
  
    navigate("/Frasi_Classificate");
  };

  return (
    <div className="dashboard">
      <Navbarcustom />
      <div class="d-flex flex-column content">
        <h2>Welcome {user?.username}</h2>
        <p>What do you want to do?</p>
        <Container>
          <Row className="mt-3">
            <Col className="d-flex justify-content-around">
              <Button onClick={handleAnnotationPage} variant="primary" class="mt-2">
                View frasi da classificare
              </Button>
              <Button onClick={handleFrasi_classificate} variant="primary" class="mt-2">
                View frasi che hai già classificato
              </Button>
            </Col>
          </Row>
        </Container>
      </div>
    </div>
    
  );

};

export default DashboardPage;