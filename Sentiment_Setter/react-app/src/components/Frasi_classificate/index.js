import { userData } from "../../helpers";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Nav } from "reactstrap";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import Navbarcustom from "../navbar";
const initialUser = { password: "", identifier: "" };


const Frasi_Classificate = () => {
  const [user, setUser] = useState(initialUser);
  const [frasi, setFrasi] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state

  useEffect(() => {
    const fetchFrasiClassificate = async () => {
      try {
        const { jwt } = userData();
        const {id} = userData();
        const {username} = userData();
        console.log(id);
        const response = await axios.get('http://localhost:1337/api/frasi-classificates', {
          headers: {
            Authorization: `Bearer ${jwt}`
          },
          params: {
            'filters[users_permissions_user][$eq]': id
            }
        });
        setFrasi(response.data.data);
        setLoading(false);
      } catch (error) {
        console.error('Error fetching data:', error);
        setError(error);
        setLoading(false);
      }
    };

    fetchFrasiClassificate();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;

  return (
    <div>
      <Navbarcustom/>
    
    <div>
      <h1>View all frasi</h1>
      <ul>
        {frasi.map((frase) => (
          <li key={frase.id}>{frase.attributes.testo_frase}  {frase.attributes.lista_topic} {frase.attributes.sentiment}  </li>
        ))}
      </ul>
    </div>
    </div>
  );
};

export default Frasi_Classificate;