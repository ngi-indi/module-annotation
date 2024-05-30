
import  {React, useContext, useState,useEffect } from "react";
import { Col, Row, Button, FormGroup, Input, Container, Card } from "reactstrap";
import axios from "axios";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";
//import { storeUser } from "../../helpers";
import Navbarcustom from "../navbar";
import { UserContext } from "../../context/UserContext";
import { useAuth } from "../../context/AuthProvider";


const Login = () => {
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
      return;
    }
    alert("please provide a valid input");
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
      <Navbarcustom/>
      <div className="login" class="content">
      <Card className="m-5 d-block " id="card">

        <Col sm="12" md={{ size: 4, offset: 4 }}>
          <div>
            <h2 className="login">Login:</h2>
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
            <Button color="primary" onClick={(e) => handleSubmitEvent(e)}>
              Login
            </Button>
            <h6>
              Click <Link to="/registration">Here</Link> to sign up
            </h6>
          </div>
        </Col>

      </Card>
      </div>
    </Container>
  );
};

export default Login;



