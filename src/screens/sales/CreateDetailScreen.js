import React, { useState } from 'react'
import { View, Text, VStack, HStack, Badge, Divider, Center, Button, Icon, Box, ScrollView } from 'native-base'
import { MaterialIcons } from '@expo/vector-icons' 
import { useFocusEffect } from '@react-navigation/native'

import { useCart } from '../../contexts/AppContext'
import { TouchableOpacity, ToastAndroid } from 'react-native'
import { formatIDR } from '../../utils'

import ModalDiscount from './ModalDiscount'
import ModalItem from './ModalItem'
import ModalDelete from './ModalDelete'

export default function CreateDetailScreen({navigation}) {
  const { cart, setCart, resetCart } = useCart()
  
  const [discount, setDiscount] = useState(+cart.discount > 0 ? +cart.discount : 0)
  const [modalDiscount, setModalDiscount] = useState(false)

  const [modalItem, setModalItem] = useState(false)
  const [selected, setSelected] = useState(null)

  const [modalDelete, setModalDelete] = useState(false)

  const handleChangeItem = (newItem) => {
    setCart({
      ...cart,
      items: cart.items.map((item) => {
        if(item.id === newItem.id) {
          return newItem
        } else {
          return item
        }
      })
    })
  }

  const handleRemoveItem = (item) => {
    setCart({
      ...cart,
      items: cart.items.filter((fitem) => fitem.id !== item.id)
    })
  }

  const handleDiscountChange = (discount) => {
    setDiscount(+discount)
    setCart({
      ...cart,
      discount: +discount,
    })
  }

  const handlDeleteOrder = () => {
    resetCart()
  }

  const totalOrder = cart.items.reduce((amt, item) => +amt + +item.price * +item.quantity, 0)
  const totalOrderAfterDiscount = totalOrder - discount

  useFocusEffect(() => {
    if(cart.items.length <= 0) {
      navigation.goBack()
    }
  })

  return (
    <View flex={1} backgroundColor="white">
      <ScrollView>
        <VStack>
          <TouchableOpacity
            onPress={() => navigation.navigate('SelectionCustomerScreen')}
          >
            <HStack justifyContent="space-between" p={4}>
              <Text fontWeight="bold">
                {cart?.customer === null
                  ? 'Pelanggan'
                  : cart?.customer?.name}
              </Text>
              <Icon
                size="sm"
                color="muted.500"
                as={<MaterialIcons name="arrow-forward-ios" />}
              />
            </HStack>
          </TouchableOpacity>
          <Divider borderColor="muted.300" w="100%" mb={1} />
          {cart.items.map((item) => (
            <TouchableOpacity
              key={item.id}
              onPress={() => {
                setSelected(item)
                setModalItem(true)
              }}
            >
              <HStack justifyContent="space-between" px={4} py={2}>
                <HStack>
                  <Badge>{item.quantity}</Badge>
                  <Text fontWeight="bold" ml={2}>
                    {item.name}
                  </Text>
                </HStack>
                <Text>{formatIDR(+item.quantity * +item.price)}</Text>
              </HStack>
            </TouchableOpacity>
          ))}

          <Divider borderColor="muted.300" w="100%" my={1} />
          <VStack py={1} px={6}>
            <HStack justifyContent="space-between" p={4}>
              <Text fontWeight="bold">Subtotal</Text>
              <Text fontWeight="bold">{formatIDR(totalOrder)}</Text>
            </HStack>
            <Divider borderColor="muted.300" w="100%" />
            <TouchableOpacity onPress={() => setModalDiscount(true)}>
              <HStack justifyContent="space-between" p={4}>
                <Text fontWeight="bold">Diskon</Text>
                {discount <= 0 ? (
                  <Icon
                    size="sm"
                    color="muted.500"
                    as={<MaterialIcons name="arrow-forward-ios" />}
                  />
                ) : (
                  <Text fontWeight="bold">{formatIDR(discount)}</Text>
                )}
              </HStack>
            </TouchableOpacity>
            <Divider borderColor="muted.300" w="100%" />
          </VStack>

          <Center mt="5" mb="32">
            <Button variant="outline" _pressed={{bg: "muted.200"}} onPress={() => setModalDelete(true)}>Hapus Pesanan</Button>
          </Center>
        </VStack>
      </ScrollView>
      <Box
        position="absolute"
        bottom="0"
        right="0"
        bgColor="white"
        p={4}
        width="100%"
        shadow={6}
      >
        <VStack space="md">
          <HStack justifyContent="space-between">
            <Text fontWeight="bold">Total</Text>
            <Text fontWeight="bold">{formatIDR(totalOrderAfterDiscount)}</Text>
          </HStack>
          <Button
            onPress={() => {
              if(cart.customer?.id === undefined) {
                ToastAndroid.show('Pelanggan belum dipilih', ToastAndroid.SHORT)
                return
              }
              navigation.navigate('CreatePayScreen')
            }}
          >
            Bayar
          </Button>
        </VStack>
      </Box>
      <ModalDiscount
        isOpen={modalDiscount}
        setOpen={setModalDiscount}
        discount={discount}
        setDiscount={handleDiscountChange}
      />
      <ModalItem
        isOpen={modalItem}
        setOpen={setModalItem}
        item={selected}
        setItem={handleChangeItem}
        removeItem={handleRemoveItem}
        setSelected={setSelected}
      />
      <ModalDelete
        isOpen={modalDelete}
        setOpen={setModalDelete}
        handleDelete={handlDeleteOrder}
      />
    </View>
  )
}
