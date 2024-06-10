import React, { useState, useEffect } from 'react';
import axios from 'axios';

import { BrowserRouter, Route,Routes ,Switch} from "react-router-dom";
import DashboardPage from "./components/DashboardPage";
import { Container } from "reactstrap";
import Login from './components/Login';
import Registration from './components/Register';
import AnnotationPage from "./components/AnnotationPage";
import Frasi_Classificate from './components/Frasi_classificate'; 
import LandingPage from './components/LandingPage';
import UserProfilePage from './components/UserProfilePage';
import RecapPage from './components/RecapPage';
import AdminDashboard from './components/Admin/AdminDashboard';
import AdminAnnotationPage from './components/AdminAnnotationPage';
//import Logout from "./components/Logout";
import { ToastContainer } from "react-toastify";
import  Protector  from "./components/Protector/Protector";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import { SentimentProvider } from './context/SentimentContext';  // Import the SentimentContext
import  ClassificationProvider  from './context/ClassificationProvider';

import  AuthProvider  from './context/AuthProvider';

//import 'primeicons/primeicons.css';
import { PrimeReactProvider } from 'primereact/api';
//import 'primeflex/primeflex.css';  
import 'primereact/resources/primereact.css';
import 'primereact/resources/themes/lara-light-indigo/theme.css';


function App() {
  return (
    <div >
      <BrowserRouter>
        <AuthProvider >
          <PrimeReactProvider>
          
          <Routes>
            <Route path="/" element={<LandingPage/> } />
            <Route path="/login" element={<Login/>} />
            <Route path="/logout" element={<Login />} />
            <Route path="/dashboard" element={<Protector component={DashboardPage}/>} />
            <Route path="/admin" element={<Protector component={AdminDashboard}/>} />
            <Route path="/registration" element={<Registration />} />
            <Route path="/annotation-admin" element={<ClassificationProvider ><Protector component={AdminAnnotationPage}/></ClassificationProvider>} />
            <Route path="/annotation" element={<ClassificationProvider ><Protector component={AnnotationPage }/></ClassificationProvider>} />
            <Route path="/recap" element={<ClassificationProvider><Protector component={RecapPage }/></ClassificationProvider>} />
            <Route path="/Frasi_Classificate" element={<Protector component={Frasi_Classificate }/>} />
            <Route path="/userProfile" element={<Protector component={UserProfilePage }/>} />
          </Routes>
          </PrimeReactProvider>
       </AuthProvider> 
       {/**/}
      </BrowserRouter>
    </div>
  );
}


export default App;