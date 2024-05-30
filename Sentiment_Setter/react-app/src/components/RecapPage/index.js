import { userData } from "../../helpers";
import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { Button, Card, Nav, Row } from "reactstrap";
import { useNavigate } from "react-router-dom";
//import { Button } from "reactstrap";
import Select from 'react-select'
import Navbarcustom from "../navbar";
import { Col } from "react-bootstrap";
import CloseButton from 'react-bootstrap/CloseButton'

import { useClassification } from "../../context/ClassificationProvider";

/// Implementare il sentiment già nel dropdown, la post per caricare i cambiamenti lato server 

const RecapPage = () => {
  const [preferenze, setPreferenze] = useState([]);
  
  const options = [
    { value: 'neutral', label: 'Neutral' },
    { value: 'positive', label: 'Positive' },
    { value: 'negative', label: 'Negative' }
  ];
    
    const navigate = useNavigate();

    const classification=useClassification();


    useEffect(() => {
    if (classification && classification.classification) {
      const preferenz = JSON.parse(classification.classification);
      setPreferenze(preferenz);
      console.log("preferenze", preferenze);
    }
  }, [classification]);
  const handleCancel = (id) => () => {
    setPreferenze(preferenze.filter(pref => pref.id !== id));
  };
  const handleChange = (id, selectedOption) => {
    setPreferenze(prevState => 
      prevState.map(pref => 
        pref.id === id 
          ? { ...pref, attributes: { ...pref.attributes, sentiment: selectedOption.value } } 
          : pref
      )
    );
  };
  
  const handleSaveSentiment = async () => {
    
  };
  const handleAbort = () => {
    classification.removeCl();
    navigate("/dashboard");
  };
  console.log("preferenze", preferenze);
  
  const Riepilogo = preferenze.map((pref)=>{
    console.log("id",pref.id);
    return (
      <tr key={pref.id}>
        <td>{pref.attributes.testo_frase}</td>
        <td>
          <Select className="dropdown" 
          options={options}
          value={options.find(option => option.value === pref.attributes.sentiment)}
          onChange={(option) => handleChange(pref.id, option)}
          />
        </td>
        <td>
          <CloseButton onClick={handleCancel(pref.id)}/>
        </td>
      </tr>
    )
  });
    return (
      <div>
        <Navbarcustom />
        <div class="content">
          
          <Row className="mt-3">
            <h2>Rivedi le tue scelte</h2>
            <Col className="d-flex justify-content-around">
            <table className="table">
              <thead>
                <tr>
                  <th scope="col">testo</th>
                  <th scope="col">sentiment</th>
                  <th scope="col">cancella</th>
                </tr>
              </thead>
              <tbody>
                  {Riepilogo}
              </tbody>
            </table>
            
            </Col>
          </Row>
          <Col className="d-flex justify-content-around col">
            <Button onClick={handleSaveSentiment} variant="primary" class="mt-2">
              Salva
            </Button>
            <Button onClick={handleAbort} variant="secondary" class="mt-2">
              Annulla
            </Button>
            </Col>
        </div>
      </div>
    );
  };
    export default RecapPage;



    /*}
        <div>
          <table>
            <thead>
              <tr>
                <th>Frasi</th>
                <th>Sentimento</th>
              </tr>
            </thead>
            <tbody>
              {selectedSentimentArray.map((element, index) => {
                  return (
                      <tr>
                          <td>{element}</td>
                          <td>{element}</td>
                      </tr>
                  );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th>buona</th>
                <th>fortuna</th>
              </tr>
            </tfoot>
          </table>
        </div>
    */