import react from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@react-navigation/elements';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';

const LoginScreen = () => {
  const navigation = useNavigation();

  const onPressLogin = () => {
    console.log('we are in');
    navigation.navigate('LoginScreen');
  };

  const onPressRegister = () => {
    navigation.navigate('SignUpScreen');
  };
  return (
    <View
      style={{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        margin: 20,
      }}>
      <Text> Smart Lock</Text>

      <CustomInput placeholder="Email" />
      <CustomInput placeholder="Password" />
      <CustomButton text={'Login'} onPress={onPressLogin} />
      <CustomButton text={'Register'} onPress={onPressRegister} />
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputStyle: {},
});
