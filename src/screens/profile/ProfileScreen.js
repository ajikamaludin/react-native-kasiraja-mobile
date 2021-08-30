import React from 'react'
import { View, Text, Button } from 'native-base'
import { useAuth } from '../../contexts/AppContext'

export default function ProfileScreen(props) {
  const { user, logout } = useAuth()
  const { navigation } = props

  return (
    <View flex={1} p={1}>
      <Text color='black'>Profile Username: {user.name}</Text>
      <Button onPress={() => {
          logout()
          navigation.navigate('Login')
      }}>Logout</Button>
    </View>
  )
}