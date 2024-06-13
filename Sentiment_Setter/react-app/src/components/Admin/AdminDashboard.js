import React, { useEffect,useState,useContext,useMemo } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate,useLocation } from "react-router-dom";
import Navbarcustom   from "../navbar";
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from "axios";
import { Card } from "reactstrap";
import { CloseButton } from "react-bootstrap";
import Select from 'react-select'

import { AgGridReact } from 'ag-grid-react'; // React Data Grid Component
import "ag-grid-community/styles/ag-grid.css"; // Mandatory CSS required by the grid
import "ag-grid-community/styles/ag-theme-quartz.css"; // Optional Theme applied to the grid


import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Rating } from 'primereact/rating';
import { Dropdown } from 'primereact/dropdown';
import { InputText } from 'primereact/inputtext';
import { ToastContainer, toast } from 'react-toastify';


const AdminDashboard=()=>{
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true); // To handle loading state    useContext(SentimentContext);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [expandedRows, setExpandedRows] = useState(null);
    const [rowData, setRowData] = useState([]);
    const [selectedValues, setSelectedValues] = useState({});

    const ruoli = [
        { value: 'admin', label: 'Admin' },
        { value: 'authenticated', label: 'Authenticated'},
        { value : 'public', label: 'Public'}
    ];   

    const user =JSON.parse(auth.user || '{}') 

    const UsersData = async () => {
        try {
        const data = await axios.get('http://localhost:1337/api/users?populate=*', {
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        });
        setUsers(data.data);
        const formattedData = data.data.map((user) => {
            return {
                'id': user.id,
                'username': user.username,
                'role': user.role.type,
                'rating': user.rating,
                'frasi_da_classificares': user.frasi_da_classificares,
                'keywords': (user.lista_bias===null?"No keywords":String(user.lista_bias).split(',').join(', ')),
            };
        });

        setRowData(formattedData.filter(function (user) {
            return user.role != "admin";
        }));
        setSelectedValues(formattedData.reduce((acc, user) => {
            acc[user.id] = user.role;
            return acc;
        }, {}));

        setLoading(false);

        }
        catch (error) {
            setLoading(false);
            setError(error);
            console.error('Error fetching data:', error);

        }
        
    
    };

    useEffect(() => {
        UsersData();
    }, []);

    
    
const allowExpansion = (data) => {
    return data.frasi_da_classificares.length > 0;
};

const rowExpansionTemplate = (data) => {

    console.log("data.frasi_da_classificares",data.frasi_da_classificares);
    const formatData=data.frasi_da_classificares.map((frase) => {
        return {
            'id': frase.id,
            'testo_frase': frase.testo_frase,
            'lista_bias': frase.lista_bias,
            'user_answer': frase.user_result.filter(function (user) {return Number(user.userId) === data.id;})
                                            .map(function (user) {return user.value;})
                                            .join(''),
        };
    });
    console.log("formatData",formatData);
    return(
        <DataTable value={formatData} key={formatData.id}   dataKey="id"  stripedRows showGridlines
        tableStyle={{minWidth:'60rem'}}>
            <Column field="testo_frase" header="Sentence" sortable ></Column>
            <Column field="lista_bias" header="Classification" sortable ></Column>
            <Column field="user_answer" header="User Answer" sortable ></Column>
        </DataTable>
    );
};
//<div className={stockClassName}>{rowData.quantity}</div>;
    const Ratingstyle = (rowData) => {
        if (rowData.rating>10) {
            return <div className="rag-green">{rowData.rating}</div>;
        }
        else if (rowData.rating>5 && rowData.rating<=10) {
            return <div  className="rag-yellow">{rowData.rating}</div>;
        }
        else {
            return <div className="rag-red">{rowData.rating}</div>;
        }
    };

    const onDropdownChange = (e, rowData) => {
        setSelectedValues((prevState) => ({
          ...prevState,
          [rowData.id]: e.value
        }));
      };
    
      const dropdownBodyTemplate = (rowData) => {
        return (
          <Dropdown 
            defaultValue={rowData.role}
            value={selectedValues[rowData.id]} 
            options={ruoli} 
            onChange={(e) => onDropdownChange(e, rowData)}
            placeholder="Select an Option"
          />
        );
      };


    const AdminGrid2 = () => {
        return (
            <div className="card">
            <DataTable value={rowData}   dataKey="id"  stripedRows showGridlines 
            expandedRows={expandedRows} onRowToggle={(e) => setExpandedRows(e.data)}
            rowExpansionTemplate={rowExpansionTemplate} 
            tableStyle={{minWidth:'60rem'}}>
                <Column expander={allowExpansion} style={{ width: '3em' }} />
                <Column field="username" header="Username" sortable ></Column>
                <Column field="keywords" header="Keywords" sortable ></Column>
                <Column field="rating" header="Rating" sortable  body={Ratingstyle}></Column>
                <Column field="role" header="Role" body={dropdownBodyTemplate} sortable ></Column>
                

            </DataTable>
            </div>
        );
    };

    const Save = () => {
        console.log(selectedValues);
    };



    //--------------------------------------------Grid-------------------------------------
    
        
    {/*
    const Riepilogo = users.filter(function (user) {
        return user.role.type != "admin";
    }).map((user)=>{
        
        return (
            <>
            <tr key={user.id} >
                <td>{user.username}</td>
                <td>{user.role.type}</td>
                <td
              onClick={() => toggleCollapse(user.id)}
              style={{ cursor: 'pointer' }}
            >
              {expandedRows[user.id] ? '-' : '+'}
            </td>
            </tr>

            {expandedRows[user.id]  && (
                <tr>
                    <td colSpan="3">
                        <table>
                            <thead>
                                <tr>
                                <th>Sentence</th>
                                <th>Classification</th>
                                </tr>
                            </thead>
                            <tbody>
                                {user.frasi_classificates?user.frasi_classificates.map((sentence) => (
                                <tr key={sentence.id} >
                                    <td>{sentence.testo_frase}</td>
                                    <td>{sentence.lista_bias}</td>
                                </tr>
                                )):<tr >
                                <td>testo</td>
                                <td>bias</td>
                            </tr>}
                            </tbody>
                        </table>
                    </td>
                </tr>
            )}
          </>
        )
    });
    */}
    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
    return (
        <div className="dashboard ">
            <Navbarcustom />
            <div class="d-flex flex-column content">
                
                <div className="card m-5 d-block">
          <h5 className="card-header">Sentences Table</h5>
          <div className="card-body">
                    

          <AdminGrid2 />
                    
                    
                    </div>

                    <Col className="d-flex justify-content-around">
          <Button variant="secondary" className="mt-2">
            Cancel
          </Button>

          <Button variant="primary" className="mt-2"  onClick={Save}>
            Save changes
          </Button>

        </Col>
        <br />
                </div>
            
        
            </div>
        </div>
    );
}

export default AdminDashboard;

