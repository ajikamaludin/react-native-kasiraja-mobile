import React, { useState, useEffect } from 'react'
import { StyleSheet, Linking, ToastAndroid } from 'react-native'
import { Text, View, Button, Center, Icon } from 'native-base'
import { AntDesign } from '@expo/vector-icons' 
import { BarCodeScanner } from 'expo-barcode-scanner'

import { searchProductByCode } from '../products/Api'

import { useAuth, useCart } from '../../contexts/AppContext'
import FabButton from '../../components/FabButton'

export default function BarcodeScanScreen({ navigation }) {
  const [hasPermission, setHasPermission] = useState(null)
  const [scanned, setScanned] = useState(false)

  const { user } = useAuth()
  const { cart, setCart } = useCart()

  const addItem = async(code) => {
    await searchProductByCode(user.accessToken, code)
      .then((item) => {
        if (item !== undefined) {
          if (+item.stock <= 0) {
            ToastAndroid.show('stok tidak tersedia', ToastAndroid.SHORT)
            return
          }
          const exists = cart.items.find((cartItem) => cartItem.id === item.id)
          if (exists) {
            setCart({
              ...cart,
              items: cart.items.map((cartItem) => {
                if (cartItem.id === item.id) {
                  return {
                    ...cartItem,
                    quantity: +item.stock >= cartItem.quantity + 1 ? cartItem.quantity + 1 : +item.stock
                  }
                }
                return cartItem
              }),
            })
          } else {
            setCart({
              ...cart,
              items: cart.items.concat({ ...item, quantity: 1 }),
            })
          }
          ToastAndroid.show(`${item.name} dimasukan`, ToastAndroid.SHORT)
        } else {
          ToastAndroid.show('produk tidak ditemukan', ToastAndroid.SHORT)
        }
      })
      .catch((err) => {
        ToastAndroid.show(err, ToastAndroid.SHORT)
      })
  }

  const totalQuantity = cart.items.reduce((amt, item) => amt + item.quantity, 0)

  const handlePermissionRequest = () => {
    navigation.pop()
    Linking.openSettings()
  }

  const checkPermission =  async () => {
    const { status } = await BarCodeScanner.requestPermissionsAsync()
    setHasPermission(status === 'granted')
  }

  useEffect(() => {
    checkPermission()
  }, [])

  const handleBarCodeScanned = ({ data }) => {
    setScanned(true)
    addItem(data)
  }

  if (hasPermission === null) {
    return <Center flex={1}>Requesting for camera permission</Center>
  }
  if (hasPermission === false) {
    return (
      <Center flex={1}>
        <Text>No access to camera, please allow in settings</Text>
        <Button mt={10} onPress={() => handlePermissionRequest()}>
          Open Settings
        </Button>
      </Center>
    )
  }

  return (
    <View flex="1">
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={StyleSheet.absoluteFillObject}
      >
        <View style={styles.layerTop} />
        <View style={styles.layerCenter}>
          <View style={styles.layerLeft} />
          <View style={styles.focused} />
          <View style={styles.layerRight} />
        </View>
        <View style={styles.layerBottom} />
      </BarCodeScanner>
      {scanned && (
        <Button
          position="absolute"
          bottom="20"
          right="10"
          left="10"
          onPress={() => setScanned(false)}
        >
          Scan Again
        </Button>
      )}
      {cart.items.length > 0 ? (
        <FabButton
          icon={
            <Icon
              color="white"
              as={<AntDesign name="shoppingcart" />}
              size="sm"
            />
          }
          h={10}
          onPress={() => navigation.navigate('CreateDetailScreen')}
          label={`${totalQuantity} barang`}
        />
      ) : null}
    </View>
  )
}

const opacity = 'rgba(0, 0, 0, .6)'
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
  },
  layerTop: {
    flex: 2,
    backgroundColor: opacity,
  },
  layerCenter: {
    flex: 1,
    flexDirection: 'row',
  },
  layerLeft: {
    flex: 1,
    backgroundColor: opacity,
  },
  focused: {
    flex: 10,
  },
  layerRight: {
    flex: 1,
    backgroundColor: opacity,
  },
  layerBottom: {
    flex: 2,
    backgroundColor: opacity,
  },
})