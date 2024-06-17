import axios from "axios";
import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { Col, Row} from "reactstrap";
import Navbarcustom from "../navbar";
import {Form,Button} from 'react-bootstrap';
import { waitFor } from "@testing-library/react";
import { ToastContainer,toast } from "react-toastify";

const initialUser = { email: "", password: "", username: "", lista_bias: "" };
const Registration = () => {
  const [user, setUser] = useState(initialUser);
  const [validated, setValidated] = useState(false);
  const navigate = useNavigate();
  
  const handleSubmit = async (event) => {
    event.preventDefault();
    event.stopPropagation();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      setValidated(true);
    } else {
      await signUp();
    }
  };

  const signUp = async () => {
    try {
      const url = `http://localhost:1337/api/auth/local/register`;
      if (user.username && user.email && user.password) {
        const res = await axios.post(url, user);
        if (res.status === 200) {
          setUser(initialUser);
          toast.success("User registrated successfully", { position: "top-center" });
          setTimeout(() => {
            navigate("/login");
          }, 1000); // Delay navigation to allow the user to see the success message
        } else {
          toast.error("Error while saving the user", { position: "top-center" });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("Error while saving the user", { position: "top-center" });
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
        <ToastContainer />
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
                    <Form.Label>Insert a Password</Form.Label>
                    <Form.Control required type="password" placeholder="password" value={user.password} onChange={handleUserChange} name="password"/>
                    <Form.Control.Feedback type="invalid">
                      Please provide a valid password.
                    </Form.Control.Feedback>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="TextareaBias">
                    <Form.Label>Keywords that you don't want to visualize :</Form.Label>
                    <br></br>
                    <Form.Text id="avvertimento" muted>
                      Insert values separated by ";".
                    </Form.Text>
                    <Form.Control as="textarea" rows={3} value={user.lista_bias} onChange={handleUserChange} name="lista_bias" spellCheck="false" />
                  </Form.Group>
                  <Button variant="primary" type="submit">Sign Up</Button>
            </Form> 

          
        </div>
      </Col>
    </Row>
    </div>
    </div>
  );
};

export default Registration;