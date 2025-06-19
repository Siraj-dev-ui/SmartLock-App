import react, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import CheckBox from '@react-native-community/checkbox';
// import axios from 'axios';
import {axios} from '../../Utils/Axios';
import {useToast} from 'react-native-toast-notifications';
import {RequestStatus} from '../../Utils/Constants';
import DeviceInfo from 'react-native-device-info';

const SignUpScreen = () => {
  const toast = useToast();
  const [selectedRole, setSelectedRole] = useState('User');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPasswrod] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleSelect = role => {
    setSelectedRole(role);
  };

  const onPressRegister = async () => {
    console.log('inside onpress');
    const data = {
      name: name,
      email: email,
      password: password,
      requested_role: selectedRole,
      // mobile_id: DeviceInfo.getUniqueId(),
    };

    if (Object.values(data).some(value => value === '')) {
      toast.show('fill all the fields');
      return;
    }

    if (password !== confirmPassword) {
      toast.show('password and confirm password is different');
      return;
    }

    console.log('data : ', data);

    const resp = await axios.post('/users/register-request', data);

    if (resp.data['userFound'] === true) {
      if (resp.data['requestStatus'] === RequestStatus.APPROVE) {
        setMessage('This Email already exists.');
        return;
      }
      setMessage('Request against email ' + data.email + ' is Pending...');
    } else {
      setMessage(null);
      setName('');
      setEmail('');
      setPasswrod('');
      setConfirmPassword('');
      toast.show('Your Request Has been sended.', {type: 'success'});
    }
    console.log('register response : ', resp.data);
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
      <CustomInput placeholder="Name" value={name} setValue={setName} />
      <CustomInput placeholder="Email" value={email} setValue={setEmail} />
      <CustomInput
        placeholder="Password"
        secureTextEntry={true}
        value={password}
        setValue={setPasswrod}
      />
      <CustomInput
        placeholder="Confirm Password"
        secureTextEntry={true}
        value={confirmPassword}
        setValue={setConfirmPassword}
      />

      <View
        style={{
          justifyContent: 'flex-start',
          // backgroundColor: 'blue',
          width: '100%',
          paddingVertical: 15,
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <Text style={{fontWeight: 'bold'}}> Select Role : </Text>

          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CheckBox
              value={selectedRole === 'User'}
              onValueChange={() => handleSelect('User')}
            />
            <Text> User</Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              // justifyContent: 'center',
              alignItems: 'center',
            }}>
            <CheckBox
              value={selectedRole === 'Supervisor'}
              onValueChange={() => handleSelect('Supervisor')}
            />
            <Text> Supervisor</Text>
          </View>
        </View>
      </View>

      <CustomButton text={'Register'} onPress={onPressRegister} />

      <Text style={{fontWeight: 'bold', color: 'red'}}>
        {message === '' ? '' : message}
      </Text>
    </View>
  );
};

export default SignUpScreen;
