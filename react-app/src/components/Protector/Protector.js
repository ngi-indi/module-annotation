import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthProvider';


const Protector = ({ component: Component  }) => {
  const navigate = useNavigate();
  const auth = useAuth();
  const jwt =(JSON.parse(auth.user || '{}').jwt||null); ;
  
  useEffect(() => {
  
  
    if (!jwt) {
      navigate('/');
    }
  }, [navigate, jwt]);

  return jwt ? <Component /> : null;
};

export default Protector;