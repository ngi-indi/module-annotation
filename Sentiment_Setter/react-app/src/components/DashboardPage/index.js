import React from "react";
//import CustomNav from "../CustomNav";<CustomNav />
import { userData } from "../../helpers";//{username}
import { Link, useNavigate,useLocation } from "react-router-dom";
import Navbarcustom   from "../navbar";
import { Container, Row, Col, Button } from 'react-bootstrap';


const DashboardPage = () => {
  const { username } = userData();
  const navigate = useNavigate();
  const location = useLocation();

  console.log(location.pathname);

  const handleAnnotationPage = () => {//cambiare nome della funzione
  
    navigate("/annotation");
  };
  const handleFrasi_classificate= () => {//messa per provare la get
  
    navigate("/Frasi_Classificate");
  };

  return (
    <div className="dashboard">
      <Navbarcustom />
      <div class="d-flex flex-column">
        <h2>Welcome {username}</h2>
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