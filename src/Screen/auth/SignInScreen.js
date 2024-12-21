import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  SafeAreaView
} from 'react-native';
import React, {useState} from 'react';
import InputField from '../../Component/InputField';
import Button from '../../Component/Button';
import appConstant from '../../constant/appConstant';
import colorConstant from '../../constant/colorConstant';
import Toast from 'react-native-toast-message';
import { loginApi } from '../../Utility/api';


const SignInScreen = props => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const onLogin = async()=>{
    if(!email){
      Toast.show({
        type:'error',
        text1:'Please Enter Valid Email'
      })
    }else if(!password){
      Toast.show({
        type:'error',
        text1:'Please Enter Valid Password'
      })
    }else {
      const data = {
        email:email,
        password:password
      }

      const res = await loginApi(data)
      console.log('ress',res)
    }
  }
  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.titleText}>
        Welcome Back!
        <Text style={styles.titleboldText}> Glad to see you. Again!</Text>
      </Text>
      <InputField
        text={'Enter your Email'}
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <InputField
        text={'Enter your Password'}
        value={password}
        secureTextEntry={true}
        onChangeText={text => setPassword(text)}
      />
      <View style={styles.subContainer}>
        <Text style={styles.pText}>Forgot Password?</Text>
      </View>
      <Button
        title={'Sign in'}
        onPress={() => {
          props.navigation.navigate(appConstant.TabNavigation);
        }}
      />

      <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
        <Text style={{fontSize: 16, color: '#000000'}}>
          Don't have an account?{' '}
          <Text
            style={styles.pText}
            onPress={() => props.navigation.navigate(appConstant.SignUpScreen)}>
            Sign Up
          </Text>
        </Text>
      </View>
    </SafeAreaView>
  );
};
export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    width: '90%',
    justifyContent: 'center',
    alignSelf: 'center',
  },
  titleText: {
    fontSize: 40,
    textAlign: 'center',
    color: '#000000',
    marginBottom: 20,
  },
  titleboldText: {
    fontWeight: '500',
  },
  inputText: {
    borderWidth: 0.5,
    borderRadius: 10,
    borderColor: '#000000',
    width: '100%',
    height: 50,
    paddingStart: 25,
    marginBottom: 20,
  },
  pText: {
    color: colorConstant.colorPrimary,
    fontSize: 16,
  },
  subContainer: {
    flexDirection: 'row-reverse',
    marginBottom: 10,
  },
});
