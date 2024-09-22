import React, { createContext, useState } from 'react';

export const UserContext = createContext(
  {
    user: null,
    setUser: () => {},
  }
);

export const UserProvider = ({ children }) => {
  const [user, setUser] = useState("vediamo se funziona il context");


  return (
    <UserContext.Provider value={[ user, setUser ]}>
      {children}
    </UserContext.Provider>
  );
};

