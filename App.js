// App.js

import React, { useState } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import AppNavigator from './AppNavigator'
import { UserProvider } from './UserContext';
const App = () => {
  return (
    <UserProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </UserProvider>
  );
};

export default App
