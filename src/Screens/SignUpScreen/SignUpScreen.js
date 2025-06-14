import react, {useState} from 'react';
import {View, Text, Image} from 'react-native';
import CustomInput from '../../Components/CustomInput';
import CustomButton from '../../Components/CustomButton';
import CheckBox from '@react-native-community/checkbox';

const SignUpScreen = () => {
  const [selectedRole, setSelectedRole] = useState(null);

  const handleSelect = role => {
    setSelectedRole(role);
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
      <CustomInput placeholder="Confirm Password" secureTextEntry={true} />

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

      <CustomButton text={'Register'} />
    </View>
  );
};

export default SignUpScreen;
