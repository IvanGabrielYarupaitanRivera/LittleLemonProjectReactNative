// AppNavigator.js

import React, { useState, useEffect } from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import Home from './components/Home'
import Onboarding from './components/Onboarding'
import Profile from './components/Profile'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useUser } from './UserContext'
import { useNavigation } from '@react-navigation/native'
import { ActivityIndicator, View } from 'react-native'

const Stack = createStackNavigator()

const AppNavigator = () => {
  const { userData, setUserData } = useUser()
  const [loading, setLoading] = useState(true)
  const navigation = useNavigation()

  useEffect(() => {
    const loadUserData = async () => {
      try {
        // Obtiene los datos del usuario desde AsyncStorage
        const userDataString = await AsyncStorage.getItem('userData')
        const userData = userDataString ? JSON.parse(userDataString) : null

        // Actualiza los datos del usuario en el contexto
        setUserData(userData)

        setLoading(false)
      } catch (error) {
        console.error('Error al cargar los datos del usuario:', error)
      }
    }

    loadUserData()
  }, []) // Este efecto se ejecuta solo una vez al cargar la aplicación

  if (loading) {
    return <ActivityIndicator size='large' color='#0000ff' />
  }

  return (
    <Stack.Navigator initialRouteName={userData ? 'Home' : 'Onboarding'}>
      <Stack.Screen name='Onboarding' component={Onboarding} />
      <Stack.Screen name='Home' component={Home} />
      <Stack.Screen name='Profile' component={Profile} />
    </Stack.Navigator>
  )
}

export default AppNavigator
