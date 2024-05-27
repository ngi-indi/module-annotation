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
        
      //const res = await response.json();
      if (data.jwt) {
        storeUser(data)
        
        setUser(JSON.stringify({
          username: data.user.username,
          jwt: data.jwt,
          id: data.user.id,
          email: data.user.email
        }));
        /*
        setToken(data.jwt);
        localStorage.setItem("site", data.jwt);
        localStorage.setItem("user", JSON.stringify(data.user));
        */
        navigate("/dashboard");
        return;
      }
      throw new Error("Non sei autorizzato a visualizzare questa pagina!");
    } catch (err) {
      console.error(err);
    }
  };
  const storeUser = (data) => {
    localStorage.setItem(
      "user",
      JSON.stringify({
        username: data.user.username,
        jwt: data.jwt,
        id: data.user.id,
        email: data.user.email
      })
    );
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