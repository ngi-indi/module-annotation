
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
{/*
    <form onSubmit={handleSubmitEvent}>
      <div className="form_control">
        <label htmlFor="user-email">Email:</label>
        <input
          type="email"
          id="user-email"
          name="email"
          placeholder="example@yahoo.com"
          aria-describedby="user-email"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-email" className="sr-only">
          Please enter a valid username. It must contain at least 6 characters.
        </div>
      </div>
      <div className="form_control">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          name="password"
          aria-describedby="user-password"
          aria-invalid="false"
          onChange={handleInput}
        />
        <div id="user-password" className="sr-only">
          your password should be more than 6 character
        </div>
      </div>
      <button className="btn-submit">Submit</button>
    </form>
  );
};

export default Login;


const start = { password: "", identifier: "" };

const Login = () => {
  const [user, setUser] = useContext(UserContext);//useState(initialUser)
  const [initialUser, setInitialUser] = useState(start);
  const [loginAttempted, setLoginAttempted] = useState(false);

  const navigate = useNavigate();
  //setUser(initialUser);

  const handleChange = ({ target }) => {
    const { name, value } = target;
    setInitialUser((currentUser) => ({
      ...currentUser,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    const url = `http://localhost:1337/api/auth/local`;
    try {
      if (initialUser.identifier && initialUser.password) {
        const { data } = await axios.post(url, initialUser);
        
        if (data.jwt) {
          
          console.log("data string",data.user);
          // non so perchè non funziona ma se metto tutto in una funzione come 
          // in handleChange() sicur0 funzionerà
          console.log("Before setUser", data.user);

          //updateUserData(data);
          setUser(data);

          

          setLoginAttempted(true);
          //console.log("data",data);
          //navigate("/dashboard");
        }
        
      }
    } catch (error) {
      console.error("Error logging in:");
      //toast.error(error.message, {
        //hideProgressBar: true,
      //});
    }
  };

  const updateUserData = (data) => {
    setUser(JSON.stringify({
      username: data.user.username,
      jwt: data.jwt,
      id: data.user.id,
      email: data.user.email
    }));
  }
  
  useEffect(() => {
    console.log("After setUser", user);
    if (user && loginAttempted) {
      //console.log("user",user);
      navigate("/dashboard");
      
    }
  }, [user, loginAttempted, navigate]);


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
                name="identifier"
                value={initialUser.identifier}
                onChange={handleChange}
                placeholder="Enter your email"
              />
            </FormGroup>
            <FormGroup>
              <Input
                type="password"
                name="password"
                value={initialUser.password}
                onChange={handleChange}
                placeholder="Enter password"
              />
            </FormGroup>
            <Button color="primary" onClick={(e) => handleLogin(e)}>
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

*/}


