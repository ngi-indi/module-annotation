import React from "react";
//import CustomNav from "../CustomNav";<CustomNav />
import { userData } from "../../helpers";//{username}
import { Link, useNavigate } from "react-router-dom";
import BasicExample   from "../navbar";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navbarcustom from "../navbar";


const LandingPage = () => {
    const { username } = userData();
    const navigate = useNavigate();
 

    return (
        <div className="landing">
            <Navbarcustom/>
            <div class="d-flex flex-column">
                <h2>Welcome in our site!</h2>
                <h3>You can create an account and start working or read our story</h3>
               <p></p>
            </div>
        </div>
        
    );

};

export default LandingPage;