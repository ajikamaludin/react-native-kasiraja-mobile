// here is drawer and navigations
// navigation to main as sales create
import { Button, Text, View } from 'native-base'
import React, { useEffect } from 'react'
import { useAuth } from '../contexts/AppContext'
import { Spinner } from '../components'

export default function MainScreen(props) {
  const { navigation } = props
  const { user, isLoggedIn, logout } = useAuth()

  const handleLogout = () => {
    navigation.navigate('Login')
    logout()
  }

  useEffect(() => {
    if(!isLoggedIn()) {
      navigation.navigate('Login')
    }
    console.log('MainScreen: ',`user: ${user}`)
  }, [user])

  if(!isLoggedIn()) {
    return <Spinner/>
  }

  return (
    <View pt="10">
      <Button
        onPress={() => handleLogout()}
      >Logout</Button>
      <Text color="black">{user?.email}</Text>
    </View>
  )
}