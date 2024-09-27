
import  {React, useContext, useState,useEffect } from "react";
import { Col, Row, Button, FormGroup, Input, Container, Card } from "reactstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
//import { storeUser } from "../../helpers";
import Navbarcustom from "../navbar";
import { UserContext } from "../../context/UserContext";
import { useAuth } from "../../context/AuthProvider";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


const Login = () => {
  localStorage.clear();
  const initialUser={email:"",password:""}
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const auth = useAuth();
  const handleSubmitEvent = (e) => {
    e.preventDefault();
    console.log("input", input);
    if (input.email !== "" && input.password !== "") {
      auth.loginAction(input);
      console.log("auth", auth);
      setTimeout(() => {

      if (auth.user===null||auth.user==='') {
        toast.error("Login failed", { position: "top-center" });
      }
    },1000);
    }else{
      toast.info("Please fill all the fields", { position: "top-center" });
    }
  };

  const handleInput = (e) => {
    const { name, value } = e.target;
    setInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Container>
      <ToastContainer />
      <Navbarcustom />
      <div className="login">
        <Card className="m-5 d-block" id="card">
          <Col sm="8" md={{ size: 4, offset: 4 }}>
            <div>
              <h2 className="center-align">Welcome back</h2>
              <p className="center-align">Thank you for your continued contributions to our review platform</p>
              <FormGroup>
                <Input
                  type="email"
                  name="email"
                  value={input.email}
                  onChange={handleInput}
                  placeholder="Enter your email"
                />
              </FormGroup>
              <FormGroup>
                <Input
                  type="password"
                  name="password"
                  value={input.password}
                  onChange={handleInput}
                  placeholder="Enter password"
                />
              </FormGroup>
              <Button color="primary" onClick={handleSubmitEvent}>
                Login
              </Button>
              <p className="hero-info">
                New to INDI? <Link to="/registration">Sign up</Link>!
              </p>
            </div>
          </Col>
        </Card>
      </div>
    </Container>
  );
};

export default Login;



