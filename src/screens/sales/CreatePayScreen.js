import React, { useState } from 'react'
import { View, Text, VStack, HStack, Button, Box, Input, Center, Flex, Modal, Spinner } from 'native-base'
import { TouchableWithoutFeedback, Keyboard, Pressable, Animated, Image, TouchableHighlight } from 'react-native'
import { useFocusEffect, useNavigation } from '@react-navigation/native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { FontAwesome } from '@expo/vector-icons' 

import Numpad from '../../components/Numpad'
import { useAuth, useCart } from '../../contexts/AppContext'
import { formatIDR } from '../../utils'
import { createSale } from './Api'

const TunaiComponent = () => {
  const { user } = useAuth()
  const { cart, setCart } = useCart()
  const navigation = useNavigation()
  const [loading, setLoading] = useState(false)
  const [payAmount, setPayAmount] = useState(0)

  const totalOrder = cart.items.reduce((amt, item) => amt + +item.quantity * +item.price, 0)
  const total = totalOrder - (cart?.discount > 0 ? cart?.discount : 0)

  const setCartPayAmount = (amount) => {
    setCart({
      ...cart,
      payAmount: amount
    })
  }

  const gotoTransactionSuccess = (cash = true) => {
    navigation?.navigate('TransactionSuccessScreen', {
      change: cash ? 0 : +payAmount - +total,
    })
  }

  const onPayFull = () => {
    setPayAmount(0)
    saleTransaction(true)
  }

  const onNext = () => {
    setCartPayAmount(payAmount)
    saleTransaction(false)
  }

  const saleTransaction = (cash = true) => {
    setLoading(true)
    const date = new Date()
    const invoice = `${user?.name
          .split(' ', 2)
          .map((n) => n[0])
          .join('')
          .toUpperCase()}/INV/${date.toLocaleDateString()}/${date.getTime()}`
    const items = cart.items.map((item) => {
          return {
            productId: item.id,
            quantity: item.quantity,
            price: item.price,
          }
        })
    createSale({
      invoice,
      officeId: user?.officeid,
      customerId: cart.customer.id,
      date: date.toLocaleDateString(),
      amount: totalOrder,
      discount: cart.discount,
      description: '',
      items
    },
    user.accessToken
    )
      .then(() => {
        gotoTransactionSuccess(cash)
      })
      .catch(() => alert('Terjadi Kesalahan'))
      .finally(() => setLoading(false))
  }

  return (
    <HStack mt={5}>
      <VStack space={5}>
        <Center>
          <Button
            variant="outline"
            _pressed={{ bg: 'muted.100' }}
            px="135px"
            mr={2}
            onPress={onPayFull}
          >
            <HStack>
              <FontAwesome name="money" size={20} color="red" />
              <Text ml={2} color="primary.400" fontWeight="bold">
                Uang Pas
              </Text>
            </HStack>
          </Button>
        </Center>
        <VStack px={4}>
          <Text>Uang Diterima</Text>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Input
              variant="unstyled"
              showSoftInputOnFocus={false}
              fontWeight="bold"
              size="2xl"
              value={`${formatIDR(payAmount)}`}
            />
          </TouchableWithoutFeedback>
        </VStack>
        <Numpad
          amount={payAmount}
          setAmount={setPayAmount}
          total={total}
          onNext={onNext}
        />
        <Modal isOpen={loading} onClose={() => setLoading(false)}>
          <Modal.Content rounded={0} w="60px" h="60px">
            <Modal.Body>
              <Spinner flex={1} size="lg"/>
            </Modal.Body>
          </Modal.Content>
        </Modal>
      </VStack>
    </HStack>
  )
}

const NonTunaiComponent = () => {
  return (
    <HStack mt={5} p={2}>
      <TouchableHighlight onPress={() => alert('Cooming soon...')}>
        <Box p={2} bg="muted.100">
          <Text ml={2} fontSize={18} fontWeight="bold">
            E-Wallet
          </Text>
          <Flex direction="row" flexWrap="wrap" justifyContent="space-around">
            <Box w="100" h="100" mt={2} mr={2} ml={0} mb={2} bg="muted.200">
              <Center flex="1">
                <Image
                  style={{ width: 60, height: 60 }}
                  source={require('../../../assets/ewallets/linkaja.png')}
                />
              </Center>
            </Box>
            <Box w="100" h="100" mt={2} mr={2} ml={0} mb={2} bg="muted.200">
              <Center flex="1">
                <Image
                  resizeMode="contain"
                  style={{ width: 60, height: 60 }}
                  source={require('../../../assets/ewallets/gopay.png')}
                />
              </Center>
            </Box>
            <Box w="100" h="100" mt={2} mr={2} ml={0} mb={2} bg="muted.200">
              <Center flex="1">
                <Image
                  resizeMode="contain"
                  style={{ width: 60, height: 60 }}
                  source={require('../../../assets/ewallets/qris.png')}
                />
              </Center>
            </Box>
            <Box w="100" h="100" mt={2} mr={2} ml={0} mb={2} bg="muted.200">
              <Center flex="1">
                <Image
                  resizeMode="contain"
                  style={{ width: 60, height: 60 }}
                  source={require('../../../assets/ewallets/ovo.png')}
                />
              </Center>
            </Box>
            <Box w="100" h="100" mt={2} mr={2} ml={0} mb={2} bg="muted.200">
              <Center flex="1">
                <Image
                  resizeMode="contain"
                  style={{ width: 60, height: 60 }}
                  source={require('../../../assets/ewallets/dana.png')}
                />
              </Center>
            </Box>
            <Box w="100" h="100" mt={2} mr={2} ml={0} mb={2} bg="muted.200">
              <Center flex="1">
                <Text fontWeight="bold" fontSize="md">
                  Lainnya
                </Text>
              </Center>
            </Box>
          </Flex>
        </Box>
      </TouchableHighlight>
    </HStack>
  )
}

const renderScene = SceneMap({
  first: TunaiComponent,
  second: NonTunaiComponent,
});


export default function CreatePayScreen({ navigation }) {
  const [index, setIndex] = useState(0)

  const [routes] = useState([
    { key: 'first', title: 'Tunai' },
    { key: 'second', title: 'Non Tunai' },
  ])

  const renderTabBar = (props) => {
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const color = index === i ? '#1f2937' : '#a1a1aa'
          const borderColor = index === i ? 'primary.500' : 'coolGray.200'

          return (
            <Box
              key={i}
              borderBottomWidth="3"
              borderColor={borderColor}
              flex={1}
              alignItems="center"
              p="3"
              cursor="pointer"
            >
              <Pressable
                onPress={() => {
                  setIndex(i)
                }}
              >
                <Animated.Text style={{ color }}>{route.title}</Animated.Text>
              </Pressable>
            </Box>
          )
        })}
      </Box>
    )
  }

  const { cart } = useCart()

  const total = cart.items.reduce((amt, item) => amt + +item.quantity * +item.price, 0) - (cart?.discount > 0 ? cart?.discount : 0)

  useFocusEffect(() => {
    if (cart.items.length <= 0) {
      navigation.goBack()
    }
  })

  return (
    <View flex={1} backgroundColor="white">
      <VStack p={1} maxH="100%">
        <VStack p={4}>
          <Text>Total Tagihan</Text>
          <Text fontWeight="bold" fontSize="4xl">
            {formatIDR(total)}
          </Text>
        </VStack>
      </VStack>
      <TabView
        maxH="100%"
        navigationState={{ index, routes }}
        renderScene={renderScene}
        renderTabBar={renderTabBar}
        onIndexChange={setIndex}
      />
    </View>
  )
}