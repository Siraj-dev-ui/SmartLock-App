import react, {useEffect, useState} from 'react';
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
import {axios} from '../../Utils/Axios';
import {useToast} from 'react-native-toast-notifications';
import {RequestStatus} from '../../Utils/Constants';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {useUser} from '../../Contexts/UserProvider';

const LoginScreen = () => {
  const toast = useToast();
  const navigation = useNavigation();
  const {user, setUser} = useUser();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(null);

  useEffect(() => {
    async function checkuser() {
      console.log('cehcking user');
      const user = await AsyncStorage.getItem('user');

      if (user !== null) {
        setUser(user);

        navigation.reset({index: 0, routes: [{name: 'BottomTabNavigation'}]});
      } else {
        console.log('user doest not exist.');
      }
    }
    checkuser();
  }, []);

  const onPressLogin = async () => {
    const data = {
      email: email.trim().toLowerCase(),
      password: password.trim(),
    };

    if (Object.values(data).some(value => value === '')) {
      toast.show('Enter email and password');
      return;
    }

    const resp = await axios.post('/users/login', data);

    console.log(resp.data);

    if (resp.data.length === 0) {
      toast.show('This Email Does not exists.');
      setMessage(null);
    } else if (resp.data['request_status'] === RequestStatus.PENDING) {
      toast.show('Request Against this email is pending..');
      setMessage('Request Against this email is pending..');
    } else {
      // toast.show('login successfull');
      // setMessage(null);
      // navigation.navigate('BottomTabNavigation');
      await AsyncStorage.setItem('user', JSON.stringify(resp.data));
      navigation.reset({
        index: 0,
        routes: [{name: 'BottomTabNavigation'}],
      });
    }

    // if(resp.data)
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

      <CustomInput placeholder="Email" value={email} setValue={setEmail} />
      <CustomInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        setValue={setPassword}
      />
      <CustomButton text={'Login'} onPress={onPressLogin} />
      <CustomButton text={'Register'} onPress={onPressRegister} />

      {message !== null && (
        <Text style={{fontWeight: 'bold', color: 'red'}}>
          Request Is Pending For Approval Against This Email.
        </Text>
      )}
    </View>
  );
};

export default LoginScreen;
