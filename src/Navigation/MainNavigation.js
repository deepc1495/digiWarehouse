import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../Screen/auth/SignInScreen';
import SignUpScreen from '../Screen/auth/SignUpScreen';
import LandingScreen from '../Screen/Home/LandingScreen';
import TabNavigation from './TabNavigation';
import appConstant from '../constant/appConstant';
import SignIn  from '../Screen/auth/Signin';

const MainNavigation = props => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator initialRouteName="SignInScreen" screenOptions={{}}>
      <Stack.Screen
        name={appConstant.SignInScreen}
        component={SignIn}
        options={{headerTintColor: '#ffffff', headerShown: false}}
      />
      <Stack.Screen
        name={appConstant.SignUpScreen}
        component={SignUpScreen}
        options={{headerTintColor: '#ffffff', headerShown: false}}
      />
      <Stack.Screen
        name={appConstant.TabNavigation}
        component={TabNavigation}
        options={{headerTintColor: '#ffffff', headerShown: false}}
      />
      <Stack.Screen
        name={appConstant.LandingScreen}
        component={LandingScreen}
        options={{headerTintColor: '#ffffff', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default MainNavigation;

const styles = StyleSheet.create({});
