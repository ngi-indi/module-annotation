import React from 'react';
import { useNavigate } from "react-router-dom";
import Navbarcustom from "../navbar";

import './style.css';  // You can use external CSS for styles

const LandingPage = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="landing-page">
      <header className="header">
        <Navbarcustom/>
      </header>

      <section className="hero-section" style={{boxShadow: 'none!important'}}>
        <div className="text-container">
          <h2 className="hero-title">Start your reviewing journey today</h2>
          <p className="hero-description">
            Seamlessly review and annotate search results for biases with unparalleled ease and efficiency
          </p>

          <button className="cta-btn" onClick={handleLoginRedirect}>Join our review platform</button>
          <p className="hero-info"> Your effort, your reward – in crypto!<br/>Get rewarded with crypto-assets for reviewing and participating in platform activities</p>
        </div>

        <div className="image-container">
          <img
            className="hero-image"
            src="/logo.png"
            alt="Product Display"
          />
        </div>
      </section>

      <footer className="footer">
        <p>Powered by trusted partners</p>
        <div className="logos">
          <img src="/unica.png" alt="Goop" />
          <img src="/r2m.png" alt="Enews" />
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
