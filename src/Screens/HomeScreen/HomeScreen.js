import React, {useState} from 'react';
import {Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {DefaultColors} from '../../Utils/Theme';

const HomeScreen = () => {
  const [doorStatus, setDoorStatus] = useState(false);
  return (
    <View style={{flex: 1, alignItems: 'center', margin: 20}}>
      <TouchableOpacity
        style={{
          width: 150,
          height: 150,
          borderRadius: 75,
          backgroundColor: doorStatus ? DefaultColors.green : DefaultColors.red,
          justifyContent: 'center',
          alignItems: 'center',
        }}
        onPress={() => setDoorStatus(!doorStatus)}>
        <Text
          style={{
            color: DefaultColors.white,
            fontSize: 30,
            alignSelf: 'center',
          }}>
          {doorStatus ? 'Lock' : 'Unlock'}
        </Text>
      </TouchableOpacity>
      <Text style={{margin: 10, fontWeight: 'bold'}}>
        {' '}
        The LAB is {!doorStatus ? 'Closed' : 'Open'}.
      </Text>
    </View>
  );
};

export default HomeScreen;
