import React, {useState} from 'react';
import {Switch, Text, TouchableOpacity, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {DefaultColors} from '../../Utils/Theme';

const HomeScreen = () => {
  const [doorStatus, setDoorStatus] = useState(false);
  const [autoUnlock, setAutoUnlock] = useState(false);
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        // margin: 20,
        borderWidth: 6,
        flex: 1,
        borderColor: DefaultColors.red,
      }}>
      <View
        style={{
          flexDirection: 'row',
          justifyContent: 'space-around',
          width: '100%',
        }}>
        <Text>Auto Unlock {autoUnlock ? 'ON' : 'OFF'}</Text>
        <Switch
          trackColor={{false: '#767577', true: '#81b0ff'}}
          thumbColor={autoUnlock ? DefaultColors.blue : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={() => setAutoUnlock(!autoUnlock)}
          value={autoUnlock}
        />
      </View>

      {!autoUnlock && (
        <TouchableOpacity
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: doorStatus
              ? DefaultColors.green
              : DefaultColors.red,
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
      )}
      <Text style={{margin: 10, fontWeight: 'bold'}}>
        {' '}
        The LAB is {!doorStatus ? 'Closed' : 'Open'}.
      </Text>
    </View>
  );
};

export default HomeScreen;
