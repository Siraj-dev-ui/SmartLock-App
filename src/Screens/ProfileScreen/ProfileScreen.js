import React from 'react';
import {Image, Text, Touchable, TouchableOpacity, View} from 'react-native';
import {DefaultColors} from '../../Utils/Theme';
import {Card} from 'react-native-paper';

import Entypo from 'react-native-vector-icons/Entypo';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../../Contexts/UserProvider';

const ProfileScreen = () => {
  const navigation = useNavigation();
  const {setUser} = useUser();

  const onPressLogout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };
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
          <Text style={{padding: 2, fontSize: 15}}>Emily Watson</Text>
          <Text style={{padding: 2, fontSize: 15}}>emily.watson@gmail.com</Text>
          <Text style={{padding: 2, fontSize: 15}}>User</Text>
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
                <Text style={{fontSize: 15}}>Lab Timings</Text>
              </View>

              <View style={{alignSelf: 'flex-end', justifyContent: 'flex-end'}}>
                <Entypo
                  name="chevron-down"
                  size={25}

                  // color={focused ? 'blue' : ''}
                />
              </View>
            </View>

            <View style={{flexDirection: 'row'}}>
              <Text> Monday </Text>
              <Text> from </Text>
              <Text> to </Text>
            </View>
          </View>
        </Card>

        <Card style={{marginHorizontal: 10, marginVertical: 5, padding: 5}}>
          <TouchableOpacity onPress={onPressLogout}>
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
          </TouchableOpacity>
        </Card>
      </View>
    </View>
  );
};

export default ProfileScreen;
