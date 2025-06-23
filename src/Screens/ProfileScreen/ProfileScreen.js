import React, {useState} from 'react';
import {
  Image,
  Text,
  Touchable,
  TouchableOpacity,
  View,
  LayoutAnimation,
  Platform,
  UIManager,
  Button,
} from 'react-native';
import {DefaultColors} from '../../Utils/Theme';
import {Card} from 'react-native-paper';

import Entypo from 'react-native-vector-icons/Entypo';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../../Contexts/UserProvider';
import {useDoor} from '../../Contexts/DoorProvider';
import LabTimingsComponent from '../../Components/LabTimings';
import {black} from 'react-native-paper/lib/typescript/styles/themes/v2/colors';
import {axios} from '../../Utils/Axios';
import socket from '../../Socket/Socket';

const ProfileScreen = () => {
  // const initialSchedule = {
  //   Monday: {opening_time: '09:00', closing_time: '17:00', is_open: true},
  //   Tuesday: {opening_time: '09:00', closing_time: '17:00', is_open: true},
  //   Wednesday: {opening_time: '09:00', closing_time: '17:00', is_open: true},
  //   Thursday: {opening_time: '09:00', closing_time: '17:00', is_open: true},
  //   Friday: {opening_time: '09:00', closing_time: '17:00', is_open: true},
  //   Saturday: {opening_time: '10:00', closing_time: '14:00', is_open: true},
  //   Sunday: {opening_time: '', closing_time: '', is_open: false},
  // };

  const navigation = useNavigation();
  const {user, setUser} = useUser();
  const {door, setDoor} = useDoor();
  const initialSchedule = door.schedule;

  console.log('door in profile screen : ', door);

  const [isExpanded, setIsExpanded] = useState(false);
  const [editable, setEditable] = useState(false);
  const [schedule, setSchedule] = useState(initialSchedule);

  const onPressLogout = async () => {
    await AsyncStorage.removeItem('user');
    setUser(null);
    if (socket && socket.connected) {
      socket.disconnect();
    }
    navigation.reset({
      index: 0,
      routes: [{name: 'LoginScreen'}],
    });
  };

  const onPressUpdateTime = async () => {
    console.log('Updated time : ', schedule);

    const resp = await axios.patch('/doors/update-timings', {
      id: door._id,
      schedule,
    });

    // setDoor(resp.data);
    setEditable(false);
  };

  const onPressCancel = () => {
    setEditable(false);
    setSchedule(initialSchedule);
  };

  const toggleDayOpenStatus = day => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        is_open: !prev[day].is_open,
      },
    }));
  };
  const handleTimeChange = (day, key, value) => {
    setSchedule(prev => ({
      ...prev,
      [day]: {
        ...prev[day],
        [key]: value,
      },
    }));
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
          <Text style={{padding: 2, fontSize: 15}}>{user?.name}</Text>
          <Text style={{padding: 2, fontSize: 15}}>{user?.email}</Text>
          <Text style={{padding: 2, fontSize: 15}}>{user?.requested_role}</Text>
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

              <TouchableOpacity
                onPress={() => setIsExpanded(!isExpanded)}
                style={{alignSelf: 'flex-end', justifyContent: 'flex-end'}}>
                <Entypo
                  name="chevron-down"
                  size={25}

                  // color={focused ? 'blue' : ''}
                />
              </TouchableOpacity>
            </View>

            {isExpanded && (
              <View
                style={{
                  flexDirection: 'row-reverse',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  marginHorizontal: 10,
                  // paddingVertical: 10,
                }}>
                <View
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    marginVertical: 5,
                    // justifyContent: 'center'
                  }}>
                  {editable ? (
                    <TouchableOpacity
                      onPress={onPressUpdateTime}
                      style={{
                        flexDirection: 'row',
                        alignItems: 'center',
                        marginVertical: 5,
                        // justifyContent: 'center'
                      }}>
                      <Text
                        style={{
                          // borderColor: DefaultColors.blue,
                          // borderWidth: 1,
                          padding: 8,
                          borderRadius: 5,
                          backgroundColor: DefaultColors.lightGreen,
                          color: DefaultColors.green,
                          fontWeight: 'bold',
                        }}>
                        UPDATE
                      </Text>
                    </TouchableOpacity>
                  ) : (
                    // <AntDesign
                    //   name="edit"
                    //   size={25}
                    //   color="blue"
                    //   // color={focused ? 'blue' : ''}
                    // />

                    <TouchableOpacity onPress={() => setEditable(true)}>
                      <Image
                        source={require('../../../assets/Images/edit.png')}
                        style={{width: 30, height: 30}}
                      />
                    </TouchableOpacity>
                  )}
                </View>

                {editable && (
                  // <Text
                  //   style={{
                  //     backgroundColor: DefaultColors.red,
                  //     color: DefaultColors.white,
                  //     width: 20,
                  //     height: 20,
                  //     fontWeight: 'bold',
                  //     borderRadius: 10,

                  //     textAlign: 'center',
                  //     textAlignVertical: 'center',
                  //   }}>
                  //   x
                  // </Text>

                  <TouchableOpacity onPress={onPressCancel}>
                    <Image
                      source={require('../../../assets/Images/cancel.png')}
                      style={{width: 20, height: 20}}
                    />
                  </TouchableOpacity>
                )}
              </View>
            )}
            {isExpanded &&
              // Object.entries(door.schedule).map(([day, timing]) => (
              Object.entries(schedule).map(([day, timing]) => (
                <LabTimingsComponent
                  key={day}
                  day={day}
                  timing={timing}
                  editable={editable}
                  toggleDayOpenStatus={toggleDayOpenStatus}
                  handleTimeChange={handleTimeChange}
                />
              ))}
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
