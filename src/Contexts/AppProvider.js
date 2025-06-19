import React from 'react';
import {UserProvider} from './UserProvider';

const AppProviders = ({children}) => {
  return (
    <UserProvider>
      {/* Add more providers here as needed */}
      {children}
    </UserProvider>
  );
};

export default AppProviders;
