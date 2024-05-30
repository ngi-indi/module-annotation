import React, { useState } from "react";
import { Col, Row, Button, FormGroup, Input, Nav } from "reactstrap";
import { userData } from "../../helpers";
import Navbarcustom from "../navbar";

const initialUser = { email: "", password: "", username: "" };


  const UserProfilePage =  () => {
    const { username, email, id } = userData(); 
    const NumFrasi = 10;
    const handleUserChange = () => {
        console.log("ciao");
    }

    return (
      <div>
        <Navbarcustom />
        <Row className="profile">
          <Col sm="12" md={{ size: 4, offset: 4 }}>
            <div className="card content">
              <Col sm="12" md={{ size: 4, offset: 4 }}>
                <h2>Profile data:</h2>
                <div>Username: {username}</div>
                <div>Email: {email}</div>
                <div>Numero di frasi classificate: {NumFrasi}</div>
                {/*<ul>
                  <li>topic da evitare</li>
                   <li>topic da evitare</li> 
                </ul>*/}
                </Col>
                </div>
              
            <Button onClick={handleUserChange} variant="primary" className="mt-2">
              Modifica dati
            </Button>
          </Col>
        </Row>
      </div>
    );
  };
  
  export default UserProfilePage;