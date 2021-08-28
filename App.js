import React from 'react';
import { NativeBaseProvider, extendTheme } from 'native-base'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'

import LoginScreen from './src/screens/auth/LoginScreen';
import RegisterScreen from './src/screens/auth/RegisterScreen';
import MainScreen from './src/screens/MainScreen';

// here is context and native base provider
// navigation login , register , main screen
const Stack = createNativeStackNavigator()

export default function App() {
  const theme = extendTheme({
    colors: {
      primary: {
        50: '#FFF5F5',
        100: '#FED7D7',
        200: '#FEB2B2',
        300: '#FC8181',
        400: '#F56565',
        500: '#E53E3E',
        600: '#C53030',
        700: '#9B2C2C',
        800: '#822727',
        900: '#63171B',
      },
      // Redefinig only one shade, rest of the color will remain same.
      amber: {
        400: '#d97706',
      },
    },
    config: {
      // Changing initialColorMode to 'dark'
      initialColorMode: 'dark',
    },
  })
  return (
    <NativeBaseProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName="Login"
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name="Login" component={LoginScreen} />
          <Stack.Screen name="Register" component={RegisterScreen} />
          <Stack.Screen name="Main" component={MainScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </NativeBaseProvider>
  )
}
