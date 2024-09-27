import React, { useState } from "react";
import { Col, Row,Button, Input, Nav, Container } from "reactstrap";
import { Alert,Toast, Form } from "react-bootstrap";
//import { userData } from "../../helpers";
import { useAuth,storeUser } from "../../context/AuthProvider";
import Navbarcustom from "../navbar";
import axios from "axios";
import { waitFor } from "@testing-library/react";
import { propTypes } from "react-bootstrap/esm/Image";
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';





  const UserProfilePage =  () => {
    const [changedUser,SetChangedUser] = useState({
      email: "",
      password: "",
      username: "",
      id:"",
      "lista_bias":"" });
    
    const [showFeedback, setShowFeedback] = useState(false);
    const [type, setType] = useState("success");
    const [message, setMessage] = useState("");
    
    const handleInputChange = (e) => {
      console.log(e.target);
      let { name, value } = e.target;
      if(name==="lista_bias"){
        const elementsArray = value.split(';').map(element => element.trim());
        //console.log("elementsArray",elementsArray);
        value=JSON.stringify(elementsArray.filter(element => element !== ""));
      }
      console.log("name",name,"value",value);
      SetChangedUser({
        ...changedUser,
        [name]: value
      });
      console.log("changedUser.lista_bias",changedUser);
    };
    const auth = useAuth();
    const user =JSON.parse(auth.user || '{}') ;
    //console.log(user)
    const { username, email, id ,lista_bias} = user;

    //-----------------------------------------

    const handleUserChange =async () => {
        console.log("changedUser",changedUser);
          
        let user1 = JSON.parse(auth.user || '{}');

        
        if(changedUser.email){
          user1.email=changedUser.email;
        }
        if(changedUser.username){
          user1.username=changedUser.username;
        }
        if(changedUser.lista_bias){
          user1.lista_bias=JSON.parse(changedUser.lista_bias);
        }

        console.log("user1",user1);
        //auth.storeUser(user1); DA SISTEMARE
        //localStorage.setItem("user",JSON.stringify(user1));

        const response =await axios.put(`http://localhost:1337/api/users/${id}`, {
          username: user1.username,
            email: user1.email,
            //password: user.password,
            lista_bias: user1.lista_bias
          }, {
          headers: {
            Authorization: `Bearer ${user.jwt}`
            
          },
        });
        if(response.status===200){
          toast.success("Profile updated successfully!", {
            position: "top-center"
          });
        }else{
          toast.error("An error occurred while updating the profile!", {
            position: "top-center"
          });
        }
        //auth.storeUser(user1);// DA SISTEMARE
        localStorage.setItem("user",JSON.stringify(user1));
        console.log("user",localStorage.getItem("user"));
        console.log("response",response);
      }



    const TextForJson=()=>{
      if(changedUser.lista_bias){
        const input = changedUser.lista_bias; 

        const elementsArray = input.split(';').map(element => element.trim());
        
        const elementsArrayJson = JSON.stringify(elementsArray.filter(element => element !== ""));
      
      }
    }

    const TextForForm=(text)=>{
      let text2=text.replace(/"/g, '');
      text2=text2.replace('[','');
      text2=text2.replace(']','');
      text2=text2.replace(/,/g, ';');
      return text2;
    };
    
    return (
      <div>
        <ToastContainer />
        <Navbarcustom />
        <Row className="profile">
          <Col sm="12" md={{ size: 4, offset: 4 }}>
            <div className="card content">

              <Col sm="12" md={{size: 8, offset: 2}}>
                <h2 class="center-align">Account settings</h2>
                <p class="center-align">Manage your account details, update your personal information, and change your password.</p>

                <Form>

                  <Form.Group className="mb-3" controlId="username">
                    <Form.Label>Username</Form.Label>
                    <Form.Control type="string" defaultValue={username} onChange={handleInputChange} name="username"/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="email">
                    <Form.Label>Email address</Form.Label>
                    <Form.Control type="email" defaultValue={email} onChange={handleInputChange} name="email"/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>New password</Form.Label>
                    <Form.Control type="email" placeholder=""/>
                  </Form.Group>

                  <Form.Group className="mb-3" controlId="password">
                    <Form.Label>Confirm new password</Form.Label>
                    <Form.Control type="email" placeholder=""/>
                  </Form.Group>
                  <Form.Group className="mb-3" controlId="TextareaBias">
                    <Form.Label>Excluded topics</Form.Label>
                    <br></br>
                    <Form.Control as="textarea" rows={3} defaultValue={TextForForm(JSON.stringify(lista_bias))}
                                  onChange={handleInputChange} name="lista_bias" spellCheck="false"/>
                  </Form.Group>

                </Form>
              </Col>

              <Button onClick={handleUserChange} variant="primary" className="mt-2" type="submit">
              Save this settings
              </Button>
            </div>
          </Col>
        </Row>
      </div>
    );
  };
  
  export default UserProfilePage;