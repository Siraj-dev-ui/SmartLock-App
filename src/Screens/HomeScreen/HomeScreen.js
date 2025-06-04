import React from 'react';
import {Text, View} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';

const HomeScreen = () => {
  return (
    <View>
      <Text> Home screen</Text>
      <Entypo name="home" size={30} color="#900" />
    </View>
  );
};

export default HomeScreen;
