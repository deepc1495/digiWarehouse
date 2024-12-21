import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-toast-message';
import colorConstant from '../../constant/colorConstant';
import Button from '../../Component/Button';
import { loginApi } from '../../Utility/api';
import AsyncStorage from '@react-native-async-storage/async-storage';
import appConstant from '../../constant/appConstant';

const SignIn = ({ navigation }) => {
  const [email, setEmail] = useState('manager@ime.com');
  const [password, setPassword] = useState('Manager@123');
  const [isSecure, setIsSecure] = useState(true);
  const [loading, setLoading] = useState(false);

  // Handle Email Change
  const handleEmailChange = value => {
    setEmail(value);
  };

  // Handle Password Change
  const handlePasswordChange = value => {
    setPassword(value);
  };

  const onClickSignIIn = async () => {
    if (!email || !password) {
      // setError('Email and password are required.');
      Toast.show({
        type: 'error',
        text1: 'Email and password are required.'
      })
      return;
    }

    setLoading(true); // Start loading indicator

    try {
      const data = {
            email:email,
            password:password
          }
    
          const response = await loginApi(data)
      if (response.success) {
        console.log('dataaa', response)

        Toast.show({
          type: "success",
          text1: response?.message,
        });
        // const data = response.data
        // await AsyncStorage.setItem('userId', response.data.id);
        // await AsyncStorage.setItem('userData',JSON.stringify(data));
        await AsyncStorage.setItem('token', response.token);
        // const walletAddress = response.data.wallet_details?.wallet_address;
          navigation.replace(appConstant.TabNavigation);
          // navigation.replace(appConstant.TabNavigation);

        // // Store wallet_address
        // await AsyncStorage.setItem('wallet_address', walletAddress);

        // // navigation.navigate('MyIdentity');
        // // if(isAvailable){

        //   navigation.navigate('VerifyIdentity');
        // }else{
        //   navigation.navigate('Tabs');

        // }
      } else {
        // Handle validation errors from the API
        if (response.message) {
          console.log('errrr', response)
          const errorMessage = formatErrorMessage(response.message);
          Toast.show({
            type: 'error',
            text1: errorMessage
          })
          // setError(errorMessage);
        } else {
          Toast.show({
            type: 'error',
            text1: 'An unknown error occurred.'
          })
          // setError('An unknown error occurred.');
        }
      }
    } catch (error) {
      console.log('errr', error)
      // console.log('error',error)
      Toast.show({
        type: 'error',
        text1: 'Login failed. Please try again.'
      })
      // setError('Login failed. Please try again.');
    } finally {
      setLoading(false); // End loading indicator
    }
    setLoading(false)
  };

  // Utility function to format error messages
  const formatErrorMessage = messageObj => {
    let errorMessages = '';

    // Loop through each field's error messages
    Object.keys(messageObj).forEach(field => {
      const fieldErrors = messageObj[field].join(', ');
      errorMessages += `${capitalizeFirstLetter(field)}: ${fieldErrors}\n`;
    });

    return errorMessages.trim();
  };

  // Utility to capitalize the first letter of the field name
  const capitalizeFirstLetter = string => {
    return string.charAt(0).toUpperCase() + string.slice(1);
  };

  return (
    <View
      style={{
        flex: 1,
        backgroundColor: '#fff',
        justifyContent: 'space-between',
        padding: 20,
        paddingTop: '25%',
      }}>
      <View>
        <Text style={styles.title}>
          Welcome back!{' '}
          <Text style={{ fontWeight: '500' }}>
            Glad to see you. Again!
          </Text>
        </Text>
        <View style={styles.container}>
          {/* Email Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input]}
              placeholder="Enter your email"
              keyboardType="email-address"
              autoCapitalize="none"
              onChangeText={handleEmailChange}
              value={email}
              placeholderTextColor="#1A1A1ACC"
            />
          </View>

          {/* Password Input */}
          <View style={styles.inputContainer}>
            <TextInput
              style={[styles.input]}
              placeholder="Enter your password"
              secureTextEntry={isSecure}
              autoCapitalize="none"
              onChangeText={handlePasswordChange}
              value={password}
              placeholderTextColor="#1A1A1ACC"
            />
            <TouchableOpacity
              onPress={() => {
                setIsSecure(!isSecure);
              }}>
              <Icon
                name={isSecure ? 'eye' : 'eye-slash'}
                size={20}
                color={'#191E3BCC'}
                style={styles.icon}
              />
            </TouchableOpacity>
          </View>

          {/* Forgot Password Link */}
          <TouchableOpacity style={styles.forgotPasswordContainer} onPress={() => { navigation.navigate('ForgotPasswordEmail') }}>
            <Text style={styles.forgotPasswordText}>Forgot password?</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 25 }}>
          <Button
            title={'Sign in'}

            onPress={onClickSignIIn}
          />
        </View>
        {/* {isAvailable && <TouchableOpacity style={{ marginTop: 50, alignItems: 'center' }} onPress={onBioMatric}>
          <Ionicons name='finger-print-sharp' size={50} color={theme.primaryColor} />
        </TouchableOpacity>} */}

        {/* {error ? <Text style={styles.error}>{error}</Text> : null} */}
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('SignUp');
        }}>
        <Text style={[styles.title, { fontSize: 14 }]}>
          Don’t have an account?{' '}
          <Text style={{ fontWeight: '500', color: colorConstant?.colorPrimary }}>Sign up</Text>
        </Text>
      </TouchableOpacity>
    </View>
  );
};

export default SignIn

const styles = StyleSheet.create({
  title: {
    textAlign: 'center',
    fontSize: 34,
    color: colorConstant?.colorPrimary,

  },
  container: {
    justifyContent: 'center',
    // backgroundColor: '#FFFFFF',
    marginTop: 25,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderColor: '#E0E0E0',
    borderWidth: 1,
    borderRadius: 10,
    marginVertical: 10,
    backgroundColor: '#fff',
    height: 50,
  },
  input: {
    flex: 1,
    height: 50,
    paddingHorizontal: 15,
    fontSize: 14,
    color: '#000'
  },
  inputError: {
    borderColor: 'red',
  },
  icon: {
    marginRight: 10,
  },
  forgotPasswordContainer: {
    alignSelf: 'flex-end',
    marginTop: 5,
  },
  forgotPasswordText: {
    color: colorConstant?.colorPrimary,
    fontSize: 14,
    fontWeight: '500',
  },
  error: {
    color: 'red',
    marginTop: 20,
  },
  result: {
    color: 'green',
    marginTop: 20,
  },
});
