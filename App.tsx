import React from 'react';
import MainNavigation from './src/Navigations/MainNavigation';
import {PaperProvider} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';

function App(): React.JSX.Element {
  return (
    <PaperProvider>
      <MainNavigation />
    </PaperProvider>
  );
}

export default App;
