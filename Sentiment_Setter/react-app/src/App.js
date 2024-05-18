import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BrowserRouter, Route,Routes } from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import { Container } from "reactstrap";
import Login from "./components/Login";
import Registration from './components/Register';
import AnnotationPage from "./components/AnnotationPage";
import Frasi_Classificate from './components/Frasi_classificate'; 
//import Logout from "./components/Logout";
import { ToastContainer } from "react-toastify";
import { Protector } from "./helpers";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS
import LandingPage from './components/LandingPage';
import UserProfilePage from './components/UserProfilePage';


function App() {
  return (
    <Container>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Protector Component={LandingPage} />} />
          <Route path ="/landingpage" element={<LandingPage/>}/>
          <Route path="/login" element={<Login />} />
          <Route path="/logout" element={<Login />} />
          <Route path="/dashboard" element={<DashboardPage />} />
          <Route path="/registration" element={<Registration />} />
          <Route path="/annotation" element={<AnnotationPage />} />
          <Route path="/Frasi_Classificate" element={<Frasi_Classificate />} />
          <Route path="/userProfile" element={<UserProfilePage />} />
        </Routes>
        <ToastContainer />
      </BrowserRouter>
    </Container>
  );
}


export default App;