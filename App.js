import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import MainNavigation from './src/Navigation/MainNavigation';
import { ToastProvider } from 'react-native-toast-notifications';
import Toast from 'react-native-toast-message';

export default function App() {
  return (
    <NavigationContainer>
      <MainNavigation />
      <Toast/>
    </NavigationContainer>
  );
}
