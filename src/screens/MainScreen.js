// here is drawer and navigations
// navigation to main as sales create
import { Button, Text, View } from 'native-base'
import React, { useEffect, useRef } from 'react'
import { BackHandler, DrawerLayoutAndroid } from 'react-native'
import { useAuth } from '../contexts/AppContext'
import { AppBar, Spinner } from '../components'
import DrawerLayout from '../components/DrawerLayout'

import { createNativeStackNavigator } from '@react-navigation/native-stack'

import CreateSaleScreen from './sales/CreateScreen'
import ProfileScreen from './profile/ProfileScreen'
import ListCategoryScreen from './categories/ListScreen'
import ListProductScreen from './products/ListScreen'
import ListUserScreen from './users/ListScreen'
import ListCustomerScreen from './customers/ListScreen'
import ListSaleScreen from './sales/ListScreen'
import ListPurchaseScreen from './purchases/ListScreen'

export default function MainScreen(props) {
  const { navigation } = props
  const { user, isLoggedIn, logout } = useAuth()

  const drawer = useRef(null)

  const Stack = createNativeStackNavigator()

  const handleLogout = () => {
    navigation.navigate('Login')
    logout()
  }

  useEffect(() => {
    if (!isLoggedIn()) {
      navigation.navigate('Login')
    }
  }, [])

  if(!isLoggedIn()) {
    return <Spinner/>
  }

  return (
    <DrawerLayoutAndroid
      ref={drawer}
      drawerWidth={300}
      drawerPosition={'left'}
      renderNavigationView={(props) => (
        <DrawerLayout
          {...props}
          navigation={navigation}
          drawer={drawer}
          user={user}
        />
      )}
    >
      <Stack.Navigator
        initialRouteName="CreateSale"
        screenOptions={{
          header: (props) => <AppBar drawer={drawer} {...props} />,
        }}
      >
        <Stack.Screen
          name="CreateSaleScreen"
          component={CreateSaleScreen}
          options={{ title: 'kasir' }}
        />
        <Stack.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{ title: 'profil' }}
        />
        <Stack.Screen
          name="ListCategoryScreen"
          component={ListCategoryScreen}
          options={{ title: 'kategori' }}
        />
        <Stack.Screen
          name="ListProductScreen"
          component={ListProductScreen}
          options={{ title: 'produk' }}
        />
        <Stack.Screen
          name="ListUserScreen"
          component={ListUserScreen}
          options={{ title: 'pengguna' }}
        />
        <Stack.Screen
          name="ListCustomerScreen"
          component={ListCustomerScreen}
          options={{ title: 'pelanggan' }}
        />
        <Stack.Screen
          name="ListSaleScreen"
          component={ListSaleScreen}
          options={{ title: 'penjualan' }}
        />
        <Stack.Screen
          name="ListPurchaseScreen"
          component={ListPurchaseScreen}
          options={{ title: 'pembelian' }}
        />
      </Stack.Navigator>
    </DrawerLayoutAndroid>
  )
}