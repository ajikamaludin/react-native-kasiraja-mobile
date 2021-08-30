import React, { useEffect, useRef } from 'react'
import { View, Text, Button } from 'native-base'
import { useAuth } from '../../contexts/AppContext'

export default function CreateSale() {

  return (
    <View flex={1} p={1}>
      <Button
        onPress={() => {alert('Sale Created')}}
      >Create Sale</Button>
    </View>
  )
}