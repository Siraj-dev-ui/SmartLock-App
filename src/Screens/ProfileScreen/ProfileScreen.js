import React from 'react';
import {Image, Text, View} from 'react-native';
import {DefaultColors} from '../../Utils/Theme';
import {Card} from 'react-native-paper';

import Entypo from 'react-native-vector-icons/Entypo';

const ProfileScreen = () => {
  return (
    <View>
      <View
        style={{
          flexDirection: 'row',
          padding: 10,
          alignItems: 'center',
          backgroundColor: DefaultColors.gray,
          borderBottomRightRadius: 20,
          borderBottomLeftRadius: 20,
        }}>
        <Image
          source={require('../../../assets/Images/profile.png')}
          style={{width: 70, height: 70, marginHorizontal: 10}}
        />

        <View>
          <Text style={{padding: 2, fontSize: 15}}>John Smith</Text>
          <Text style={{padding: 2, fontSize: 15}}>john.smith@gmail.com</Text>
          <Text style={{padding: 2, fontSize: 15}}>Supervisor</Text>
        </View>
      </View>

      <View>
        <Card style={{margin: 10, padding: 5}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/Images/configurations.png')}
                  style={{width: 30, height: 30, marginHorizontal: 10}}
                />
                <Text style={{fontSize: 15}}>Configurations</Text>
              </View>

              <View style={{alignSelf: 'flex-end', justifyContent: 'flex-end'}}>
                <Entypo
                  name="chevron-down"
                  size={25}

                  // color={focused ? 'blue' : ''}
                />
              </View>
            </View>

            {/* <View style={{flexDirection: 'row'}}>
              <Text> Monday </Text>
              <Text> from </Text>
              <Text> to </Text>
            </View> */}
          </View>
        </Card>

        <Card style={{marginHorizontal: 10, marginVertical: 5, padding: 5}}>
          <View>
            <View
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                justifyContent: 'space-between',
                paddingVertical: 10,
              }}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  source={require('../../../assets/Images/logout.png')}
                  style={{width: 30, height: 30, marginHorizontal: 10}}
                />
                <Text style={{fontSize: 15}}>Logout</Text>
              </View>
            </View>

            {/* <View style={{flexDirection: 'row'}}>
              <Text> Monday </Text>
              <Text> from </Text>
              <Text> to </Text>
            </View> */}
          </View>
        </Card>
      </View>
    </View>
  );
};

export default ProfileScreen;
