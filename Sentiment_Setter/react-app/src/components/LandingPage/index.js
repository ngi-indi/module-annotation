import React from "react";
import { useNavigate } from "react-router-dom";
import Navbarcustom from "../navbar";
import JsonData from "../data/data.json";
import { useState, useEffect } from "react";
import img from "D:/roba_da_backup/1_UNICA/2_Magistrale/Reading_course2/Sentiment_Setter/react-app/src/img/about.jpg";
//import about from "../img/about.jpg";

const LandingPage = () => {
    const [landingPageData, setLandingPageData] = useState({});
    useEffect(() => {
      setLandingPageData(JsonData);
    }, []);
    const props = { data: landingPageData };
    
    //const { username } = userData();

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitted");
      }
    const handleChange = (e) => {
        console.log(e.target.value);
    }

    const Services = () => {


    };

    return (
        <div className="landing " >
            <>
            <Navbarcustom />
            </>
            <header id="header">
                <div className="intro" >
                    <div className="overlay">
                    <div class="row">
                            <div className=" intro-text">
                                <h1>SENTIMENT ANALYSIS
                                    <span></span>
                                </h1>
                                <p></p>
                            </div>
                            </div>
                    </div>
                </div>
            </header>
            <div>
                
                
            </div>
        </div>   
    );

};

export default LandingPage;