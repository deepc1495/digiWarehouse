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
import BookingHistory from '../Screen/Booking/BookingHistory';

const TabNavigation = () => {
  const Tabs = AnimatedTabBarNavigator();
  // const Tabs = createBottomTabNavigator();
 const Home4 = ()=>{}
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
          // component={AdditionalServices}
          component={CartListScreen}
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
          name="Service"
          component={ExplorServices}
          // component={CartListScreen}
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
