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

import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AnnotationPage = () => {

  const [frasi, setFrasi] = useState([]); // To handle frasi state
  const [currentIndex, setCurrentIndex] = useState(0);// To handle current index of the batch
  const [loading, setLoading] = useState(true); // To handle loading state    useContext(SentimentContext);
  const [error, setError] = useState(null); // To handle error state
  const [infoHover, setInfoHover] = useState(false); // To handle hover info bias
  const[flagBatch,setFlagBatch]=useState(true);
  const [showtable, setShowtable] = useState(true);

  //const [preferenze, setPreferenze] = useState([]);

   // To handle error state
  //const [selectedOption, setSelectedOption] = useState(null);
  //const [selectedSentimentArray, setSelectedSentimentArray] =useState([]);
  //const [selectedSentimentArray, setSelectedSentimentArray] = useContext(SentimentContext);
  
  const classification=useClassification();

  const navigate = useNavigate();
  const auth=useAuth();
  const user =JSON.parse(auth.user) ;

  const options = [
    { value: 'si', label: 'Sì' },
    { value: 'no', label: 'No' }
  ]

function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
}

    
  //-----------------------------Fetch Frasi--------------------------------------
  useEffect(() => {
    const fetchFrasi = async () => {
      try {
        const  jwt  = user.jwt
    
        const response = await axios.get('http://localhost:1337/api/frasi-da-classificares/not-related-to-user', {
          headers: {
            Authorization: `Bearer ${jwt}`
          },
          params: {
            userId: user.id
          }
        });
        
        const frasi2=response.data;
        console.log("frasi2",frasi2);
        setFrasi(frasi2);
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

  //-----------------------------Batch Frasi--------------------------------------
  const BatchFromFrasi = (frasi,batch_size) => {
    let list = [...frasi];
    list = [...Array(Math.ceil(list.length / batch_size))].map(_ => list.splice(0,batch_size));
    //console.log("list",list);
    if(flagBatch){
      console.log("flagBatch",flagBatch);
      for (let i = 0; i < list.length; i++) {

        list[i]=shuffleArray(list[i]);
      }
      //setFlagBatch(false);
      return list;
    }
    
  
    return list;
  };

   
  const batchFrasi = BatchFromFrasi(frasi,6);

  
  //console.log("batchFrasi",batchFrasi);
  
  //-----------------------------Various Handles----------------------------------

  //-----Save changes
  const handleSave_Changes = async () => {
    console.log("Salvato");
    //console.log(selectedSentimentArray);
    navigate("/recap");
  };
  
  //-----Previous page and Next buttons
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
    console.log("frasi",batchFrasi.length,batchFrasi);
    if(!batchFrasi[currentIndex].some((element) => element.flag_bias === null)){
      if (currentIndex === batchFrasi.length-1) {
        console.log("Non ci sono frasi successive");
        toast.success("You have annotated all the sentences!",{
          position: "top-center"});
          setShowtable(false);
      }
      else{
        toast.success("You have saved the annotations! you can annotate these now.",{
          position: "top-center"});
        setCurrentIndex((prevIndex) => (prevIndex + 1));
        
      }
    }
    else{
      console.log("Devi completare tutte le frasi");
      toast.error("you have to complete all the sentences",{
        position: "top-center"});
    

    }
  };
  //----- Change
/**/
  const handleChange = (option,id) => {
    batchFrasi[currentIndex].map((element) => {
      if (element.id === id) {
        if(option.value === 'si'){
          element.flag_bias = true;
        }
        else{
          element.flag_bias = false;
        }
      }
    });
    console.log("batchFrasi",batchFrasi);
  };

const handleCancel = async () => { 
  console.log("Cancellato");
  navigate("/dashboard");    
  };
  //----- Hover info
  const handleHover = () => {
    setInfoHover(true);
  };
  const handleLeave = () => {
    setInfoHover(false);
  };

  
  const HoverInfoBias = (props) => (
    <Tooltip id="button-tooltip" {...props}>
      Un bias è un pregiudizio o una preferenza che influenza il giudizio.
    </Tooltip>
  );

/* //AGGIUNGERE FRASI TEST, PER poi fare i batch con entrambi i tipi, ovviamente ordine casuale */


  //-----------------------------Visualizza Frasi----------------------------------
  const VisualizzaFrasi = batchFrasi[currentIndex].map((element,index) => {
    return(
      <tr key={element.id}>
          <td>{index+1}</td>

          <td>{element.testo_frase}</td>
          
          <td>
          Credi che in questa frase sia presente un {element.lista_bias} ?
          </td>
          
          <td> 
            <Select className="dropdown"
              options={options}
              value={options.find(option => option.value === element.flag_bias || null)}
              onChange={(option) => {handleChange(option,element.id)}}
            />

          </td>
        </tr>
    );
  });

//-----------------------------Return Principale----------------------------------
  return(<div>
    <div>
    <ToastContainer />
    <Navbarcustom/>
    </div>
    <div class="content ">

    <div class="card m-5 d-block">
      <h5 class="card-header">Pagina n° {currentIndex +1}</h5>
      <div class="card-body">
        {!showtable && (<h3 style={{alignItems:'center'}}>There are no new sentences to annotate. Wait or change your Keywords.</h3>)}
        {showtable && (
          <Table striped bordered hover >
            <thead>
              <tr>
              <th scope="col">#</th>
                <th scope="col">Testo frase</th>

                
                  <th scope="col">
                    Domanda bias {<OverlayTrigger 
                      placement="top"
                      delay={{ show: 250, hide: 400 }}
                      overlay={HoverInfoBias}
                      >
                        <a className='hover' 
                        onMouseEnter={()=>handleHover} 
                        onMouseLeave={()=>handleLeave} 
                        style={{ color: "grey",textDecoration: "none", cursor:"pointer"}}>
                          i
                        </a>
                      </OverlayTrigger>}
                  </th>
                <th scope="col">risposta</th>
              </tr>
            </thead>
            <tbody>
              {VisualizzaFrasi}
            </tbody>
          </Table>
          )}

          
        
      </div>
    </div>
      <Col className="d-flex justify-content-around">
        <Button onClick={handleCancel} variant="secondary" class="mt-2">
          Back to Dashboard
        </Button>

        <Button onClick={handleNext} variant="primary" class="mt-2">
          Save 
        </Button>
      </Col>
    </div>
    <br></br>
    {/*<Button onClick={handleSave_Changes}>Salva i cambiamenti</Button>   <Button onClick={handleCancel}>Cancel</Button>*/}
  </div>);
};

export default AnnotationPage;
