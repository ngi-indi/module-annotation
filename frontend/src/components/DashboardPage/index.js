import React, { useEffect,useState } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate,useLocation } from "react-router-dom";
import Navbarcustom   from "../navbar";
import { Container, Row, Col, Button,Card,Badge  } from 'react-bootstrap';
import axios from "axios";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ToastContainer, toast } from 'react-toastify';
import { Flag } from "@mui/icons-material";


const DashboardPage = () => {
  
  const navigate = useNavigate();
  const location = useLocation();
  const [sentences, setSentences] = useState([]);
  
  const auth = useAuth();
  console.log("auth",auth);
  const user =JSON.parse(auth.user || '{}') ;

  console.log("sentences",sentences);
  console.log("user",typeof user,user);
  console.log("user.sentences.lenght",user.sentences);
  
  
  const handleAnnotationPage = () => {//cambiare nome della funzione
    if (user.role === "admin") {
      navigate("/annotation-admin");
    }
    else{
    navigate("/annotation");
    }
  };
  const handleFrasi_classificate= () => {//messa per provare la get
  
    navigate("/Frasi_Classificate");
  };
  const handleAdminPage = () => {//cambiare nome della funzione
    navigate("/admin");
  };
  const AdminRole = () => {
    if (user.role === "admin") {
      return(
        <Button onClick={handleAdminPage} variant="primary" class="mt-2">
          View admin page
        </Button>
      );
    }
  
  };
  const BodyAnswer = (rowData) => {
    console.log("rowData",rowData);
    console.log("user.id",user.id);
    return (
      
      rowData.user_result.find((element) => Number(element.userId) === Number(user.id)).value
    
    );
  }
  const TableClass = () => {
    if(user.role!=="admin"){
    
    return (
      <div>
        <h4>Recent snippets you reviewed</h4>
          
        <DataTable className="card" value={user.sentences} dataKey="id" stripedRows showGridlines editMode='cell' >
          <Column field="testo_frase" header="Snippet" className="snippet"></Column>
          <Column field="lista_bias" header="Bias type"></Column>
          <Column field="" header="Your decision" body={BodyAnswer}></Column>
        </DataTable>
      </div>
    );}
    else{
      return(
        <div>
          <h4> As an admin you have to control user's rating and the state of the sentences.</h4>
          <img src="/admin.png" alt="admin" style={{display: "block", marginLeft: "auto",marginRight: "auto",width: "40%"}}/>
        </div>
      );
    }
      
  };
  return (
    <div className="dashboard">
      <Navbarcustom />
      <div className="content" >
        
        <div class="card-parent">
        <Card style={{ justifyContent:'center',}}>
          <Card.Header>
            <h2>
              Welcome back {user?.username}
            </h2>
            <p>Reputation score: {user?.rating} | Token balance: {user?.tokens}</p>
          </Card.Header>
          <Card.Body>
            <br></br>


            <TableClass/>
            
            <br></br>
            <Col className="d-flex justify-content-around">
            <Button onClick={handleAnnotationPage}>Start a review session</Button>
            <AdminRole/>
            </Col>
          </Card.Body>
        </Card>
       
        </div>
      </div>
    </div>
    
  );

};

export default DashboardPage;