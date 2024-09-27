import axios from "axios";
import React, { useState } from "react";
import { Navbar } from "react-bootstrap";
import {Link, useNavigate} from "react-router-dom";
import { Col, Row, FormGroup, Input, Container, Card } from "reactstrap";
import Navbarcustom from "../navbar";
import {Form,Button} from 'react-bootstrap';
import { waitFor } from "@testing-library/react";
import { ToastContainer,toast } from "react-toastify";

const initialUser = { email: "", password: "", username: "", lista_bias: [] };
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
          toast.success("Registration successful! Your account has been created.", { position: "top-center" });
          setTimeout(() => {
            navigate("/login");
          }, 1000); // Delay navigation to allow the user to see the success message
        } else {
          toast.error("An error occurred while saving your user information. Please try again.\n", { position: "top-center" });
        }
      }
    } catch (error) {
      console.error(error);
      toast.error("An error occurred while saving your user information. Please try again.\n", { position: "top-center" });
    }
  };

  const handleUserChange = (e) => {
    console.log(e.target);
    let { name, value } = e.target;
    if(name==="lista_bias"){
      const elementsArray = value.split(';').map(element => element.trim());

      //value=JSON.stringify(elementsArray.filter(element => element !== ""));
      value=elementsArray;
      console.log(value);

    }
    setUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  return (
    <Container>
      <ToastContainer />
      <Navbarcustom />
      <div class="content" >
      <Row className="register" >
        <Col sm="12" md={{ size: 4, offset: 4 }}>
          <div>
            <h2 className="center-align">Sign up</h2>
            <p class="center-align">Join our review platform - your contributions, your crypto rewards</p>

            <Form noValidate validated={validated} onSubmit={handleSubmit}>

              <Form.Group className="mb-3" controlId="username">
                <Form.Label>Username</Form.Label>
                <Form.Control required type="string" placeholder="Enter your username" value={user.username}
                              onChange={handleUserChange} name="username"/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid username
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="email">
                <Form.Label>Email</Form.Label>
                <Form.Control required type="email" placeholder="name@email.com" value={user.email}
                              onChange={handleUserChange} name="email"/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid email address
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="password">
                <Form.Label>Password</Form.Label>
                <Form.Control required type="password" placeholder="Create password" value={user.password}
                              onChange={handleUserChange} name="password"/>
                <Form.Control.Feedback type="invalid">
                  Please provide a valid password
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group className="mb-3" controlId="TextareaBias">
                <Form.Label>Excluded topics</Form.Label>
                <br></br>
                <Form.Control as="textarea" rows={3}
                              placeholder="Specify topics to exclude from review content (separate values with ;)"
                              onChange={handleUserChange} name="lista_bias" spellCheck="false"/>
              </Form.Group>
              <Button variant="primary" type="submit">Sign up</Button>
              <p className="hero-info">
                Already on INDI? <Link to="/registration">Log in</Link>!
              </p>
            </Form>


          </div>
        </Col>
      </Row>
      </div>
    </Container>
  );
};

export default Registration;
