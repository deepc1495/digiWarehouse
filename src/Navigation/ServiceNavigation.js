import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';

import SignInScreen from '../Screen/auth/SignInScreen';
import SignUpScreen from '../Screen/auth/SignUpScreen';
import LandingScreen from '../Screen/Home/LandingScreen';
import TabNavigation from './TabNavigation';
import appConstant from '../constant/appConstant';
import WarehouseDetails from '../Screen/Home/WarehouseDetails';
import AdditionalServices from '../Screen/Home/AdditionalServices';
import EnquiryList from '../Screen/Enquiry/EnquiryList';
import BookingHistory from '../Screen/Booking/BookingHistory';
import BookingDetails from '../Screen/Booking/BookingDetail';
import ManageBooking from '../Screen/Booking/ManageBooking';
import ChatScreen from '../Screen/Enquiry/chat';
import ExplorServices from '../Screen/Home/ExplorServices';

const ServiceNavigation = props => {
  const Stack = createNativeStackNavigator();
  return (
    <Stack.Navigator
      initialRouteName={appConstant.LandingScreen}
      screenOptions={{}}>
      <Stack.Screen
        name={appConstant.ExplorServices}
        component={ExplorServices}
        options={{headerTintColor: '#ffffff', headerShown: false}}
      />
      <Stack.Screen
        name={appConstant.LandingScreen}
        component={LandingScreen}
        options={{headerTintColor: '#ffffff', headerShown: false}}
      />
      <Stack.Screen
        name={appConstant.WarehouseDetails}
        component={WarehouseDetails}
        options={{headerTintColor: '#ffffff', headerShown: false}}
      />
      <Stack.Screen
        name={appConstant.AdditionalServices}
        component={AdditionalServices}
        options={{headerTintColor: '#ffffff', headerShown: false}}
      />
      <Stack.Screen
        name={appConstant.EnquiryList}
        component={EnquiryList}
        options={{headerTintColor: '#ffffff', headerShown: false}}
      />
      <Stack.Screen
        name={appConstant.BookingHistory}
        component={BookingHistory}
        options={{headerTintColor: '#ffffff', headerShown: false}}
      />
      <Stack.Screen
        name={appConstant.BookingDetails}
        component={BookingDetails}
        options={{headerTintColor: '#ffffff', headerShown: false}}
      />
      <Stack.Screen
        name={appConstant.ManageBooking}
        component={ManageBooking}
        options={{headerTintColor: '#ffffff', headerShown: false}}
      />
      <Stack.Screen
        name={appConstant.ChatScreen}
        component={ChatScreen}
        options={{headerTintColor: '#ffffff', headerShown: false}}
      />
    </Stack.Navigator>
  );
};

export default ServiceNavigation;

const styles = StyleSheet.create({});
