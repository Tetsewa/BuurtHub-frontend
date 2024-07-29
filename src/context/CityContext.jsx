import React, { createContext, useState } from 'react';

const CityContext = createContext();

const CityProvider = ({ children }) => {
const [selectedCity, setSelectedCity] = useState('');

  return (
    <CityContext.Provider value={{ selectedCity, setSelectedCity }}>
      {children}
    </CityContext.Provider>
  );
};
export {CityContext, CityProvider};