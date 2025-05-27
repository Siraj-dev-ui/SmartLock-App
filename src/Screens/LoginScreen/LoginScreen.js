import react from 'react';
import {View, Text} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import {Button} from '@react-navigation/elements';

const LoginScreen = () => {
  const navigation = useNavigation();
  return (
    <View style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
      <Text> Login Screen</Text>
      <Button onPressIn={() => navigation.navigate('SignUpScreen')}>
        {' '}
        sign up
      </Button>
    </View>
  );
};

export default LoginScreen;
