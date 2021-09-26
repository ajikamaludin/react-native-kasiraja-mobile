import React, { useState } from 'react'
import { View, Text, VStack, HStack, Button, Box, Input, IconButton, Slide } from 'native-base'
import Numpad from '../../components/Numpad'
import { Keyboard } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'

export default function CreatePayScreen() {

  const [payment, setPayment] = useState(true)

  return (
    <View flex={1} backgroundColor="white">
      <VStack p={1} maxH="100%">
        <VStack p={4}>
          <Text>Total Tagihan</Text>
          <Text fontWeight="bold" fontSize="4xl">
            69.000
          </Text>
        </VStack>
        {/*  */}
        <HStack justifyContent="space-between">
          <Button
            w="50%"
            variant="unstyled"
            borderBottomWidth={payment ? 1 : 0}
            borderBottomColor="muted.500"
            rounded="0"
            _pressed={{ bg: 'muted.100' }}
            onPress={() => setPayment(true)}
          >
            Tunai
          </Button>
          <Button
            w="50%"
            variant="unstyled"
            borderBottomWidth={!payment ? 1 : 0}
            borderBottomColor="muted.500"
            rounded="0"
            _pressed={{ bg: 'muted.100' }}
            onPress={() => setPayment(false)}
          >
            Non Tunai
          </Button>
        </HStack>
        <HStack mt={6}>
          {payment && (
            <Slide in={payment} placement="bottom" duration="1000">
              <VStack>
                <Button w="100%">Uang Pas</Button>
                <Text>Uang Diterima</Text>
                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                  <Input variant="unstyled" showSoftInputOnFocus={false} />
                </TouchableWithoutFeedback>
              </VStack>
            </Slide>
          )}
          {!payment && (
            <Slide in={!payment}>
              <VStack>
                <Text>Gambar Pembayaran Non Tunai</Text>
              </VStack>
            </Slide>
          )}
        </HStack>
      </VStack>
      {payment && <Numpad />}
    </View>
  )
}