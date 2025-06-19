import React from 'react';
import MainNavigation from './src/Navigations/MainNavigation';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {ToastProvider} from 'react-native-toast-notifications';
import AppProviders from './src/Contexts/AppProvider';

function App(): React.JSX.Element {
  return (
    <AppProviders>
      <PaperProvider>
        <ToastProvider>
          <MainNavigation />
        </ToastProvider>
      </PaperProvider>
    </AppProviders>
  );
}

export default App;
