import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { Button, CloseButton } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Navbarcustom from "../navbar";
import { Col } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";

import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { ToastContainer, toast } from 'react-toastify';
import { InputText } from 'primereact/inputtext';


const AdminAnnotationPage = () => {

  const [frasi, setFrasi] = useState([]); // To handle frasi state
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
  const [rowData, setRowData] = useState([]);
  const [updatedRows,setUpdatedRows]=useState([]);
  const [formattedData,setFormattedData]=useState([]);
  
  

  const navigate = useNavigate();
  const auth = useAuth();
  const user = JSON.parse(auth.user);

  const options = [
    { value: 'si', label: 'Sì' },
    { value: 'no', label: 'No' }
  ];
  
  //-----------------------------Fetch Frasi--------------------------------------
  useEffect(() => {
    const fetchFrasi = async () => {
      try {
        const jwt = user.jwt;

        const response = await axios.get('http://localhost:1337/api/frasi-da-classificares/', {
          headers: {
            Authorization: `Bearer ${jwt}`
          },
          params: {
            populate: '*',
          }
        });

        const frasi2 = response.data;
        setFrasi(frasi2);
        //console.log("frasi",frasi[0].attributes.users.data.map((user) => user.attributes.username).join(', '));
        const formattedData2 = frasi2.data.map((frase) => ({
          "id":frase.id,
          "sentence": frase.attributes.testo_frase,
          "users that classified it": frase.attributes.users.data.map((user) => user.attributes.username).join(', '),
          "bias type": frase.attributes.lista_bias,
          "created at": frase.attributes.createdAt,

        }));

        setRowData(formattedData2);
        setFormattedData(formattedData2);
        console.log("formattedData",formattedData2);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchFrasi();
  }, [user.jwt]);

  

  

  const onCellEditComplete = (event) => {
    
    const id = event.newRowData.id;
    let newRow= event.newRowData;
    let updatedData=[];
    let flag=false;


    updatedData = rowData.map((row) =>{
      if((row.id === id) && 
      (String(frasi.data.find(frase => frase.id === id).attributes.testo_frase) === String(newRow.sentence))){
        console.log("sono uguali");
        flag=true;
        return {...row,[event.field]:event.newValue,edited:false};
      }
      else{
        if(row.id === id){
        return {...row,[event.field]:event.newValue,edited:true};
        }
        else{
          return row;
        }
      }
    }
    );
    
    setRowData(updatedData);

    if(!flag){
      if (!updatedRows.some(row => row.id === newRow.id)){
        setUpdatedRows([...updatedRows,newRow]);
      }else{
        console.log("id already in the list");
        if (newRow[event.field]!==event.rowData[event.field]){
          
          setUpdatedRows(updatedRows.map((row) =>  row.id === newRow.id ? newRow : row));
        }
      }
    }else{
      setUpdatedRows(updatedRows.filter(row => row.id !== newRow.id));
    }
  };

  const SentenceBody = (data) => {
    if(data.edited){
      return <div className='rag-yellow'>{data.sentence}</div>;
    }else{
      return <div>{data.sentence}</div>;
    }
  };

  const textEditor = (options) => {
    console.log("options",options);
    return (<InputText type="text" value={options.value} onChange={(e) => options.editorCallback(e.target.value)} onKeyDown={(e) => e.stopPropagation()} />);
};

  const AdminTable = () => {
    return (
      <div>
        <DataTable value={rowData} dataKey="id"  stripedRows showGridlines editMode='cell' >
          <Column field="sentence" header="Sentence"  sortable filter filterPlaceholder="Search by name" style={{ minWidth: '12rem' }} editor={(options)=>textEditor(options)} 
          onCellEditComplete={onCellEditComplete} body={SentenceBody}></Column>
          <Column field="users that classified it" header="users that classified it" sortable ></Column>
          <Column field="bias type" header="Bias Type" sortable ></Column>
          <Column field="created at" header="Created At" sortable ></Column>
        </DataTable>
      </div>
    );
  };

  const updateDatabase = () => {
    toast.success("changes saved successufully", {
      position: "top-center"
    });
    console.log("ciao",updatedRows);
  };

  const handleCancel=() =>{
    if (updatedRows.length==0){
      toast.info("There aren't changes to cancel.", {
        position: "top-center"
      })
    }else{
      setUpdatedRows([]);
      setRowData(formattedData);
      toast.success("All changes were cancelled.", {
        position: "top-center"
      })
    }
  };
  
  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (frasi.lenght === 0) {
    return <div>No data available</div>;
  }
  return (
    <div>
      <ToastContainer/>
      <div>
        <Navbarcustom />
      </div>
      <div className="content ">

        <div className="card m-5 d-block">
          <h5 className="card-header">Sentences Table</h5>
          <div className="card-body">
            <AdminTable />
          </div>
        </div>
        <Col className="d-flex justify-content-around">
          <Button variant="secondary" className="mt-2" onClick={handleCancel}>
            Cancel
          </Button>

          <Button variant="primary" className="mt-2" onClick={updateDatabase}>
            Save changes
          </Button>

        </Col>
      </div>
      <br />
    </div>
  );
};

export default AdminAnnotationPage;
