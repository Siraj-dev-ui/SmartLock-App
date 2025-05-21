import React from 'react';
import {ScrollView, SafeAreaView, Text, View} from 'react-native';

function App(): React.JSX.Element {
  const safePadding = '5%';

  return (
    <SafeAreaView>
        <View>
          <View style={{paddingRight: safePadding}}>
            <Text style={{color: 'black'}}>this is scroll view from here</Text>
          </View>
        </View>
    </SafeAreaView>
  );
}

export default App;
