import React, { useEffect, useState } from "react"
import { View, Text, HStack, VStack, Box, Center, Badge, Divider, Button } from 'native-base'
import { getSale } from "./Api"
import { useAuth } from "../../contexts/AppContext"
import { ToastAndroid, TouchableOpacity } from 'react-native'
import ModalLoading from "../../components/ModalLoading"
import { displayDate, formatIDR } from "../../utils"

export default function DetailScreen({ navigation, route }) {
  const { id } = route.params
  const { user } = useAuth()

  const [loading, setLoading] = useState(false)
  const [sale, setSale] = useState(null)

  const totalItem = sale?.items.reduce((amt, item) => amt + +item.quantity, 0)

  const handleCoomingSoon = () => {
    ToastAndroid.show('cooming soon...', ToastAndroid.SHORT)
  }

  useEffect(() => {
    setLoading(true)
    getSale(id, user.accessToken)
    .then((res) => {
      setSale(res.sale)
      navigation.setOptions({ title: res.sale.invoice })
    })
    .catch((err) => {
      ToastAndroid.show(err?.message, ToastAndroid.SHORT)
      navigation.goBack()
    })
    .finally(() => {
      setLoading(false)
    })
  }, [id])

  if(loading){
    return (
      <View>
        <ModalLoading loading={loading} />
      </View>
    )
  }

  return (
    <View flex={1} bgColor="white">
      <VStack p={2} bgColor="white">
        <HStack justifyContent="space-between" p={2}>
          <VStack>
            <Text>{sale?.customer_name}</Text>
            <Text fontWeight="bold" fontSize={18}>
              {formatIDR(sale?.amount)}
            </Text>
          </VStack>
          <VStack>
            <Text>{displayDate(sale?.date)}</Text>
            <Text>{sale?.casier}</Text>
          </VStack>
        </HStack>
        <Divider borderColor="muted.300" w="100%" my={1} />
        <HStack justifyContent="space-between" p={2}>
          <Text fontSize={18}>{`${totalItem} barang`}</Text>
          <Box bg="success.500" p={1} rounded={10} mr={2}>
            <Center>
              <Text color="white">Lunas</Text>
            </Center>
          </Box>
        </HStack>
        <Divider borderColor="muted.300" w="100%" mb={1} />
        {sale?.items.map((item) => (
          <TouchableOpacity key={item.id}>
            <HStack justifyContent="space-between" px={4} py={2}>
              <HStack>
                <Badge>{formatIDR(item.quantity)}</Badge>
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
            <Text fontWeight="bold">{formatIDR(sale?.amount)}</Text>
          </HStack>
          <Divider borderColor="muted.300" w="100%" />
          <TouchableOpacity>
            <HStack justifyContent="space-between" p={4}>
              <Text fontWeight="bold">Diskon</Text>
              <Text fontWeight="bold">{formatIDR(sale?.discount)}</Text>
            </HStack>
          </TouchableOpacity>
          <Divider borderColor="muted.300" w="100%" />
        </VStack>
        <HStack justifyContent="space-between" p={2} px={10}>
          <Text fontWeight="bold" fontSize={18}>
            Total
          </Text>
          <Text fontWeight="bold" fontSize={18}>
            {formatIDR(+sale?.amount - +sale?.discount)}
          </Text>
        </HStack>
        <Center mt={10}>
          <HStack space={2}>
            <Button
              minW="100px"
              size="lg"
              variant="outline"
              onPress={handleCoomingSoon}
              _pressed={{ bg: 'muted.200' }}
            >
              Kirim
            </Button>
            <Button
              minW="100px"
              size="lg"
              variant="outline"
              onPress={handleCoomingSoon}
              _pressed={{ bg: 'muted.200' }}
            >
              Cetak
            </Button>
          </HStack>
        </Center>
      </VStack>
    </View>
  )
}
