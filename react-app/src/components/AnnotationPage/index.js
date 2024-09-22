import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, CloseButton} from "reactstrap";
import { useNavigate } from "react-router-dom";
import Navbarcustom from "../navbar";
import { Col,Table } from "react-bootstrap";
import {useAuth} from "../../context/AuthProvider";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';

import { ToastContainer, toast } from 'react-toastify';

import { Tooltip } from "antd";

const AnnotationPage = () => {

  const [frasi, setFrasi] = useState([]); // To handle frasi state
  const [loading, setLoading] = useState(true); // To handle loading state    useContext(SentimentContext);
  const [error, setError] = useState(null); // To handle error state

  const [showtable, setShowtable] = useState(true);//to handle the table visualization

  const [currentPage, setCurrentPage] = useState(0); // Track current page

  const [pageSize, setPageSize] = useState(6); // Number of sentences per page

  const [selectedValues, setSelectedValues] = useState([]); // To handle selected values

  


  const navigate = useNavigate();
  const auth=useAuth();
  const user =JSON.parse(auth.user) ;

  const options = [
    { value: 'yes', label: 'Yes' },
    { value: 'no', label: 'No' }
  ]

  const BiasOptions = [
    { case: 'Political bias', hover: 'Favoritism in the political domain.'},
    { case: 'Linguistic bias', hover: 'Judgment influenced by language.' },
    { case:'Cognitive Bias', hover: 'Systematic thinking errors.'},
    { case:'Text-level Context Bias', hover: 'Influence of surrounding text.'},
    { case:'Reporting-Level Context Bias', hover: 'Influence of surrounding reports.'},
    { case:'Hate Speech', hover: 'Public speech promoting hate or violence.'},
    { case:'Gender Bias', hover: 'Preference for one gender.'},
    { case:'Racial Bias', hover: 'Discrimination based on race.'},
    { case:'Fake News', hover: 'Spread of false information.'},
];


  function shuffleArrayInBlocks(array, blockSize) {
    const shuffledBlocks = [];
    
    // Dividi l'array in blocchi di dimensione blockSize
    for (let i = 0; i < array.length; i += blockSize) {
        const block = array.slice(i, i + blockSize);
        
        // Mescola il blocco corrente
        for (let j = block.length - 1; j > 0; j--) {
            const k = Math.floor(Math.random() * (j + 1));
            [block[j], block[k]] = [block[k], block[j]];
        }
        
        // Aggiungi il blocco mescolato all'array dei blocchi mescolati
        shuffledBlocks.push(block);
    
    }
    
    // Concatena i blocchi mescolati per ottenere l'array finale
    return shuffledBlocks.flat();
}
    
  //-----------------------------Fetch Frasi--------------------------------------
  useEffect(() => {
    const fetchFrasi = async () => {
      try {
        const  jwt  = user.jwt
    
        const response = await axios.get('http://localhost:1337/api/frasi-da-classificares/not-related-to-user', 
        {
          params: {
            userId: user.id, // Query parameter
          },
          headers: {
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
        
        const frasi2=shuffleArrayInBlocks(response.data,pageSize);
        console.log("frasi2",response.data);
        if (frasi2.length === 0) {
          setShowtable(false);
        };
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
  
  const onPage = (event) => {
    console.log(frasi.length);
    
    setCurrentPage(event.first / event.rows);
    console.log("event",event);
  };
 
  //-----------------------------Various Handles----------------------------------

  // Check if it's the last page
  const isLastPage = () => {
    console.log("frasi.length",frasi.length);
    console.log("pageSize*(currentPage)",pageSize*(currentPage));
    return (frasi.length <= pageSize*(currentPage+1));
  };
  
  // Calculate the number of pages
  const numberOfPages = () => {
    return Math.ceil(frasi.length / pageSize);
  };

  // Handle the next button that has to load the next page and post the data
  const handleNext = (rowData) => {
    console.log("currentPage",currentPage);
    console.log("selectedValues",selectedValues);
    //setCurrentPage(currentPage + 1);
    const length=selectedValues.length;

    let numberOfRows=0;

    if(frasi.length%pageSize !== 0 && isLastPage()){
      numberOfRows = frasi.length%pageSize;
    }
    else{
      numberOfRows = pageSize;
    }
    console.log("numberOfRows",numberOfRows);

    if(selectedValues.length === numberOfRows){
      handleSave();
      if (isLastPage()) {
        toast.success("You have annotated all the sentences!",{
          position: "top-center"});
          setShowtable(false);
      }
      else{
        toast.success("You have saved the annotations! you can annotate these now.",{
          position: "top-center"});
        
        setCurrentPage(currentPage + 1);
        
        setSelectedValues([]);
        
        
      }
    }
    else{
      toast.error("you have to complete all the sentences",{
        position: "top-center"});
    

    }

  };


  
// habdle the cancel button
const handleCancel = async () => { 
  setSelectedValues([]);
  navigate("/dashboard");    
  };
  
  
  //-----------------------------Dropdown----------------------------------
  const onDropdownChange = (e, rowData) => {
    const arrayOfObjects = [...selectedValues];
    arrayOfObjects.push({id: rowData.id,value: e.value});
    setSelectedValues(arrayOfObjects);
    
  };

  const dropdownAnswerTemplate = (rowData) => {
    return (
      <Dropdown 
      
        value={selectedValues.find(e => e.id === rowData.id)?.value} 
        options={options} 
        onChange={(e) => onDropdownChange(e, rowData)}
        placeholder="Select an Option"
      />
    );
  };

  //-----------------------------Tooltip----------------------------------
const tooltipTemplate = (rowData) => {
  if (BiasOptions.some(e => e.case === rowData.lista_bias)) {
    
    return BiasOptions.find(e => e.case === rowData.lista_bias).hover;
  }
  return ('I don\'t know what this bias is about. Please, help me!');
};

  //-----------------------------Visualizza Frasi----------------------------------
  const VisualizzaFrasi2=()=>{
    return(
      <div className='card'>
        <DataTable 
        value={frasi}
         dataKey="id"
        paginator={true} // Set pagination to true
        paginatorTemplate=""
        onPage={onPage}
        stripedRows
        showGridlines
        first={currentPage * pageSize} // Set the first row per page
        rows={pageSize} // Set number of rows per page 

        >
          <Column field="testo_frase" header="Sentences Text"></Column>
          <Column field="lista_bias" header="Bias Questions" body={(rowData) => (
           <Tooltip title={tooltipTemplate(rowData)}>
           <span>In this sentence, is present a {rowData.lista_bias} ?</span>
         </Tooltip>
        )} />
          <Column field="flag_bias" header="Answers" body={dropdownAnswerTemplate}></Column>
        </DataTable>
        <Tooltip target=".custom-tooltip" position="top" />
      </div>
    );
  };
  // handle the save button
  const handleSave = async () => {
    try {
      const response = await axios.put(`http://localhost:1337/api/frasi-da-classificares/update-json-frasi`, 
        {
          "data": {
            "items" : selectedValues // Corpo della richiesta
          },
        },
        {
          params: {
            "userId": user.id, // Query parameter
          },
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${user.jwt}`,
          },
        }
      );
  
      console.log('Response data:', response.data);
    } catch (error) {
      console.error('Error updating relation:', error.response ? error.response.data : error.message);
    }
  };

//-----------------------------Return Principale----------------------------------
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  
  return(<div>
    <div>
    <ToastContainer />
    <Navbarcustom/>
    </div>
    <div class="content ">

    <div class="card m-5 d-block">
      {showtable &&(<h5 class="card-header">Page n° {currentPage +1}</h5>)}
      {!showtable &&(<h5 class="card-header">Annotation Completed</h5>)}
      <div class="card-body">

      {showtable && ( <VisualizzaFrasi2/>)}

      {!showtable && (<h3 >There are no new sentences to annotate. Wait or change your Keywords.</h3>)}
            
      </div>
    </div>
      <Col className="d-flex justify-content-around">
        <Button onClick={handleCancel} variant="secondary" class="mt-2">
          Back to Dashboard
        </Button>

        <Button onClick={handleNext} disabled={!showtable}variant="primary" class="mt-2">
          Save 
        </Button>
      </Col>
    </div>
    <br></br>
  </div>);
};

export default AnnotationPage;
