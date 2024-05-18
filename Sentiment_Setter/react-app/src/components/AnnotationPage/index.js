import { userData } from "../../helpers";
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Button, Nav } from "reactstrap";
import { useNavigate } from "react-router-dom";
//import { Button } from "reactstrap";
import Select from 'react-select'
import Navbarcustom from "../navbar";

const AnnotationPage = () => {
  const [frasi, setFrasi] = useState([]);
  const [loading, setLoading] = useState(true); // To handle loading state
  const [error, setError] = useState(null); // To handle error state
  const [selectedOption, setSelectedOption] = useState(null);

  const navigate = useNavigate();

  const handleSave_Changes = async () => {
    //bisogna aggiornare il flag_classificazione delle frasi in cui è stato selezionato un valore
    //bisogna aggiungere le frasi in cui è stato selezionato un valore alla tabella frasi_classificates
    

    

  };
  const options = [
    { value: 'neutral', label: 'Neutral' },///rendere tutto scalabile
    { value: 'positive', label: 'Positive' },
    { value: 'negative', label: 'Negative' }
  ]
  const handleCancel = async () => { 
    console.log("Cancellato");
    navigate("/Nuove_Frasi");    
    };
  useEffect(() => {
    const fetchFrasi = async () => {
      try {
        const { jwt } = userData();
        const response = await axios.get('http://localhost:1337/api/frasi-da-classificares?filters[flag_classificazione][$eq]=true', {
          headers: {
            Authorization: `Bearer ${jwt}`
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

    fetchFrasi();
  }, []);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error loading data</div>;
  const handleChange = (option) => {
    setSelectedOption(option);
    console.log(`Option selected:`, option.value);
  };
  return (//fare una cazzo di tabella
    <div>
      <Navbarcustom/>
      <div>
        <h1>View all frasi</h1>
        <ul>
          {frasi.map((frase) => (
            <li key={frase.id}>{frase.attributes.testo_frase}  {frase.attributes.lista_topic} {frase.attributes.flag_classificazione} 
            <Select className="dropdown" 
            options={options}
            value={selectedOption}
            onChange={handleChange}/>
            
            </li>
          ))}
        </ul>
      </div>
      <Button onClick={handleSave_Changes}>Salva i cambiamenti</Button>   <Button onClick={handleCancel}>Cancel</Button>
    </div>

  );
};

export default AnnotationPage;