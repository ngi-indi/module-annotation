//import { userData } from "../../helpers";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button} from "reactstrap";
import { useNavigate } from "react-router-dom";
//import { Button } from "reactstrap";
import Select from 'react-select'
import Navbarcustom from "../navbar";
import { Col } from "react-bootstrap";
//import { SentimentContext } from '../../context/SentimentContext';
import {useAuth} from "../../context/AuthProvider";
import { useClassification } from "../../context/ClassificationProvider";


const AnnotationPage = () => {

  const [frasi, setFrasi] = useState([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [loading, setLoading] = useState(true); // To handle loading state    useContext(SentimentContext);
  const [error, setError] = useState(null); // To handle error state
  //const [selectedOption, setSelectedOption] = useState(null);
  //const [selectedSentimentArray, setSelectedSentimentArray] =useState([]);
  //const [selectedSentimentArray, setSelectedSentimentArray] = useContext(SentimentContext);
  
  const classification=useClassification();
  //setSelectedSentimentArray(new JSON);
  
  //console.log(selectedSentimentArray);
  const navigate = useNavigate();
  const auth=useAuth();
  const user =JSON.parse(auth.user) ;
  

  useEffect(() => {
    const fetchFrasi = async () => {
      try {
        const  jwt  = user.jwt
        console.log("jwt",user.jwt)
        const response = await axios.get('http://localhost:1337/api/frasi-da-classificares?filters[flag_classificazione][$eq]=false', {
          headers: {
            Authorization: `Bearer ${jwt}`
          }
        });
        setFrasi(response.data.data);
        classification.storeCl(new Array());
        //setSelectedSentimentArray(new Array(response.data.data.length).fill(null));

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
  const handleSave_Changes = async () => {
    console.log("Salvato");
    //console.log(selectedSentimentArray);
    navigate("/recap");
  };
  const options = [
    { value: 'neutral', label: 'Neutral' },
    { value: 'positive', label: 'Positive' },
    { value: 'negative', label: 'Negative' }
  ]
const handlePrevious = () => {
  if (currentIndex === 0) {
    console.log("Non ci sono frasi precedenti");
  }
  else{
    setCurrentIndex((prevIndex) => (prevIndex - 1 ));
  }
  console.log(currentIndex);
};

const handleNext = () => {
  console.log("frasi",frasi.length,frasi);
  if (currentIndex === frasi.length-1) {
    console.log("Non ci sono frasi successive");
  }
  else{
    setCurrentIndex((prevIndex) => (prevIndex + 1));
  }
};

const handleChange = (option) => {
  let flag=false;
  frasi[currentIndex].attributes.sentiment=option.value;
  let updatedSentiments = new Array();
  updatedSentiments =[...JSON.parse(classification.classification)];
  for(const x of updatedSentiments){
    if (frasi[currentIndex].id===x.id){
      updatedSentiments[updatedSentiments.indexOf(x)].attributes.sentiment=frasi[currentIndex].attributes.sentiment;
      //x.sentiment=frasi[currentIndex].sentiment;
      flag=true;
    }
  }
  if(!flag){
    updatedSentiments.push(frasi[currentIndex]);
  }
  classification.removeCl()
  classification.storeCl(updatedSentiments);
  console.log("classification",classification.classification);
  console.log("updatedSentiments",updatedSentiments)
  //setSelectedSentimentArray(updatedSentiments);
};
const handleCancel = async () => { 
  console.log("Cancellato");
  navigate("/Nuove_Frasi");    
  };
const frasitooption= (frase,options)=>{
  for (const option of options) {
    if(frase.attributes.sentiment===option.value){
      return option
    }
  }
  return null;
};

  return(<div>
    <div>
    <Navbarcustom/>
    </div>
    <div class="content ">

    <div class="card m-5 d-block">
      <h5 class="card-header">Frase n° {currentIndex}</h5>
      <div class="card-body">
        <p class="card-text">{frasi[currentIndex].attributes.testo_frase}</p>
        <Select className="dropdown" 
          options={options}
          value={frasitooption(frasi[currentIndex],options)}
          defaultInputValue=""
          onChange={handleChange}
          />
          <br></br>
          <Col className="d-flex justify-content-around">
            <Button onClick={handlePrevious} variant="secondary" class="mt-2">
              Previous
            </Button>
            <Button onClick={handleNext} variant="primary" class="mt-2">
              Next
            </Button>
          </Col>
        
      </div>
    </div>
    </div>
    <Button onClick={handleSave_Changes}>Salva i cambiamenti</Button>   <Button onClick={handleCancel}>Cancel</Button>
  </div>);
};

export default AnnotationPage;
