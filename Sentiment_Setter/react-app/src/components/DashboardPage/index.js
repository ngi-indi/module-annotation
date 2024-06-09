import React, { useEffect } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate,useLocation } from "react-router-dom";
import Navbarcustom   from "../navbar";
import { Container, Row, Col, Button,Card,Badge  } from 'react-bootstrap';

const DashboardPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  
  const auth = useAuth();
  console.log("auth",auth);
  const user =JSON.parse(auth.user || '{}') ;

  console.log("user",typeof user,user);
  
  const handleAnnotationPage = () => {//cambiare nome della funzione
    if (user.role === "admin") {
      navigate("/annotation-admin");
    }
    else{
    navigate("/annotation");
    }
  };
  const handleFrasi_classificate= () => {//messa per provare la get
  
    navigate("/Frasi_Classificate");
  };
  const handleAdminPage = () => {//cambiare nome della funzione
    navigate("/admin");
  };
  const AdminRole = () => {
    if (user.role === "admin") {
      return(
        <Button onClick={handleAdminPage} variant="primary" class="mt-2">
          View admin page
        </Button>
      );
    }
  
  };

  return (
    <div className="dashboard">
      <Navbarcustom />
      <div className="content" >
        
        <div class="m-5 d-block">
        <Card style={{ justifyContent:'center',}}>
          <Card.Header >
              <h2>
                Welcome {user?.username} 
                <Badge pill style={{fontSize:'0.5em',verticalAlign:'middle',padding:'0.2em 0.4em ',marginLeft:'0.8em'}}>
                  {user?.role}
                </Badge>
              </h2>
          </Card.Header>
          <Card.Body>
            <h4>Sentence Annotated : insert number of sentences Annotated by the user</h4>
            
            <Col className="d-flex justify-content-around">
            <Button onClick={handleAnnotationPage}>Annotation</Button>
            <AdminRole/>
            </Col>
          </Card.Body>
        </Card>
       
        </div>
      </div>
    </div>
    
  );

};

export default DashboardPage;