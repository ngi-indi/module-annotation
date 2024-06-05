import axios from "axios";
import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row, Button, FormGroup, Input } from "reactstrap";
import Navbarcustom from "../navbar";
import {Form} from 'react-bootstrap';

const initialUser = { email: "", password: "", username: "" };
const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const navigate = useNavigate();

  const signUp = async () => {
    try {
      const url = `http://localhost:1337/api/auth/local/register`;
      if (user.username && user.email && user.password) {
        const res = await axios.post(url, user);
        if (!!res) {
          setUser(initialUser);
          navigate("/login");
        }
      }
    } catch (error) {
        console.error(error);
    }
  };

  const handleUserChange = ({ target }) => {
    const { name, value } = target;
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  return (
    <div>
      <div>
        <Navbarcustom />
      </div>
    <div class="content" >
    <Row className="register" >
      <Col sm="12" md={{ size: 4, offset: 4 }}>
        <div>
          <h2>Sign up:</h2>

          <Form>

                  <Form.Group className="mb-3" controlId="username" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="string" value={user.username} onChange={handleUserChange} name="username"/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email" >
                    <Form.Label>Indirizzo mail</Form.Label>
                    <Form.Control type="email" value={user.email} onChange={handleUserChange} name="email"/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password" >
                    <Form.Label>Reinserisci la Password</Form.Label>
                    <Form.Control type="email" placeholder="password" value={user.password} onChange={handleUserChange}/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="TextareaBias">
                    <Form.Label>Keyword che vuoi visualizzare:</Form.Label>
                    <br></br>
                    <Form.Text id="avvertimento" muted>
                      Inserire i valori separati da ";".
                    </Form.Text>
                    <Form.Control as="textarea" rows={3} value={user.lista_bias} onChange={handleUserChange} name="lista_bias" spellCheck="false" />
                  </Form.Group>
            </Form>
        {/* 
          <FormGroup>
            <Input
              type="text"
              name="username"
              value={user.username}
              onChange={handleUserChange}
              placeholder="Enter your full name"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="email"
              name="email"
              value={user.email}
              onChange={handleUserChange}
              placeholder="Enter your email"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="password"
              name="password"
              value={user.password}
              onChange={handleUserChange}
              placeholder="Enter password"
            />
          </FormGroup>
          <FormGroup>
            <Input
              type="textarea"
              name="lista_bias"
              value={user.lista_bias}
              onChange={handleUserChange}
              placeholder="Inserisci le keyword che non vuoi visualizzare"
            />
          </FormGroup>
          */} 

          <Button color="primary" onClick={signUp}>
            Sign up
          </Button>
        </div>
      </Col>
    </Row>
    </div>
    </div>
  );
};

export default Registration;