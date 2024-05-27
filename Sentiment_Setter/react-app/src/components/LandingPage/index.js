import React from "react";
import { userData } from "../../helpers";//{username}
import { Link, useNavigate } from "react-router-dom";
import BasicExample   from "../navbar";
import { Container, Row, Col, Button } from 'react-bootstrap';
import Navbarcustom from "../navbar";
import JsonData from "../data/data.json";
import { useState, useEffect } from "react";


const LandingPage = () => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
      setLandingPageData(JsonData);
    }, []);
    const props = { data: landingPageData };
    const { username } = userData();
    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitted");
      }
    const handleChange = (e) => {
        console.log(e.target.value);
    }

    return (
        <div class="landing" >
            <div>
            <Navbarcustom />
            </div>
            <header id="header">
                <div className="intro">
                    <div className="overlay">
                        <Row>
                            <div className=" intro-text">
                                <h1>sentiment analiysis
                                    <span></span>
                                </h1>
                                <p>kkdkkpk kpkpkpk kpkpkpkdpp ppp</p>
                            </div>
                        </Row>
                    </div>
            </div>
        </header>
    </div>   


        
    );

};

export default LandingPage;