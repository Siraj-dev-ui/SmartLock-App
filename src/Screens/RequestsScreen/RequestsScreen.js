import React, {useEffect, useState} from 'react';
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
import {axios} from '../../Utils/Axios';
import {useRequests} from '../../Contexts/RequestsProvider';

const RequestsScreen = () => {
  const {requests, setRequests} = useRequests();

  const onPressApprove = async id => {
    const resp = await axios.patch('/users/approve-request', null, {
      params: {id},
    });

    if (resp.status === 200) {
      setRequests(requests.filter(item => item._id !== id));
    }
  };
  const onPressReject = async id => {
    const resp = await axios.patch('/users/reject-request', null, {
      params: {id},
    });

    if (resp.status === 200) {
      setRequests(requests.filter(item => item._id !== id));
    }
  };

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

      {requests.length !== 0 ? (
        <FlatList
          data={requests}
          renderItem={({item}) => (
            <RequestComponent
              item={item}
              onPressApprove={onPressApprove}
              onPressReject={onPressReject}
            />
          )}
          keyExtractor={item => item._id.toString()}
        />
      ) : (
        <View style={{justifyContent: 'center', alignItems: 'center', flex: 1}}>
          <Text style={{fontSize: 15}}>Currently No Request</Text>
        </View>
      )}
    </>
  );
};

export default RequestsScreen;
