import React from 'react';
import {View, Switch, TouchableOpacity, ScrollView} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {Colors, DefaultColors, FontSize} from '../../Utils/Theme';
import RequestComponent from '../../Components/RequestComponent';

const RequestsScreen = () => {
  return (
    <>
      <Text
        style={{
          width: '100%',
          textAlign: 'center',
          fontWeight: 'bold',
          fontSize: FontSize.large,
          margin: 10,
        }}>
        Sign Up Requests
      </Text>
      <ScrollView>
        <RequestComponent />
        <RequestComponent />
        <RequestComponent />
        <RequestComponent />
        <RequestComponent />
        <RequestComponent />
      </ScrollView>
    </>
  );
};

export default RequestsScreen;
