import react from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@react-navigation/elements';
import CustomButton from '../../Components/CustomButton';
import CustomInput from '../../Components/CustomInput';

const LoginScreen = () => {
  const navigation = useNavigation();

  const onPressLogin = () => {
    console.log('we are in');
    navigation.navigate('BottomTabNavigation');
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
      <Image
        source={require('../../../assets/Images/Lock.png')}
        resizeMode="contain"
        style={{width: 100, height: 100, marginBottom: 50}}
      />

      <CustomInput placeholder="Email" />
      <CustomInput placeholder="Password" secureTextEntry={true} />
      <CustomButton text={'Login'} onPress={onPressLogin} />
      <CustomButton text={'Register'} onPress={onPressRegister} />

      {/* <Text style={{fontWeight: 'bold', color: 'red'}}>
        Request Is Pending For Approval Against This Email.
      </Text> */}
    </View>
  );
};

export default LoginScreen;

const styles = StyleSheet.create({
  inputStyle: {},
});
