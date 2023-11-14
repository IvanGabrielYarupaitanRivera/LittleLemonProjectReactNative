// Onboarding.tsx

import React, { useState } from 'react'
import {
  View,
  Text,
  TextInput,
  StyleSheet,
  Image,
  Pressable,
  Alert,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import { useUser } from '../UserContext'
import Icon from 'react-native-vector-icons/MaterialCommunityIcons'

const Onboarding = () => {
  const [name, setName] = useState('')
  const [lastName, setLastName] = useState('')
  const [email, setEmail] = useState('')
  const { setUserData } = useUser()

  // Obtener el objeto de navegación
  const navigation = useNavigation()

  const handleRegister = async () => {
    // Validar campos antes de registrar
    if (!name || !lastName || !email) {
      Alert.alert('Registro no exitoso', 'Rellenar los datos')
      return
    }
    // Actualizar datos del usuario en el contexto
    setUserData({ nombre: name, apellido: lastName, email })

    // Mostrar mensaje de registro exitoso (puedes modificar este mensaje según tus necesidades)
    Alert.alert('Registro exitoso', '¡Gracias por registrarte!')
    // Navegar a la pantalla Home después de un registro exitoso
    navigation.navigate('Home')
  }

  return (
    <View style={styles.container}>
      {/* Encabezado con el logo */}
      <Image
        source={require('../assets/logo.png')}
        style={styles.logo}
        resizeMode='contain'
      />

      {/* Banner "Conozcámonos" */}
      <View style={styles.banner}>
        <Text style={styles.bannerText}>Conozcámonos</Text>
      </View>

      {/* Formulario de Información Personal */}
      <View style={styles.form}>
        <Text style={styles.formTitle}>Información Personal</Text>

        {/* Campos del formulario */}
        <TextInput
          style={styles.input}
          placeholder='Nombre'
          value={name}
          onChangeText={setName}
        />
        <TextInput
          style={styles.input}
          placeholder='Apellido'
          value={lastName}
          onChangeText={setLastName}
        />
        <TextInput
          style={styles.input}
          placeholder='Email'
          value={email}
          onChangeText={setEmail}
          inputMode='email'
        />

        {/* Botón de Registro */}
        <Pressable style={styles.registerButton} onPress={handleRegister}>
          <Text style={styles.registerButtonText}>
            <Icon name='account' size={20} color='#333' /> Registrar
          </Text>
        </Pressable>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    width: 300,
    height: 100,
    marginBottom: 20,
  },
  banner: {
    backgroundColor: '#495E57', // Agregamos esta línea para el color de fondo amarillo
    width: '100%',
    paddingVertical: 45,
    paddingHorizontal: 40,
  },
  bannerText: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    color: 'white',
  },
  form: {
    width: '100%',
    paddingHorizontal: 40,
    paddingVertical: 50,
  },
  formTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    paddingBottom: 25,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 20,
    paddingHorizontal: 10,
  },
  registerButton: {
    marginTop: 20,
    backgroundColor: '#F4CE14',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
  },
  registerButtonText: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
  },
})

export default Onboarding
