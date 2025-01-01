import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';

import HomeNavigation from './HomeNavigation';
import AdditionalServices from '../Screen/Home/AdditionalServices';
import ExplorServices from '../Screen/Home/ExplorServices';
import {AnimatedTabBarNavigator} from 'react-native-animated-nav-tab-bar';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import AnimatedTabBar from '@gorhom/animated-tabbar';
import colorConstant from '../constant/colorConstant';
import NotificationScreen from '../Screen/Notification/NotificationScreen';
import CartListScreen from '../Screen/Booking/CartListScreen';

const TabNavigation = () => {
  const Tabs = AnimatedTabBarNavigator();
  // const Tabs = createBottomTabNavigator();
  const Home = () => {};
  const Home1 = () => {};
  const Home2 = () => {};
  const Home3 = () => {};
  const Home4 = () => {};

  const tabs = {
    Home: {
      // < Screen name
      labelStyle: {
        color: '#5B37B7',
      },
      icon: {
        activeColor: 'rgba(91,55,183,1)',
        inactiveColor: 'rgba(0,0,0,1)',
      },
      background: {
        activeColor: colorConstant.colorPrimary,
        inactiveColor: 'rgba(223,215,243,0)',
      },
    },
    Profile: {
      // < Screen name
      labelStyle: {
        color: '#1194AA',
      },
      icon: {
        activeColor: 'rgba(17,148,170,1)',
        inactiveColor: 'rgba(0,0,0,1)',
      },
      background: {
        activeColor: 'rgba(207,235,239,1)',
        inactiveColor: 'rgba(207,235,239,0)',
      },
    },
  };

  return (
    <View style={{flex: 1}}>
      <Tabs.Navigator
        initialRouteName="Home"
        tabBarOptions={{
          activeTintColor: '#fff',
          inactiveTintColor: '#222222',
          activeDotColor: 'red',
          activeTabBackgrounds: 'red',
        }}
        screenOptions={({route}) => ({
          tabBarStyle: {
            activeColor: 'red',
            background: 'red',
          },
        })}>
        <Tabs.Screen
          name="setting"
          component={AdditionalServices}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={require('../Img/icon/setting.png')}
                style={{width: size ? size : 18, height: size ? size : 18}}
                resizeMode="contain"
                tintColor={focused ? '#fff' : '#484C52'}
              />
              //   <Icon
              //     name="Home"
              //     size={size ? size : 18}
              //     color={focused ? color : '#484C52'}
              //     focused={focused}
              //     color={color}
              //   />
            ),
           

          }}
        />
        <Tabs.Screen
          name="cart"
          // component={ExplorServices}
          component={CartListScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={require('../Img/icon/language.png')}
                style={{width: size ? size : 18, height: size ? size : 18}}
                resizeMode="contain"
                tintColor={focused ? '#fff' : '#484C52'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name={'Home'}
          component={HomeNavigation}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={require('../Img/icon/home.png')}
                style={{width: size ? size : 18, height: size ? size : 18}}
                resizeMode="contain"
                tintColor={focused ? '#fff' : '#484C52'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="notification"
          component={NotificationScreen}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={require('../Img/icon/notification.png')}
                style={{width: size ? size : 18, height: size ? size : 18}}
                resizeMode="contain"
                tintColor={focused ? '#fff' : '#484C52'}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="user"
          component={Home4}
          options={{
            tabBarIcon: ({focused, color, size}) => (
              <Image
                source={require('../Img/icon/user.png')}
                style={{width: size ? size : 18, height: size ? size : 18}}
                resizeMode="contain"
                tintColor={focused ? '#fff' : '#484C52'}
              />
            ),
          }}
        />
      </Tabs.Navigator>
    </View>
  );
};

export default TabNavigation;

const styles = StyleSheet.create({});
