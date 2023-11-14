import React from 'react'
import { View, Text, Image, Pressable, StyleSheet } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../UserContext'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Profile = () => {
  const { userData } = useUser()
  const navigation = useNavigation()

  const handleLogout = () => {
    // Lógica para cerrar sesión y borrar los datos
    // En este ejemplo, simplemente navegamos de nuevo a la pantalla de inicio
    navigation.navigate('Onboarding')
  }

  return (
    <View style={styles.container}>
      {/* Encabezado con el logo */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode='contain'
      />

      {/* Mostrar datos del usuario */}
      <View style={styles.userDataContainer}>
        <Text style={styles.userDataText}>
          <Icon name='account' size={20} color='#333' /> Nombre:{' '}
          {userData?.nombre}
        </Text>
        <Text style={styles.userDataText}>
          <Icon name='account' size={20} color='#333' /> Apellido:{' '}
          {userData?.apellido}
        </Text>
        <Text style={styles.userDataText}>
          <Icon name='email' size={20} color='#333' /> Email: {userData?.email}
        </Text>
      </View>

      {/* Botón de Cerrar Sesión */}
      <Pressable style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>
          <Icon name='logout' size={16} color='black' /> Cerrar Sesión
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    justifyContent: 'center',
    alignItems: 'center',
  },
  logo: {
    width: 200,
    height: 100,
    marginBottom: 20,
  },
  userDataContainer: {
    marginBottom: 20,
  },
  userDataText: {
    fontSize: 16,
    marginBottom: 10,
    flexDirection: 'row', // Alinear icono y texto horizontalmente
    alignItems: 'center', // Alinear al centro verticalmente
  },
  logoutButton: {
    backgroundColor: '#F4CE14',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  logoutButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    flexDirection: 'row',
    alignItems: 'center',
  },
})

export default Profile
