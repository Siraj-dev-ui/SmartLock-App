import React, {useEffect, useRef, useState} from 'react';
import {
  Switch,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  ActivityIndicator,
  Modal,
  ScrollView,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {BleManager, State} from 'react-native-ble-plx';
import {PermissionsAndroid, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {Colors, DefaultColors} from '../../Utils/Theme';
import {Card} from 'react-native-paper';
import {axios} from '../../Utils/Axios';
import {Actions, Door, RoomStatus} from '../../Utils/Constants';
import {useToast} from 'react-native-toast-notifications';
import moment from 'moment';
import {useUser} from '../../Contexts/UserProvider';
import {useDoor} from '../../Contexts/DoorProvider';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useRequests} from '../../Contexts/RequestsProvider';
import socket from '../../Socket/Socket';

const manager = new BleManager();
// const interval = null;

const HomeScreen = () => {
  const toast = useToast();
  const {user, setUser} = useUser();
  const {door, setDoor} = useDoor();
  const {setRequests} = useRequests();
  // const monitorInterval = useRef(null);
  // const manager = useRef(new BleManager()).current;

  const [doorStatus, setDoorStatus] = useState(false);
  const [actionPending, setActionPending] = useState(false);
  const [autoUnlock, setAutoUnlock] = useState(user?.auto_unlock);
  const [labStatus, setLabStatus] = useState(true);
  const [deviceFound, setDeviceFound] = useState(false);

  const [lockStatus, setLockStatus] = useState(true);
  const [scanStatus, setScanStatus] = useState('IDLE');

  const onPressUnlock = async () => {
    console.log('lock status locla : ', lockStatus);
    if (door?.door_lock_status) {
      await axios.post('/actions/add-action', {
        action_id: Actions.UNLOCK_DOOR,
      });
      // setLockStatus(false);
    } else {
      await axios.post('/actions/add-action', {
        action_id: Actions.LOCK_DOOR,
      });
      // setLockStatus(true);
    }
    setActionPending(true);
  };

  const days = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
  ];

  function isLabOpen(schedule) {
    const now = new Date();

    // Step 1: Get current day

    const today = days[now.getDay()];

    const todaySchedule = schedule[today];

    // Step 2: Check if door is set to open today
    if (!todaySchedule || !todaySchedule.is_open) {
      return false;
    }

    // Step 3: Get current time in HH:mm
    const currentTime = moment(now).format('HH:mm');

    // Step 4: Compare with opening and closing time
    return (
      currentTime >= todaySchedule.opening_time &&
      currentTime <= todaySchedule.closing_time
    );
  }

  function getNextOpenDay(schedule, currentDayIndex) {
    // days array to loop through, Sunday=0 ... Saturday=6
    const days = [
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ];

    // Start checking the day after currentDayIndex
    for (let i = 1; i <= 7; i++) {
      const nextDayIndex = (currentDayIndex + i) % 7;
      const dayName = days[nextDayIndex];
      const daySchedule = schedule[dayName];

      if (daySchedule && daySchedule.is_open) {
        return {day: dayName, opening_time: daySchedule.opening_time};
      }
    }
    // If none found, return null or something default
    return null;
  }

  useEffect(() => {
    // setAutoUnlock(user.auto_unlock);
    async function fetchDoor() {
      try {
        const resp = await axios.get('/doors/get-door', {
          params: {id: Door.DOOR_ID},
        });

        if (resp.data) {
          const now = new Date();
          const todayIndex = now.getDay();

          const isLabOpenStatus = resp.data.schedule
            ? isLabOpen(resp.data.schedule)
            : false;

          const nextOpen = getNextOpenDay(resp.data.schedule, todayIndex);

          // console.log('resp.data.schedule:', resp.data.schedule);
          // console.log('isLabOpenStatus:', isLabOpenStatus);
          // console.log('current_day:', days[now.getDay()]);

          setDoor({
            ...resp.data,
            is_lab_open: isLabOpenStatus,
            current_day: days[todayIndex],
            nextOpen: nextOpen,
          });

          // toast.show('door found....');
        }
      } catch (error) {
        console.error('Error fetching door:', error);
      }
    }
    async function getPendingRequest() {
      const resp = await axios.get('/users/pending-requests');

      setRequests(resp.data);
    }

    fetchDoor();
    getPendingRequest();
  }, []);

  // const [message, setMessage] = useState('');

  // Sockets
  useEffect(() => {
    socket.connect();

    socket.on('connect', () => {
      console.log('Connected to WebSocket');
    });

    // socket.on('message', data => {
    //   console.log('Received message:', data);
    //   setMessage(data);
    // });

    socket.on('updateDoorStatus', data => {
      console.log('Door Status...', data.status);
      setDoor(prevDoor => ({
        ...prevDoor,
        door_status: data.status,
      }));
    });

    socket.on('updateLockStatus', data => {
      console.log('Lock Status...', data.status);
      setDoor(prevDoor => ({
        ...prevDoor,
        door_lock_status: data.status,
      }));

      setActionPending(false);
    });

    socket.on('updateRoomStatus', data => {
      console.log('Room Status...', data.status);

      setDoor(prevDoor => ({
        ...prevDoor,
        door_room_status: data.status,
      }));
    });

    socket.on('updateSupervisorCount', data => {
      console.log('Supervisor Count...', data.count);

      setDoor(prevDoor => ({
        ...prevDoor,
        supervisorCount: data.count,
      }));
    });

    // Clean up
    return () => {
      // console.log('socket Disconnecting..');
      socket.disconnect();
    };
  }, []);

  useEffect(() => {
    console.log('auto unlock updated.', autoUnlock);

    async function updateUserAutoUnlock() {
      const resp = await axios.patch('/users/update-auto-unlock', {
        id: user._id,
        autoUnlock: autoUnlock,
      });

      setUser(resp.data);
      await AsyncStorage.setItem('user', JSON.stringify(resp.data));
    }
    updateUserAutoUnlock();

    if (autoUnlock) {
      setDeviceFound(false);
      ScanForBluetooth();
    } else {
      console.log('stop scan called');
      manager.stopDeviceScan();
      // manager.destroy();
      // stopMonitoring();
      // clearInterval(interval);
    }
  }, [autoUnlock]);

  // bluetooth code handling

  async function requestBluetoothPermissions() {
    console.log('checking for permission..');
    if (Platform.OS === 'android') {
      const granted = await PermissionsAndroid.requestMultiple([
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_SCAN,
        PermissionsAndroid.PERMISSIONS.BLUETOOTH_CONNECT,
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
      ]);
      console.log('granted permissions for the app : ', granted);

      const allGranted = Object.values(granted).every(val => val === 'granted');
      CheckDeviceLocationAndBluetooth();
      return allGranted;
    }
    return true; // iOS handles permissions differently
  }

  const isBluetoothOn = async () => {
    const state = await manager.state();

    return state === State.PoweredOn;
  };

  const isLocationOn = async () => {
    const enabled = await DeviceInfo.isLocationEnabled();
    return enabled;
  };

  const CheckDeviceLocationAndBluetooth = async () => {
    const bluetoothOn = await isBluetoothOn(); // ← call it with ()
    const locationOn = await isLocationOn();

    if (bluetoothOn) {
      console.log('Bluetooth is ON');
    } else {
      console.log('Bluetooth is OFF');
      Alert.alert('Enable Bluetooth to Proceed...');
      return false;
    }

    if (locationOn) {
      console.log('location on');
    } else {
      console.log('location off');
      Alert.alert('Enable Location to Proceed...');
      return false;
    }

    return true;
  };

  const BlutoothInterval = () => {
    const interval = setInterval(() => {
      console.log('interval running...');
      ScanForBluetooth();
    }, 5000);
  };

  const UnlockWithBluetooth = async () => {
    await axios.post('/actions/add-action', {
      action_id: Actions.UNLOCK_DOOR,
    });

    await axios.patch('/users/checked-in', null, {
      params: {id: user._id},
    });
    // setActionPending(true)

    setTimeout(async () => {
      try {
        await axios.post('/actions/add-action', {
          action_id: Actions.LOCK_DOOR,
        });
        console.log('Door auto-locked after timeout');
      } catch (lockErr) {
        console.error('Auto-lock failed:', lockErr);
      }
      // }, 1 * 60 * 1000); // 2 minutes
    }, 30 * 1000); // 30 Seconds
  };

  const ScanForBluetooth = async () => {
    // setScanStatus('Scanning ...');

    // console.log('Scanning Started...');

    const granted = await requestBluetoothPermissions();
    if (granted) {
      const locationBluetooth = await CheckDeviceLocationAndBluetooth();
      if (locationBluetooth) {
        console.log('device scan start...');
        toast.show('device scan started');
        manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log('device Scan Error...', error);
            return;
          }

          if (
            device &&
            device.name === Door.DOOR_ID &&
            device.rssi >= Door.UNLOCK_DISTANCE
          ) {
            // setScanStatus(device.name);
            console.log('device found :', Door.DOOR_ID);
            toast.show('device found : ', device.name);
            console.log(device);
            setDeviceFound(true);
            manager.stopDeviceScan();

            UnlockWithBluetooth();
          } else {
            console.log('no device found siraj esp');
          }
        });
      } else {
        console.log('enable location and bluetooth of the device...');
      }
    } else {
      console.log('grant bluetooth and location permission to the app');
    }
    console.log('Finished Scanning...');
  };

  // const UnLockRequest = () => {
  //   // setDoorStatus(!doorStatus);
  //   console.log('unlock request..');
  //   Alert.alert('The Lab Is Closed.\nTry Again During Opening Hours.');
  // };
  return (
    <ScrollView style={{flex: 1}}>
      {door && (
        <>
          <Text
            style={{
              marginTop: 10,
              fontWeight: 'bold',
              fontSize: 20,
              alignSelf: 'center',
              color: door.is_lab_open ? DefaultColors.green : DefaultColors.red,
            }}>
            The Lab is {door.is_lab_open ? 'Open' : 'Closed'}
          </Text>
          <Text
            style={{
              alignSelf: 'center',
              fontWeight: 'bold',
              fontSize: 20,
              color: door?.door_lock_status
                ? DefaultColors.orange
                : DefaultColors.green,
            }}>
            {door?.door_lock_status ? '( Locked )' : '( Unlocked )'}
          </Text>
        </>
      )}
      <View
        style={{
          // backgroundColor: 'blue',
          flexDirection: 'row',
          justifyContent: 'space-between',
          width: '90%',
          // height: '100%',
          alignSelf: 'center',
          padding: 5,
          margin: 5,
        }}>
        <Card
          style={{
            width: '45%',
            margin: 5,
            // backgroundColor: 'red',
            justifyContent: 'center',
            alignItems: 'center',
            padding: 10,
          }}>
          {door && (
            <Image
              source={
                door?.door_status
                  ? require('../../../assets/Images/door-open.png')
                  : require('../../../assets/Images/door-close.png')
              }
              style={{width: 60, height: 60, alignSelf: 'center'}}
              resizeMode="contain"
            />
          )}
          <Text style={{alignSelf: 'center'}}>Door Status</Text>
          {door && (
            <Text
              style={{
                alignSelf: 'center',
                color: door?.door_status
                  ? DefaultColors.green
                  : DefaultColors.red,
                fontWeight: 'bold',
              }}>
              {door?.door_status ? 'Open' : 'Closed'}
            </Text>
          )}
        </Card>
        <View style={{width: '45%', margin: 5}}>
          <Card style={{padding: 5, margin: 5}}>
            <Image
              source={require('../../../assets/Images/supervisor.png')}
              style={{width: 30, height: 30, alignSelf: 'center'}}
              resizeMode="contain"
            />
            <Text style={{alignSelf: 'center'}}>{door?.supervisorCount}</Text>
            <Text style={{alignSelf: 'center'}}>Supervisor In Lab</Text>
          </Card>

          {/* repon or closed in */}
          {/* <Card style={{padding: 5, margin: 5}}>
            <Image
              source={require('../../../assets/Images/padlock.png')}
              style={{width: 30, height: 30, alignSelf: 'center'}}
              resizeMode="contain"
            />
            <Text style={{alignSelf: 'center'}}>Closing In</Text>
            <Text style={{alignSelf: 'center'}}>2 h 30 m</Text>
          </Card> */}
          {door && (
            <Card style={{padding: 5, margin: 5}}>
              <Image
                source={
                  door?.is_lab_open
                    ? require('../../../assets/Images/padlock.png')
                    : require('../../../assets/Images/reopen.png')
                }
                style={{width: 30, height: 30, alignSelf: 'center'}}
                resizeMode="contain"
              />
              <Text style={{alignSelf: 'center'}}>
                {door.is_lab_open ? 'Closing At' : 'Re-Open'}
              </Text>

              {door && (
                <Text style={{alignSelf: 'center'}}>
                  {door?.is_lab_open
                    ? door.schedule[door.current_day].closing_time + ' hr'
                    : door?.nextOpen
                    ? `${door?.nextOpen.day} at ${door?.nextOpen.opening_time} hr`
                    : 'No upcoming opening.'}
                </Text>
              )}
            </Card>
          )}
        </View>
      </View>
      <View
        style={{
          flex: 1,
        }}>
        <Card
          style={{
            width: '90%',
            alignSelf: 'center',
            margin: 10,
            // padding: 20,
            // height: 200,
            // justifyContent: 'center',
            // alignItems: 'center',
          }}>
          <Text style={{margin: 10, alignSelf: 'center', fontSize: 20}}>
            Lab Status
          </Text>

          {door && (
            <Image
              source={
                door?.door_room_status
                  ? require('../../../assets/Images/users.png')
                  : require('../../../assets/Images/no_users.png')
              }
              resizeMode="contain"
              style={{width: 80, height: 80, alignSelf: 'center'}}
            />
          )}

          {door && (
            <Text style={{alignSelf: 'center', margin: 10, fontSize: 30}}>
              {door.door_room_status ? RoomStatus.OCCUPIED : RoomStatus.VACANT}
            </Text>
          )}
        </Card>

        <View
          style={{
            flex: 1,
            alignItems: 'center',

            flex: 1,
            // borderColor: labStatus ? DefaultColors.green : DefaultColors.red,
          }}>
          {!autoUnlock ? (
            <TouchableOpacity
              style={{
                borderRadius: 75,
              }}
              // disabled={lock}
              onPress={() => onPressUnlock()}>
              {/* <Text
              style={{
                color: DefaultColors.white,
                fontSize: 30,
                alignSelf: 'center',
              }}>
              {doorStatus ? 'Lock' : 'Unlock'}
            </Text> */}

              {door && (
                <Image
                  source={
                    door?.door_lock_status
                      ? require('../../../assets/Images/Locked.png')
                      : require('../../../assets/Images/Unlock.png')
                  }
                  resizeMode="contain"
                  style={{width: 170, height: 170}}
                />
              )}
              {/* {!lockStatus ? (
                <Image
                  source={require('../../../assets/Images/Unlock.png')}
                  resizeMode="contain"
                  style={{width: 170, height: 170}}
                />
              ) : (
                <Image
                  source={require('../../../assets/Images/Locked.png')}
                  resizeMode="contain"
                  style={{width: 170, height: 170}}
                />
              )} */}
              <View
                style={{
                  // flexDirection: 'row',
                  alignItems: 'center',
                  justifyContent: 'center',
                  marginTop: 5,
                }}>
                <Image
                  source={require('../../../assets/Images/press.png')}
                  resizeMode="contain"
                  style={{
                    width: 30,
                    height: 30,
                  }}
                />
                <Text>Pressable</Text>
              </View>
            </TouchableOpacity>
          ) : (
            <Image
              source={require('../../../assets/Images/bluetooth.png')}
              resizeMode="contain"
              style={{width: 170, height: 170}}
            />
          )}

          <Card style={{marginTop: 5}}>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                padding: 5,
                paddingHorizontal: 10,
                width: '95%',
                marginTop: 5,
              }}>
              <Text>Auto Unlock {autoUnlock ? 'ON' : 'OFF'}</Text>
              <Switch
                trackColor={{false: '#767577', true: '#81b0ff'}}
                thumbColor={autoUnlock ? DefaultColors.blue : '#f4f3f4'}
                ios_backgroundColor="#3e3e3e"
                onValueChange={() => setAutoUnlock(!autoUnlock)}
                value={autoUnlock}
              />
            </View>
          </Card>

          {autoUnlock && (
            <Card
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                // width: '100%',
                padding: 10,
                margin: 10,
                backgroundColor: deviceFound
                  ? DefaultColors.lightGreen
                  : DefaultColors.lightYellow,
              }}>
              {deviceFound ? (
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor: 'blue',
                    paddingHorizontal: 10,
                  }}>
                  <Text style={{fontSize: 15}}>Connected Device</Text>
                  <Text style={{fontSize: 15}}>Elab</Text>
                </View>
              ) : (
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    // backgroundColor: 'blue',
                    paddingHorizontal: 10,
                  }}>
                  <Text style={{fontSize: 15}}>Scanning For Device...</Text>
                  <Text style={{fontSize: 15}}></Text>
                </View>
              )}
            </Card>
          )}
        </View>
      </View>
    </ScrollView>
  );
};

export default HomeScreen;
