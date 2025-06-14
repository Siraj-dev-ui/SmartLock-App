import React from 'react';
import {Text} from 'react-native';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../Screens/HomeScreen';
import SettingsScreen from '../Screens/SettingsScreen';
import Entypo from 'react-native-vector-icons/Entypo';
import Ionicons from 'react-native-vector-icons/Ionicons';
import RequestsScreen from '../Screens/RequestsScreen';
import {DefaultColors} from '../Utils/Theme';

const Tab = createBottomTabNavigator();
const BottomTabNavigation = () => {
  return (
    <Tab.Navigator
      initialRouteName="Home"
      screenOptions={{
        headerShown: false,

        tabBarActiveTintColor: DefaultColors.blue,
        // tabBarInactiveTintColor: DefaultColors.gray,
        tabBarInactiveTintColor: 'gray',
      }}>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Entypo
              name="home"
              size={focused ? 25 : 20}
              color={focused ? 'blue' : ''}
            />
          ),
        }}
      />

      <Tab.Screen
        name="Requests"
        component={RequestsScreen}
        options={{
          tabBarBadge: 6,
          tabBarIcon: ({focused, color, size}) => (
            <Entypo
              name="home"
              size={focused ? 25 : 20}
              color={focused ? 'blue' : ''}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={{
          tabBarIcon: ({focused, color, size}) => (
            <Ionicons
              name="settings"
              size={focused ? 25 : 20}
              color={focused ? 'blue' : ''}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomTabNavigation;
