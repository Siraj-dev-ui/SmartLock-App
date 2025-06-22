import React from 'react';
import {UserProvider} from './UserProvider';
import {DoorProvider} from './DoorProvider';

const AppContext = ({children}) => {
  return (
    <UserProvider>
      {/* Add more providers here as needed */}
      <DoorProvider>{children}</DoorProvider>
    </UserProvider>
  );
};

export default AppContext;
