import React from 'react';
import MainNavigation from './src/Navigations/MainNavigation';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';
import AppContext from './src/Contexts/AppContext';

function App(): React.JSX.Element {
  return (
    <AppContext>
      <PaperProvider>
        <ToastProvider>
          <MainNavigation />
        </ToastProvider>
      </PaperProvider>
    </AppContext>
  );
}

export default App;
