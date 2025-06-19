import React, {createContext, useState, useContext, useEffect} from 'react';

const UserContext = createContext(null);

export const UserProvider = ({children}) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    console.log('user context', user);
  });
  return (
    <UserContext.Provider value={{user, setUser}}>
      {children}
    </UserContext.Provider>
  );
};

// Custom hook for easier usage in components
export const useUser = () => useContext(UserContext);
