import React, { useState, useEffect } from 'react';
import { BrowserRouter, Route,Routes ,Switch} from "react-router-dom";
import DashboardPage from "./components/DashboardPage";

import Login from './components/Login';
import Registration from './components/Register';
import AnnotationPage from "./components/AnnotationPage";
import LandingPage from './components/LandingPage';
import UserProfilePage from './components/UserProfilePage';

import AdminDashboard from './components/Admin/AdminDashboard';
import AdminAnnotationPage from './components/AdminAnnotationPage';
import  Protector  from "./components/Protector/Protector";
import 'bootstrap/dist/css/bootstrap.min.css'; // Import Bootstrap CSS

import  AuthProvider  from './context/AuthProvider';
import { PrimeReactProvider } from 'primereact/api';

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
            <Route path="/annotation-admin" element={<Protector component={AdminAnnotationPage}/>} />
            <Route path="/annotation" element={<Protector component={AnnotationPage }/>} />
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