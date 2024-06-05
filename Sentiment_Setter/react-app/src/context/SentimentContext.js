import React, { createContext, useState } from 'react';


export const SentimentContext = createContext({
  selectedSentimentArray: [],
  setselectedSentimentArray: () => { },
});

export const SentimentProvider = ({ children }) => {
  const [selectedSentimentArray, setselectedSentimentArray] = useState(["il problema è che non riesco a capire come funziona il context"]);


  return (
    <SentimentContext.Provider value={[selectedSentimentArray, setselectedSentimentArray ]}>
      {children}
    </SentimentContext.Provider>
  );
};


