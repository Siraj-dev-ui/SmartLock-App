import React, {useState} from 'react';
import {
  Switch,
  Text,
  TouchableOpacity,
  View,
  Alert,
  Image,
  ActivityIndicator,
} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {BleManager, State} from 'react-native-ble-plx';
import {PermissionsAndroid, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {Colors, DefaultColors} from '../../Utils/Theme';
import {Card} from 'react-native-paper';

const manager = new BleManager();

const HomeScreen = () => {
  const [doorStatus, setDoorStatus] = useState(false);
  const [autoUnlock, setAutoUnlock] = useState(false);
  const [labStatus, setLabStatus] = useState(true);
  const [deviceFound, setDeviceFound] = useState(true);

  // const [lockStatus, setLockStatus] = useState(true);
  const [scanStatus, setScanStatus] = useState('IDLE');

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

  const ScanForBluetooth = async () => {
    // setScanStatus('Scanning ...');

    // console.log('Scanning Started...');
    const granted = await requestBluetoothPermissions();
    if (granted) {
      const locationBluetooth = await CheckDeviceLocationAndBluetooth();
      if (locationBluetooth) {
        console.log('device scan start...');
        manager.startDeviceScan(null, null, (error, device) => {
          if (error) {
            console.log('device Scan Error...', error);
            return;
          }

          if (device && device.name === 'sirajesp') {
            // setScanStatus(device.name);
            console.log('device found : siraj esp');
            console.log(device);
            manager.stopDeviceScan();
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
  return (
    <View style={{flex: 1}}>
      <Text
        style={{
          margin: 10,
          fontWeight: 'bold',
          fontSize: 20,
          alignSelf: 'center',
          color: DefaultColors.green,
        }}>
        The LAB is {doorStatus ? 'Closed.' : 'Open.'}.
      </Text>

      <View
        style={{
          flex: 1,
          // borderWidth: 6,
          // borderColor: labStatus ? DefaultColors.green : DefaultColors.red,
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
          <Image
            source={require('../../../assets/Images/users.png')}
            resizeMode="contain"
            style={{width: 100, height: 100, alignSelf: 'center'}}
          />
          {/* <Image
            source={require('../../../assets/Images/no_users.png')}
            resizeMode="contain"
            style={{width: 100, height: 100, alignSelf: 'center'}}
          /> */}

          <Text style={{alignSelf: 'center', margin: 10, fontSize: 30}}>
            Occupied
            {/* Not Occupied */}
          </Text>
        </Card>

        <View
          style={{
            flex: 1,
            alignItems: 'center',
            // justifyContent: 'center',
            // margin: 20,
            // borderWidth: 6,
            flex: 1,
            // borderColor: labStatus ? DefaultColors.green : DefaultColors.red,
          }}>
          {!autoUnlock ? (
            <TouchableOpacity
              style={{
                borderRadius: 75,
              }}
              onPress={() => setDoorStatus(!doorStatus)}>
              {/* <Text
              style={{
                color: DefaultColors.white,
                fontSize: 30,
                alignSelf: 'center',
              }}>
              {doorStatus ? 'Lock' : 'Unlock'}
            </Text> */}
              {doorStatus ? (
                <Image
                  source={require('../../../assets/Images/Unlock.png')}
                  resizeMode="contain"
                  style={{width: 200, height: 200}}
                />
              ) : (
                <Image
                  source={require('../../../assets/Images/Locked.png')}
                  resizeMode="contain"
                  style={{width: 200, height: 200}}
                />
              )}
            </TouchableOpacity>
          ) : (
            <Image
              source={require('../../../assets/Images/bluetooth.png')}
              resizeMode="contain"
              style={{width: 200, height: 200}}
            />
          )}

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-around',
              width: '100%',
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

          {autoUnlock && (
            <Card
              style={{
                justifyContent: 'space-between',
                flexDirection: 'row',
                width: '90%',
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
                <Text>Scanning...</Text>
              )}
            </Card>
          )}

          {/* <TouchableOpacity
        style={{
          backgroundColor: DefaultColors.orange,
          padding: 10,
        }}
        onPress={() => ScanForBluetooth()} // or onPress={() => ScanForBluetooth()}
      >
        <Text>Scan Blutooth</Text>
        <Text>{scanStatus}</Text>
      </TouchableOpacity> */}
        </View>
      </View>
    </View>
  );
};

export default HomeScreen;
