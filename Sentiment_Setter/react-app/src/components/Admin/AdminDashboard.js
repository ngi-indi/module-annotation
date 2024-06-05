import React, { useEffect,useState,useContext } from "react";
import { useAuth } from "../../context/AuthProvider";
import { Link, useNavigate,useLocation } from "react-router-dom";
import Navbarcustom   from "../navbar";
import { Container, Row, Col, Button } from 'react-bootstrap';
import axios from "axios";
import { Card } from "reactstrap";
import { CloseButton } from "react-bootstrap";
import Select from 'react-select'

const AdminDashboard=()=>{
    const auth = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const [loading, setLoading] = useState(true); // To handle loading state    useContext(SentimentContext);
    const [error, setError] = useState(null);
    const [users, setUsers] = useState([]);
    const [expandedRows, setExpandedRows] = useState({});

    const toggleCollapse = (userId) => {
        setExpandedRows(prevState => ({
        ...prevState,
        [userId]: !prevState[userId]
        }));
    };

    const user =JSON.parse(auth.user || '{}') 

    const UsersData = async () => {
        try {
        const data = await axios.get('http://localhost:1337/api/users?populate=*', {
            headers: {
                Authorization: `Bearer ${user.jwt}`
            }
        });
        setUsers(data.data);
        console.log("users",data);
        console.log("users",data.data); 
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
        <div className="dashboard content">
            <Navbarcustom />
            <div class="d-flex flex-column content">
                <h1>Admin Dashboard</h1>
                <h2>Welcome {user?.username}</h2>
                
                <Card className="m-5 d-block " id="card">
                    <Col className="d-flex justify-content-around">
                        <table className="table">
                        <thead>
                            <tr>
                            <th scope="col">Username</th>
                            <th scope="col">Role</th>
                            <th scope="col"></th>
                            </tr>
                        </thead>
                        <tbody>
                            {Riepilogo}
                            {/**/}
                        </tbody>
                        </table>
                    </Col>
                </Card>
            </div>
        </div>
    );
}

export default AdminDashboard;