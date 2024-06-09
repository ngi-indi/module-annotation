import React, { useState, useEffect,useCallback } from 'react';
import axios from 'axios';
import { Button, CloseButton } from "reactstrap";
import { useNavigate } from "react-router-dom";
import Navbarcustom from "../navbar";
import { Col } from "react-bootstrap";
import { useAuth } from "../../context/AuthProvider";

import { AgGridReact, useGridCellEditor } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid

const AdminAnnotationPage = () => {

  const [frasi, setFrasi] = useState([]); // To handle frasi state
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
  const [rowData, setRowData] = useState([]);
  const [updatedRows,setUpdatedRows]=useState([]);
  
  const CustomButtonComponent = (props) => {
    return <Button style={{boxSizing: 'border-box',
      height: '30px',  // Set your desired height
      width: 'auto',   // Set your desired width
      textAlign:'center',
      justify:'center',
      alignItems:'center'}} onClick={() => window.alert(props.data.sentence) }>Push Me!</Button>;
  };
  // Column Definitions: Defines the columns to be displayed.
  const [colDefs] = useState([
    { field: "sentence",
      editable:  true,
      cellEditor: 'agTextCellEditor'
    },
    { field: "users that classified it" },
    { field: "bias type" },
    { field: "created at" },
  ]);

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

        const formattedData = frasi2.data.map((frase) => ({
          id:frase.id,
          "sentence": frase.attributes.testo_frase,
          "users that classified it": frase.attributes.users,
          "bias type": frase.attributes.lista_bias,
          "created at": frase.attributes.createdAt,

        }));

        setRowData(formattedData);

        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchFrasi();
  }, [user.jwt]);

  

  const onCellValueChanged = useCallback((event) => {
    console.log("event",event);
    const newRow= event.data;
    let updatedData=[];
    let flag=false;

    updatedData = rowData.map((row) =>{
      
      if((row.id === event.data.id) && 
      (String(frasi.data.find(frase => frase.id === event.data.id).attributes.testo_frase) === String(newRow.sentence))){
        flag=true;
        return {...row,[event.colDef.field]:event.newValue,edited:false};
      }
      else{
        if(row.id === event.data.id){
        return {...row,[event.colDef.field]:event.newValue,edited:true};
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
        if (newRow[event.colDef.field]!==event.oldValue){
          
          setUpdatedRows(updatedRows.map((row) =>  row.id === newRow.id ? newRow : row));
        }
      }
    }else{
      setUpdatedRows(updatedRows.filter(row => row.id !== newRow.id));
    }
    
  }, [rowData, setRowData]);

  
  const getRowStyle = useCallback((params) => {
    if (params.data.changed) {
      return { backgroundColor: 'yellow' };
    }
    return null;
  }, []);

  const updateDatabase = ()=>{

    console.log("ciao",updatedRows);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  if (frasi.lenght === 0) {
    return <div>No data available</div>;
  }

  const defaultColDef = {
    sortable: true,
    filter: true,
    flex: 1,
    minWidth: 100,
    resizable: true,
  };

  
  
  const AdminTable = () => {
    return (
      <div className="ag-theme-quartz" style={{ height: 400, width: '100%' }}>
        <AgGridReact
          columnDefs={colDefs}
          rowData={rowData}
          defaultColDef={defaultColDef}
          rowSelection='single'
          singleClickEdit={true}
          pagination={true}
          onCellValueChanged={onCellValueChanged}
          paginationPageSize={10}
          getRowStyle={(params) => {
            return params.data.edited ? { backgroundColor: '#FFFF00' } : {backgroundColor: ''};
          }}
          paginationPageSizeSelector={[10,20,50,100]}
          
        />
      </div>
    );
  };
  

  return (
    <div>
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
          <Button variant="secondary" className="mt-2">
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
