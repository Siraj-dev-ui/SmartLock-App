import React from 'react';
import {UserProvider} from './UserProvider';
import {DoorProvider} from './DoorProvider';
import {RequestsProvider} from './RequestsProvider';

const AppContext = ({children}) => {
  return (
    <UserProvider>
      {/* Add more providers here as needed */}

      <DoorProvider>
        <RequestsProvider>{children}</RequestsProvider>
      </DoorProvider>
    </UserProvider>
  );
};

export default AppContext;
