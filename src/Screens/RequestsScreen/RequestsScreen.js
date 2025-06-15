import React from 'react';
import {
  View,
  Switch,
  TouchableOpacity,
  ScrollView,
  FlatList,
} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {Colors, DefaultColors, FontSize} from '../../Utils/Theme';
import RequestComponent from '../../Components/RequestComponent';

const RequestsScreen = () => {
  const data = [
    {
      id: 1,
      name: 'Ayaan Khan',
      email: 'ayaan.khan@gmail.com',
      RequestedRole: 'User',
    },
    {
      id: 2,
      name: 'John Smith',
      email: 'john.smith@gmail.com',
      RequestedRole: 'Supervisor',
    },
    {
      id: 3,
      name: 'Ravi Patel',
      email: 'ravi.patel@gmail.com',
      RequestedRole: 'User',
    },
    {
      id: 4,
      name: 'Zain Ali',
      email: 'zain.ali@gmail.com',
      RequestedRole: 'Supervisor',
    },
    {
      id: 5,
      name: 'Omar Farooq',
      email: 'omar.farooq@gmail.com',
      RequestedRole: 'User',
    },
    {
      id: 6,
      name: 'Emily Watson',
      email: 'emily.watson@gmail.com',
      RequestedRole: 'User',
    },
    {
      id: 7,
      name: 'Fatima Sheikh',
      email: 'fatima.sheikh@gmail.com',
      RequestedRole: 'User',
    },
    {
      id: 8,
      name: 'Rahul Mehta',
      email: 'rahul.mehta@gmail.com',
      RequestedRole: 'Supervisor',
    },
  ];
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
      <FlatList
        data={data}
        renderItem={({item}) => <RequestComponent item={item} />}
        keyExtractor={item => item.id.toString()}
      />
    </>
  );
};

export default RequestsScreen;
