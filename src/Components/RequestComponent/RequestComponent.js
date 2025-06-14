import React from 'react';
import {View, TouchableOpacity} from 'react-native';
import {Card, Text} from 'react-native-paper';
import {Colors, DefaultColors} from '../../Utils/Theme';

const RequestComponent = ({item}) => {
  return (
    <Card style={{margin: 15, padding: 10, position: 'relative'}}>
      <Text>{item.name}</Text>
      <Text>Requested Role {item.RequestedRole}</Text>
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
            width: '100',
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
            width: '100',
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
