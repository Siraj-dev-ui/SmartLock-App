import React from 'react';
import {Text, View} from 'react-native';
import {DefaultColors} from '../../Utils/Theme';

const SettingsScreen = () => {
  return (
    <View
      style={{
        borderWidth: 6,
        flex: 1,
        borderColor: DefaultColors.red,
      }}></View>
  );
};

export default SettingsScreen;
