import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import InputField from '../../Component/InputField';
import Button from '../../Component/Button';
import CountryFlag from 'react-native-country-flag';
import colorConstant from '../../constant/colorConstant';
import {CountryPicker} from 'react-native-country-codes-picker';

const SignUpScreen = props => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [contactNumber, setContactNumber] = useState('');
  const [show, setShow] = useState(false);
  const [countryCode, setCountryCode] = useState('');

  const countries = [
    {label: 'United States', value: 'US'},
    {label: 'India', value: 'IN'},
    {label: 'France', value: 'FR'},
    {label: 'Germany', value: 'DE'},
    {label: 'Japan', value: 'JP'},
    // Add more countries as needed
  ];

  return (
    <View style={styles.container}>
      <Text style={styles.titleText}>
        Hello! Sign up to
        <Text style={styles.titleboldText}> get started</Text>
      </Text>
      <InputField
        text={'Enter your full name'}
        value={name}
        onChangeText={text => setName(text)}
      />
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
      <InputField
        text={'Confirm your Password'}
        value={confirmPassword}
        secureTextEntry={true}
        onChangeText={text => setConfirmPassword(text)}
      />

      <View
        style={{
          flexDirection: 'row',
          width: '100%',
          borderWidth: 0.5,
          borderRadius: 10,
          borderColor: '#000000',
        }}>
        <TouchableOpacity
          style={{
            width: '20%',
            height: 50,
            alignItems: 'center',
            justifyContent: 'center',
          }}
          onPress={() => setShow(true)}>
          {/* <CountryFlag isoCode={countryCode} size={25} /> */}
          <Text style={{fontSize:25}}>{countryCode}</Text>
          <CountryPicker
            show={show}
            // when picker button press you will get the country object with dial code
            pickerButtonOnPress={item => {
              console.log("item",item)
              setCountryCode(item.flag);
              setShow(false);
            }}
          />
        </TouchableOpacity>
        <View style={{width: 1, height: 50, backgroundColor: 'gray'}}></View>
        <View style={{width: '80%', height: 50}}>
          <TextInput
            style={{
              alignItems: 'center',
              justifyContent: 'center',
              height: 50,
              paddingStart: 25,
            }}
            placeholder={'Enter your contact no.'}
            value={contactNumber}
            onChangeText={text => setContactNumber(text)}
            keyboardType={'number-pad'}
          />
        </View>
      </View>

      <Button
        title={'Sign up'}
        onPress={() => {
          props.navigation.navigate('SignInScreen');
        }}
      />

      <View style={{position: 'absolute', bottom: 20, alignSelf: 'center'}}>
        <Text style={{fontSize: 16, color: '#000000'}}>
          Already have an account?{' '}
          <Text
            style={styles.pText}
            onPress={() => props.navigation.navigate('SignInScreen')}>
            Sign in
          </Text>
        </Text>
      </View>
    </View>
  );
};

export default SignUpScreen;

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
    width: '20%',
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
