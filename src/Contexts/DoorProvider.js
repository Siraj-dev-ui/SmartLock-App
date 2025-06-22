import React, {createContext, useState, useContext, useEffect} from 'react';

const DoorContext = createContext(null);

export const DoorProvider = ({children}) => {
  const [door, setDoor] = useState(null);

  useEffect(() => {
    console.log('Door context', door);
  });
  return (
    <DoorContext.Provider value={{door, setDoor}}>
      {children}
    </DoorContext.Provider>
  );
};

// Custom hook for easier usage in components
export const useDoor = () => useContext(DoorContext);
