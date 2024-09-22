import React from "react";
import { useNavigate } from "react-router-dom";
import Navbarcustom from "../navbar";

import { useState, useEffect } from "react";

import { Carousel } from 'primereact/carousel';
import { Divider } from 'primereact/divider';
import 'primereact/resources/themes/saga-blue/theme.css';  // Theme CSS
import 'primereact/resources/primereact.min.css';          // PrimeReact CSS
import 'primeicons/primeicons.css';  
       

const LandingPage = () => {
    
    
    //const { username } = userData();

    const navigate = useNavigate();
    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("submitted");
      }
    const handleChange = (e) => {
        console.log(e.target.value);
    }

    const carouselData = [
        {
          image:'/landing.jpg',
          title: 'Welcome to the landing page!',
          description: 'You can sign up or log in to access the dashboard.'
        },
        {
            image:'/annotate.jpg',
          title: 'Start annotating!',
          description: 'You can start annotating sentences in the dashboard.'
        },
        {
          image:'/rating.jpg',
          title: 'Beware of the rating!',
          description: 'Remember to be impartial when annotating.'
        },
        // Add more items as needed
      ];
      
      const itemTemplate = (item) => {
        return (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center', padding: '1rem' }}>
            <div style={{ marginTop: '1rem' }}>
                <img src={item.image} alt={item.title} style={{ width: 'auto', height: '30em', borderRadius: '0.5rem' }} />
              <h3 style={{ margin: '0', fontSize: '1.5rem' }}>{item.title}</h3>
              <p style={{ margin: '0.5rem 0 0', fontSize: '1rem' }}>{item.description}</p>
            </div>
          </div>
        );
    };

    return (
        <div className="landing " >
            <div>
                <Navbarcustom />
            </div>
            <div className="content">
            
            <Carousel
                      value={carouselData}
                      itemTemplate={itemTemplate}
                      numVisible={1}
                      numScroll={1}
                      circular
                      autoplayInterval={5000}
                    />
            <div className="card" style={{margin:'1%',textAlign:'center'}}>

                <div className="card-body">
                <p>
                    Bias detection involves identifying and analyzing patterns in data or algorithms that lead to unfair or discriminatory outcomes.
                </p>
                <Divider type="solid"/>
                <p>
                    It is essential for ensuring fairness and equity, particularly in machine learning models where biases can perpetuate or even exacerbate societal inequalities. 
                </p>
            </div>
        </div>
            
            
                
                
            </div>
        </div>   
    );

};

export default LandingPage;

/*
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
*/