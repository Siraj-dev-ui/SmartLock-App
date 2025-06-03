import React from 'react';
import {Text, TouchableOpacity} from 'react-native';

const CustomButton = ({text, onPress}) => {
  return (
    <TouchableOpacity
      style={{
        width: '100%',
        height: 50,
        backgroundColor: 'blue',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 6,
        margin: 5,
      }}
      onPress={onPress}>
      <Text style={{color: 'white', fontWeight: 'bold', fontSize: 16}}>
        {text}
      </Text>
    </TouchableOpacity>
  );
};

export default CustomButton;
