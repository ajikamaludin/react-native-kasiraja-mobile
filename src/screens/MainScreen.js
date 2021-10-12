import React from 'react'

import { AppBar } from '../components'
import LoginScreen from './auth/LoginScreen'
import RegisterScreen from './auth/RegisterScreen'

import CreateSaleScreen from './sales/CreateScreen'
import BarcodeScanScreen from './sales/BarcodeScanScreen'
import CreatePayScreen from './sales/CreatePayScreen'
import SelectionCustomerScreen from './sales/SelectionCustomerScreen'
import TransactionSuccessScreen from './sales/TransactionSuccessScreen'

import CreateDetailScreen from './sales/CreateDetailScreen'
import ProfileScreen from './profile/ProfileScreen'

import ListCategoryScreen from './categories/ListScreen'
import CreateCategoryScreen from './categories/CreateScreen'
import EditCategoryScreen from './categories/EditScreen'

import ListProductScreen from './products/ListScreen'
import ListUserScreen from './users/ListScreen'
import ListCustomerScreen from './customers/ListScreen'
import ListSaleScreen from './sales/ListScreen'
import ListPurchaseScreen from './purchases/ListScreen'

import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { useAuth } from '../contexts/AppContext'

const Stack = createNativeStackNavigator()

export default function MainScreen({ navigationRef, drawer }) {
  
  const { user } = useAuth()

  return (
    <NavigationContainer ref={navigationRef}>
      {user === null ? (
        <Stack.Navigator
          initialRouteName="LoginScreen"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
        </Stack.Navigator>
      ) : (
        <Stack.Navigator
          initialRouteName="CreateSaleScreen"
          screenOptions={{
            header: (props) => <AppBar drawer={drawer} {...props} />,
          }}
        >
          <Stack.Screen
            name="CreateSaleScreen"
            component={CreateSaleScreen}
            options={{ title: 'kasirAja' }}
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
          <Stack.Screen
            name="BarcodeScanScreen"
            component={BarcodeScanScreen}
            options={{ title: 'scan barcode' }}
          />
          <Stack.Screen
            name="CreateDetailScreen"
            component={CreateDetailScreen}
            options={{ title: 'detail order' }}
          />
          <Stack.Screen
            name="CreatePayScreen"
            component={CreatePayScreen}
            options={{ title: 'pembayaran' }}
          />
          <Stack.Screen
            name="SelectionCustomerScreen"
            component={SelectionCustomerScreen}
            options={{ title: 'pelanggan' }}
          />
          <Stack.Screen
            name="TransactionSuccessScreen"
            component={TransactionSuccessScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="CreateCategoryScreen"
            component={CreateCategoryScreen}
            options={{ title: 'buat kategori' }}
          />
          <Stack.Screen
            name="EditCategoryScreen"
            component={EditCategoryScreen}
            options={{ title: 'detail kategori' }}
          />
        </Stack.Navigator>
      )}
    </NavigationContainer>
  )
}