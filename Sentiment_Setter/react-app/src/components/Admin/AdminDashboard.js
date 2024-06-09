import React, { useEffect,useState,useContext } from "react";
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

const AdminDashboard=()=>{
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true); // To handle loading state    useContext(SentimentContext);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});
    const [rowData, setRowData] = useState([]);

    const toggleCollapse = (userId) => {
        setExpandedRows(prevState => ({
        ...prevState,
        [userId]: !prevState[userId]
        }));
    };

    const user =JSON.parse(auth.user || '{}') 

    const [colDefs] = useState([
        { label:"Username",field: "username" },
        { label:"Sentences annotated", field: "frasi_classificates" },
        { label:"Keywords", field: "keywords" },
        { label:"Rating", field: "rating" ,cellClassRules: {
            // apply green to 2008
            'rag-green': params => params.value > 10,
            // apply blue to 2004
            'rag-yellow': params => params.value >5 && params.value <= 10,
            // apply red to 2000
            'rag-red': params => params.value < 5,
        } },
        { label:"Role", field: "role",editable: true,
        cellEditor: 'agSelectCellEditor',cellEditorParams: {values: ['authenticated', 'public']} },
    ]);
    const ratingRenderer = (params) => {
    };
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
                username: user.username,
                role: user.role.type,
                rating: user.rating,
                frasi_classificates: user.frasi_classificates,
                keywords: user.lista_bias
            };
        });

        setRowData(formattedData.filter(function (user) {
            return user.role != "admin";
        }));

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

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error loading data</div>;
    const defaultColDef = {
        sortable: true,
        filter: true,
        flex: 1,
        minWidth: 100,
        resizable: true,
      };
    const AdminGrid = ()=>{
        return(
            <div className="ag-theme-quartz" style={{ height: 400, width: '100%' }}>
            <AgGridReact
            columnDefs={colDefs}
            rowData={rowData}
            defaultColDef={defaultColDef}
            pagination={true}
            singleClickEdit={true}
            paginationPageSize={10}
            paginationPageSizeSelector={[10,20,50,100]}
            domLayout='autoHeight'
            rowSelection='single'
            onRowClicked={(row) => {
                console.log(row.data);
            }}
        />
        </div>
        );

    };
        
    
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
    {/**/}
    
    return (
        <div className="dashboard ">
            <Navbarcustom />
            <div class="d-flex flex-column content">
                
                <div className="card m-5 d-block">
          <h5 className="card-header">Sentences Table</h5>
          <div className="card-body">
                    

                        <AdminGrid />
                    
                    
                    </div>

                    <Col className="d-flex justify-content-around">
          <Button variant="secondary" className="mt-2">
            Cancel
          </Button>

          <Button variant="primary" className="mt-2" >
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

