import React, {useState} from 'react';
import {Switch, Text, TouchableOpacity, View, Alert} from 'react-native';
import Entypo from 'react-native-vector-icons/Entypo';
import {BleManager, State} from 'react-native-ble-plx';
import {PermissionsAndroid, Platform} from 'react-native';
import DeviceInfo from 'react-native-device-info';

import {Colors, DefaultColors} from '../../Utils/Theme';

const manager = new BleManager();

const HomeScreen = () => {
  const [doorStatus, setDoorStatus] = useState(false);
  const [autoUnlock, setAutoUnlock] = useState(false);
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
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        // margin: 20,
        borderWidth: 6,
        flex: 1,
        borderColor: DefaultColors.red,
      }}>
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

      {!autoUnlock && (
        <TouchableOpacity
          style={{
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: doorStatus
              ? DefaultColors.green
              : DefaultColors.red,
            justifyContent: 'center',
            alignItems: 'center',
          }}
          onPress={() => setDoorStatus(!doorStatus)}>
          <Text
            style={{
              color: DefaultColors.white,
              fontSize: 30,
              alignSelf: 'center',
            }}>
            {doorStatus ? 'Lock' : 'Unlock'}
          </Text>
        </TouchableOpacity>
      )}
      <Text style={{margin: 10, fontWeight: 'bold'}}>
        {' '}
        The LAB is {!doorStatus ? 'Closed' : 'Open'}.
      </Text>
      <TouchableOpacity
        style={{
          backgroundColor: DefaultColors.orange,
          padding: 10,
        }}
        onPress={() => ScanForBluetooth()} // or onPress={() => ScanForBluetooth()}
      >
        <Text>Scan Blutooth</Text>
        <Text>{scanStatus}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default HomeScreen;
