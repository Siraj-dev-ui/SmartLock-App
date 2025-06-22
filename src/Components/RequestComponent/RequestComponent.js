import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {Colors, DefaultColors} from '../../Utils/Theme';

const RequestComponent = ({item}) => {
  return (
    <Card style={{margin: 15, padding: 10, position: 'relative'}}>
      <View style={{flexDirection: 'row'}}>
        <Text style={{width: '45%', fontWeight: 'bold', paddingVertical: 5}}>
          Name
        </Text>
        <Text>{item.name}</Text>
      </View>

      <View style={{flexDirection: 'row'}}>
        <Text style={{width: '45%', fontWeight: 'bold', paddingVertical: 5}}>
          Email{' '}
        </Text>
        <Text>{item.email}</Text>
      </View>
      <View style={{flexDirection: 'row'}}>
        <Text style={{width: '45%', fontWeight: 'bold', paddingVertical: 5}}>
          Requested Role{' '}
        </Text>
        <Text
          style={
            item.RequestedRole == 'Supervisor' && {color: DefaultColors.orange}
          }>
          {item.requested_role}
        </Text>
      </View>

      <View
        style={{
          flexDirection: 'row',
          position: 'relative',
          justifyContent: 'space-around',
          padding: 10,
        }}>
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            // width: '100',
            width: '45%',
            paddingVertical: 15,
            borderRadius: 10,
            backgroundColor: Colors.reject,
            // margin: 5,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              color: DefaultColors.white,
            }}>
            REJECT
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={{
            borderWidth: 0.5,
            // width: '100',
            width: '45%',
            paddingVertical: 15,
            borderRadius: 10,
            backgroundColor: Colors.approve,
            // margin: 5,
          }}>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              color: DefaultColors.white,
            }}>
            APPROVE
          </Text>
        </TouchableOpacity>
      </View>
    </Card>
  );
};

export default RequestComponent;
