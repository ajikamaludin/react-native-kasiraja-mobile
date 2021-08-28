import React from 'react'
import { Center, Spinner as SpinnerNB } from 'native-base'

export default function Spinner() {
  return (
    <Center
      flex={1}
    >
      <SpinnerNB size="large" />
    </Center>
  )
}