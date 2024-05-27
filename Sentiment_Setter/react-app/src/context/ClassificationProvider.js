import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export const ClassificationContext= createContext();

export const ClassificationProvider=({children}) =>{
    const [classification,setClassification]=useState(localStorage.getItem("classific") || {});

    const storeCl= (data) => {
        setClassification(
            JSON.stringify(data)
          );
        localStorage.setItem(
          "classific",
          JSON.stringify(data)
            
          
        );
    };
    const removeCl=()=>{
        //setClassification(null);
        localStorage.removeItem("classific");
    };
    
    
    return(
        <ClassificationContext.Provider value={{ classification, storeCl, removeCl }}>
          {children}
        </ClassificationContext.Provider>
      );
    //salvare direttamente le frasi con un sentiment selezionato e buona





}

export default ClassificationProvider;

export const useClassification = () => {
    return useContext(ClassificationContext);
  };