//import { userData } from "../../helpers";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, CloseButton} from "reactstrap";
import { useNavigate } from "react-router-dom";
//import { Button } from "reactstrap";
import Select from 'react-select'
import Navbarcustom from "../navbar";
import { Col,Table } from "react-bootstrap";
//import { SentimentContext } from '../../context/SentimentContext';
import {useAuth} from "../../context/AuthProvider";
import { useClassification } from "../../context/ClassificationProvider";

import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Tooltip from 'react-bootstrap/Tooltip';

const AdminAnnotationPage = () => {

  const [frasi, setFrasi] = useState([]); // To handle frasi state
  const [loading, setLoading] = useState(true); // To handle loading state    useContext(SentimentContext);
  const [error, setError] = useState(null); // To handle error state


  //const [preferenze, setPreferenze] = useState([]);

   // To handle error state
  //const [selectedOption, setSelectedOption] = useState(null);
  //const [selectedSentimentArray, setSelectedSentimentArray] =useState([]);
  //const [selectedSentimentArray, setSelectedSentimentArray] = useContext(SentimentContext);
  

  const navigate = useNavigate();
  const auth=useAuth();
  const user =JSON.parse(auth.user) ;

  const options = [
    { value: 'si', label: 'Sì' },
    { value: 'no', label: 'No' }
  ]


    
  //-----------------------------Fetch Frasi--------------------------------------
  useEffect(() => {
    const fetchFrasi = async () => {
      try {
        const  jwt  = user.jwt
    
        const response = await axios.get('http://localhost:1337/api/frasi-da-classificares/', {
          headers: {
            Authorization: `Bearer ${jwt}`
          },
          params: {
            populate: '*',
          }
        });
        
        const frasi2=response.data;
        console.log("frasi2",frasi2);
        setFrasi(frasi2);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchFrasi();
  }, []);
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (frasi.length === 0) {
    return <div>No data available</div>;
  }

  //-----------------------------Batch Frasi--------------------------------------

   


  
  
  
  //-----------------------------Various Handles----------------------------------

  //-----Save changes
  const handleSave_Changes = async () => {
    console.log("Salvato");
    //console.log(selectedSentimentArray);
    navigate("/recap");
  };
  
  //-----Previous page and Next buttons
  

  

const handleCancel = async () => { 
  console.log("Cancellato");
  navigate("/Nuove_Frasi");    
  };
  console.log(frasi);
const VisualizzaFrasi = frasi.data.map((frase,index) => {
    return (
            <tr key={frase.id}>
                <td>{index+1}</td>
                <td>{frase.attributes.testo_frase}</td>
                <td>{frase.attributes.users?frase.users:null}</td>
                <td>{frase.attributes.user_result?frase.user_result:null}</td>
                <td>{frase.attributes.lista_bias}</td>
                <td>{frase.attributes.createdAt}</td>
                <td><Button variant="secondary" class="mt-2">modifica</Button></td>
            </tr>
    );
    });

  //-----------------------------Visualizza Frasi----------------------------------
  

//-----------------------------Return Principale----------------------------------
  return(<div>
    <div>
    <Navbarcustom/>
    </div>
    <div class="content ">

    <div class="card m-5 d-block">
      <h5 class="card-header">Tabella Frasi</h5>
      <div class="card-body">
          <Table striped bordered hover>
            <thead>
              <tr>
              <th scope="col">#</th>
                <th scope="col">Testo frase</th>

                
                  <th scope="col">
                    Utenti che hanno risposto 
                  </th>
                <th scope="col">Risposta</th>
                <th scope='col'>Tipo Bias</th>
                <th scope="col">Created at </th>
                <th scope="col">Azione</th>
              </tr>
            </thead>
            <tbody>
                {VisualizzaFrasi}
            </tbody>
          </Table>

          
        
      </div>
    </div>
      <Col className="d-flex justify-content-around">
        <Button  variant="secondary" class="mt-2">
          Cancella e torna indietro
        </Button>

        <Button  variant="primary" class="mt-2">
          Salva i cambiamenti
        </Button>
      </Col>
    </div>
    <br></br>
    {/*<Button onClick={handleSave_Changes}>Salva i cambiamenti</Button>   <Button onClick={handleCancel}>Cancel</Button>*/}
  </div>);
};

export default AdminAnnotationPage;
