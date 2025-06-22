import React, {createContext, useState, useContext, useEffect} from 'react';

const RequestsContext = createContext(null);

export const RequestsProvider = ({children}) => {
  const [requests, setRequests] = useState([]);

  useEffect(() => {
    console.log('requests context', requests);
  });
  return (
    <RequestsContext.Provider value={{requests, setRequests}}>
      {children}
    </RequestsContext.Provider>
  );
};

// Custom hook for easier usage in components
export const useRequests = () => useContext(RequestsContext);
