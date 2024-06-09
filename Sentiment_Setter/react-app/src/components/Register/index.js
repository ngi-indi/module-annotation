import axios from "axios";
import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { Col, Row} from "reactstrap";
import Navbarcustom from "../navbar";
import {Form,Button} from 'react-bootstrap';

const initialUser = { email: "", password: "", username: "", lista_bias: "" };
const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };
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

          <Form noValidate validated={validated} onSubmit={handleSubmit}>

                  <Form.Group className="mb-3" controlId="username" >
                    <Form.Label>Username</Form.Label>
                    <Form.Control required type="string" value={user.username} onChange={handleUserChange} name="username"/>
                    <Form.Control.Feedback type="invalid">
                      Please provide an username.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email" >
                    <Form.Label>Indirizzo mail</Form.Label>
                    <Form.Control required type="email" value={user.email} onChange={handleUserChange} name="email"/>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid email.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password" >
                    <Form.Label>Reinserisci la Password</Form.Label>
                    <Form.Control required type="email" placeholder="password" value={user.password} onChange={handleUserChange}/>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid password.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="TextareaBias">
                    <Form.Label>Keyword che vuoi visualizzare:</Form.Label>
                    <br></br>
                    <Form.Text id="avvertimento" muted>
                      Inserire i valori separati da ";".
                    </Form.Text>
                    <Form.Control as="textarea" rows={3} value={user.lista_bias} onChange={handleUserChange} name="lista_bias" spellCheck="false" />
                  </Form.Group>
                  <Button variant="primary" type="submit" onClick={signUp}> SignUp </Button>
            </Form> 

          
        </div>
      </Col>
    </Row>
    </div>
    </div>
  );
};

export default Registration;