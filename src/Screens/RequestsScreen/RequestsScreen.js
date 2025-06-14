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
    {id: 1, name: 'Siraj', RequestedRole: 'User'},
    {id: 2, name: 'Ali', RequestedRole: 'Supervisor'},
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
      {/* <ScrollView>
        // <RequestComponent />
        // <RequestComponent />
        // <RequestComponent />
        // <RequestComponent />
        // <RequestComponent />
        // <RequestComponent />
        //{' '}
      </ScrollView> */}
    </>
  );
};

export default RequestsScreen;
