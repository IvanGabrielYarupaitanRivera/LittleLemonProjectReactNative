// Home.jsx

import React, { useEffect, useState } from 'react'
import {
  View,
  Text,
  Image,
  Pressable,
  StyleSheet,
  FlatList,
  TextInput,
  ScrollView,
} from 'react-native'
import { useNavigation } from '@react-navigation/native'
import Icon from 'react-native-vector-icons/FontAwesome'

const Home = () => {
  // Obtener el objeto de navegación
  const navigation = useNavigation()
  const [menuData, setMenuData] = useState([])
  const [searchText, setSearchText] = useState('')
  const [filteredMenuData, setFilteredMenuData] = useState([])
  const [selectedCategory, setSelectedCategory] = useState(null)

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'https://raw.githubusercontent.com/Meta-Mobile-Developer-PC/Working-With-Data-API/main/menu.json'
        )
        const data = await response.json()
        setMenuData(data.menu)
      } catch (error) {
        console.log('Error al cargar los datos')
      }
    }

    fetchData() // Llamar a fetchData directamente aquí

    // Filtrar la lista basándonos en el texto de búsqueda
    const filteredData = menuData.filter(
      (item) =>
        item.title.toLowerCase().includes(searchText.toLowerCase()) &&
        (!selectedCategory || item.category === selectedCategory)
    )
    setFilteredMenuData(filteredData)
  }, [searchText, selectedCategory, menuData])

  const renderMenuItem = ({ item }) => (
    <View style={styles.menuItem}>
      <Image source={{ uri: item.image }} style={styles.menuItemImage} />
      <Text style={styles.menuItemTitle}>{item.title}</Text>
      <Text style={styles.menuItemDescription}>{item.description}</Text>
      <Text style={styles.menuItemPrice}>Precio: ${item.price}</Text>
      <Text style={styles.menuItemCategory}>Categoría: {item.category}</Text>
    </View>
  )

  const handleImagePress = () => {
    // Navegar a la pantalla Profile al hacer clic en la imagen
    navigation.navigate('Profile')
  }

  // Función para obtener categorías únicas
  const getUniqueCategories = () => {
    const categories = menuData.map((item) => item.category)
    return Array.from(new Set(categories))
  }

  // Función para manejar el clic en un botón de categoría
  const handleCategoryPress = (category) => {
    // Si la categoría ya está seleccionada, restablecer el filtro
    if (selectedCategory === category) {
      setSelectedCategory(null)
    } else {
      setSelectedCategory(category)
    }
  }

  return (
    <ScrollView style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <Image
          source={require('../assets/logo.png')} // Reemplaza con la ruta correcta de tu logo
          style={styles.logo}
        />
        {/* Imagen redondeada con acción al hacer clic */}
        <Pressable onPress={handleImagePress}>
          <Image
            source={require('../assets/profile.png')} // Reemplaza con la ruta correcta de tu imagen redondeada
            style={styles.roundedImage}
          />
        </Pressable>
      </View>

      {/* Sección de Título y Descripción */}
      <View style={styles.titleSection}>
        <Text style={styles.title}>LITTLE LEMON</Text>
        <Text style={styles.subtitle}>Perú</Text>
        <View style={styles.descriptionSection}>
          <Text style={styles.description}>
            Somos un restaurante que sirve los mejores platos de comida a base
            de limón peruano. Todos nuestros platos están hechos con el mejor
            limón que nuestros agricultores pueden sembrar.
          </Text>
          <Image
            source={require('../assets/hero-image.png')} // Reemplaza con la ruta correcta de tu imagen
            style={styles.restaurantImage}
          />
        </View>

        {/* Barra de búsqueda con ícono de lupa */}
        <View style={styles.searchInputContainer}>
          <Icon
            name='search'
            size={20}
            color='#EDEFEE'
            style={styles.searchIcon}
          />
          <TextInput
            style={styles.searchInput}
            placeholder='Buscar plato de comida...'
            value={searchText}
            onChangeText={setSearchText}
          />
        </View>
      </View>

      {/* Sección de Botones de Categoría */}
      <View style={styles.category}>
        <Text style={styles.categoryTitle}>
          Seleccione su categoría preferida
        </Text>
        <View style={styles.categorySection}>
          {getUniqueCategories().map((category) => (
            <Pressable
              key={category}
              style={({ pressed }) => [
                styles.categoryButton,
                category === selectedCategory && styles.selectedCategoryButton,
                pressed && styles.pressedCategoryButton,
              ]}
              onPress={() => handleCategoryPress(category)}
            >
              <Text
                style={[
                  styles.categoryButtonText,
                  category === selectedCategory &&
                    styles.selectedCategoryButtonText,
                ]}
              >
                {category}
              </Text>
            </Pressable>
          ))}
        </View>
      </View>

      {/* Lista de menú */}
      <Text style={styles.heading}>Menú</Text>
      <FlatList
        data={filteredMenuData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderMenuItem}
        style={styles.menuList}
      />

      {/* Agrega aquí el contenido adicional de tu página de inicio */}
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '100%',
    padding: 20, // Añade un relleno horizontal para mantener el espacio entre los elementos
  },
  logo: {
    width: 200,
    height: 50,
  },
  menuList: {
    flex: 1, // Esto permite que la FlatList ocupe todo el espacio disponible
  },
  text: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  roundedImage: {
    width: 50,
    height: 50,
    borderRadius: 50, // La mitad del ancho o alto para hacerla redonda
  },
  titleSection: {
    backgroundColor: '#495E57',
    width: '100%',
    padding: 20, // Añade un relleno para mantener el espacio entre los bordes y el contenido
    marginBottom: 0,
  },
  title: {
    fontSize: 30,
    color: '#F4CE14', // Color amarillo
    fontWeight: 'bold',
  },
  subtitle: {
    fontSize: 24,
    color: '#EDEFEE', // Color amarillo
    fontWeight: 'bold',
    marginBottom: 20,
  },
  descriptionSection: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginBottom: 40,
  },
  description: {
    flex: 1,
    fontSize: 16,
    marginRight: 10,
    color: '#EDEFEE',
  },
  restaurantImage: {
    width: 150,
    height: 150,
    borderRadius: 8,
  },
  searchInputContainer: {
    flexDirection: 'row',
    justifyContent: 'center', // Centra horizontalmente
    alignItems: 'center', // Comienza desde la parte superior verticalmente
    paddingHorizontal: 20,
  },
  searchIcon: {
    paddingRight: 20,
  },
  searchInput: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 2,
    paddingLeft: 20,
    backgroundColor: '#EDEFEE',
    borderRadius: 10,
    width: '100%',
  },
  categorySection: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    marginVertical: 20,
  },
  category: {
    backgroundColor: '#FBDABB',
    paddingVertical: 20,
  },
  categoryTitle: {
    textAlign: 'center',
    fontWeight: 'bold',
    marginBottom: 10,
    paddingHorizontal: 20,
    color: '#495E57', // Color del texto del título
    fontSize: 24,
  },
  categoryButton: {
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
    backgroundColor: '#F4CE14', // Color de fondo normal
  },
  selectedCategoryButton: {
    backgroundColor: '#495E57', // Color de fondo cuando está seleccionado
  },
  categoryButtonText: {
    color: '#495E57', // Color del texto normal
    fontWeight: 'bold',
  },
  selectedCategoryButtonText: {
    color: '#F4CE14', // Color del texto cuando está seleccionado
  },
  pressedCategoryButton: {
    opacity: 0.7, // Opacidad cuando se presiona el botón
  },
  menuItem: {
    marginBottom: 20,
    paddingHorizontal: 60,
  },
  menuItemImage: {
    width: '100%',
    height: 200,
    borderRadius: 8,
    marginBottom: 10,
  },
  menuItemTitle: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  menuItemDescription: {
    fontSize: 18,
    marginBottom: 5,
  },
  menuItemPrice: {
    color: 'gray',
    fontSize: 16,
    fontWeight: 'bold',
  },
  menuItemCategory: {
    color: 'gray',
    fontSize: 14,
    fontWeight: 'bold',
  },
  heading: {
    fontSize: 24,
    fontWeight: 'bold',
    marginVertical: 25,
    textAlign: 'center',
  },
})

export default Home
