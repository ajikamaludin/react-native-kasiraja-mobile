import React, { useEffect } from "react"
import { View, Text, VStack, CheckIcon, Input, Button, Center, Circle } from 'native-base'
import { useCart } from "../../contexts/AppContext";
import { ToastAndroid } from "react-native";

export default function TransactionSuccessScreen({ route, navigation }){
  const { resetCart } = useCart()
  const { change } = route.params;

  const goToCreateSale = () => {
    navigation.goBack()
  }

  useEffect(() => {
    resetCart()
  }, [])

  return (
    <View flex={1} bgColor="white" p={2}>
      <VStack flex={1} justifyContent="space-between">
        <VStack flex={1}>
          <Center py="100px">
            <Circle bg="tertiary.500" size={98}>
              <CheckIcon color="white" size="10"/>
            </Circle>
          </Center>
          <Center mb={5}>
            <Text fontWeight="bold" fontSize="xl">
              Transaksi Sukses!
            </Text>
            {change > 0 && (
              <Text fontWeight="bold" fontSize="xl">
                Kembalian {change}
              </Text>
            )}
          </Center>
          <Input
            variant="outline"
            placeholder="081XXXXXXXXX"
            keyboardType="number-pad"
            InputRightElement={
              <Button
                variant="ghost"
                _pressed={{ bg: 'muted.100' }}
                _text={{ color: 'muted.200' }}
                mr={1}
                onPress={() => {
                  ToastAndroid.show('Cooming Soon...', ToastAndroid.SHORT)
                }}
              >
                Kirim Struk
              </Button>
            }
          />
        </VStack>

        <VStack space="sm">
          <Button
            variant="outline"
            _pressed={{ bg: 'muted.100' }}
            size="lg"
            onPress={() => {
              ToastAndroid.show('Cooming Soon...', ToastAndroid.SHORT)
            }}
          >
            Cetak Struk
          </Button>
          <Button size="lg" onPress={goToCreateSale}>
            Buat Pesanan Baru
          </Button>
        </VStack>
      </VStack>
    </View>
  )
}