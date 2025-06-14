import react from 'react';
import {View, Text, Image} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';

const SignUpScreen = () => {
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
      }}>
      <Image
        source={require('../../../assets/Images/Lock.png')}
        resizeMode="contain"
        style={{width: 100, height: 100, marginBottom: 50}}
      />
      <CustomInput placeholder="Email" />
      <CustomInput placeholder="Password" secureTextEntry={true} />
      <CustomInput placeholder="Confirm Password" secureTextEntry={true} />
      <CustomButton text={'Register'} />
    </View>
  );
};

export default SignUpScreen;
