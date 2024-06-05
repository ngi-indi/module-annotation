import { useContext, createContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(localStorage.getItem("user") || "");
  //const [token, setToken] = useState(localStorage.getItem("site") || "");
  const navigate = useNavigate();

  const loginAction = async (data1) => {
    const url = `http://localhost:1337/api/auth/local`;
    const initialUser = { password: "", identifier: "" };
    initialUser.identifier = data1.email;
    initialUser.password = data1.password;
    try {
      const { data } = await axios.post(url, initialUser);
      //console.log("data ", data); 
      //const res = await response.json();
      if (data.jwt) {
        //role.data.role.type
        const data2=await axios.get(`http://localhost:1337/api/users/me`, {
          headers: {
            Authorization: `Bearer ${data.jwt}`
          },
          params:{
            populate: ["role"]
          }
        });
        console.log("res",data2);
        
        //console.log("role",role.data.role.type);
        //console.log("lista_bias",role.data.lista_bias);
        
        const user = {  
                        username: data2.data.username,
                        jwt: data.jwt,
                        id: data2.data.id,
                        email: data2.data.email,
                        role: data2.data.role.type,
                        lista_bias: data2.data.lista_bias
                      };

        storeUser(user);
        
        setUser(JSON.stringify(user));

      
        navigate("/dashboard");
        return;
      }
      throw new Error("Non sei autorizzato a visualizzare questa pagina!");
    } catch (err) {
      console.error(err);
    }
  };

  const storeUser = (user) => {
    localStorage.setItem(
      "user",
      JSON.stringify( user )
    );
    console.log("local user", localStorage.getItem("user"));
  };

  const logOut = () => {
    setUser(null);
    //setToken("");
    //localStorage.removeItem("site");
    localStorage.removeItem("user");
    navigate("/");
  };

  return (
    <AuthContext.Provider value={{ user, loginAction, logOut }}>
      {children}
    </AuthContext.Provider>
  );

};

export default AuthProvider;

export const useAuth = () => {
  return useContext(AuthContext);
};