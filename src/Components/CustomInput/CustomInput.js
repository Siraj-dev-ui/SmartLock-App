import {View, Text, TextInput, StyleSheet} from 'react-native';
import React, {useState} from 'react';
// import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';
// import Entypo from 'react-native-vector-icons/Entypo';

const CustomInput = ({
  value,
  setValue,
  placeholder = 'default',
  secureTextEntry,
}) => {
  const [password, setPassword] = useState('');

  // State variable to track password visibility
  const [showPassword, setShowPassword] = useState(secureTextEntry);

  // Function to toggle the password visibility state
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleInputChange = text => {
    // Use a regular expression to allow only numbers (0-9)
    // const numbersOnly = text.replace(/[^0-9]/g, '');
    // setValue(numbersOnly);
  };
  return (
    <TextInput
      style={{
        backgroundColor: 'white',
        width: '100%',
        height: 50,
        // height: '100%',
        padding: 15,
        margin: 7,
        borderRadius: 4,
        borderWidth: 0.1,
      }}
      placeholder={placeholder}
    />
  );
};

export default CustomInput;

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    width: '100%',
    borderColor: '#e8e8e8',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginVertical: 5,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    position: 'relative',
  },
  icon: {
    marginRight: 20,
  },

  mainContainer: {
    marginTop: 70,
    margin: 40,
  },
  // container: {
  //   flexDirection: 'row',
  //   alignItems: 'center',
  //   justifyContent: 'center',
  //   backgroundColor: '#f3f3f3',
  //   borderRadius: 8,
  //   paddingHorizontal: 14,
  // },
  input: {
    flex: 1,
    color: '#333',
    paddingVertical: 10,
    paddingRight: 10,
    fontSize: 16,
  },
  icon: {
    marginLeft: 10,
  },
  heading: {
    alignItems: 'center',
    fontSize: 20,
    color: 'green',
    marginBottom: 20,
  },
});
