import React, { useState } from 'react'
import { View, Text, VStack, HStack, Button, Box, Input, Center, Icon } from 'native-base'
import Numpad from '../../components/Numpad'
import { Keyboard, Pressable, Animated } from 'react-native'
import { TouchableWithoutFeedback } from 'react-native'
import { TabView, SceneMap } from 'react-native-tab-view'
import { FontAwesome } from '@expo/vector-icons' 
import { useCart } from '../../contexts/AppContext'
import { formatIDR } from '../../utils'

const TunaiRoute = () => {
  const [payAmount, setPayAmount] = useState(0)

  return (
    <HStack mt={5}>
      <VStack space={5}>
        <Center>
          <Button variant="outline" _pressed={{ bg: 'muted.100' }} px="135px" mr={2}>
            <HStack>
              <FontAwesome name="money" size={20} color="gray"/>
              <Text ml={2} color="primary.400">Uang Pas</Text>
            </HStack>
          </Button>
        </Center>
        <VStack px={4}>
          <Text>Uang Diterima</Text>
          <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
            <Input variant="unstyled" showSoftInputOnFocus={false} value={`${payAmount}`}/>
          </TouchableWithoutFeedback>
        </VStack>
        <Numpad />
      </VStack>
    </HStack>
  )
}

const NonTunaiRoute = () => {
  return (
    <HStack mt={5} p={2}>
        <Text>Gambar</Text>
    </HStack>
  )
}

const renderScene = SceneMap({
  first: TunaiRoute,
  second: NonTunaiRoute,
});


export default function CreatePayScreen() {
  const [index, setIndex] = useState(0)

  const [routes] = useState([
    { key: 'first', title: 'Tunai' },
    { key: 'second', title: 'Non Tunai' },
  ])

  const renderTabBar = (props) => {
    const inputRange = props.navigationState.routes.map((x, i) => i)
    return (
      <Box flexDirection="row">
        {props.navigationState.routes.map((route, i) => {
          const opacity = props.position.interpolate({
            inputRange,
            outputRange: inputRange.map((inputIndex) =>
              inputIndex === i ? 1 : 0.5
            ),
          })
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