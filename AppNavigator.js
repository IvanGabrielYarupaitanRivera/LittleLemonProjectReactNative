// AppNavigator.js

import React from 'react';
import { createStackNavigator } from '@react-navigation/stack';
import Home from './components/Home';
import Onboarding from './components/Onboarding';
import Profile from './components/Profile';

const Stack = createStackNavigator();

const AppNavigator = () => {
  return (
    <Stack.Navigator initialRouteName="Home">
      <Stack.Screen name="Onboarding" component={Onboarding} />
      <Stack.Screen name="Home" component={Home} />
      <Stack.Screen name="Profile" component={Profile} />
    </Stack.Navigator>
  );
};

export default AppNavigator;
