import React, { useEffect, useState } from 'react'
import {
  View,
  VStack,
  HStack,
  FlatList,
  Input,
  IconButton,
  Spinner,
  Icon,
} from 'native-base'
import { ToastAndroid } from 'react-native'
import { AntDesign, MaterialCommunityIcons, Entypo } from '@expo/vector-icons' 
import { useAuth, useCart } from '../../contexts/AppContext'
import { getProducts } from '../products/Api'
import { useDebounce } from 'use-debounce'

import ItemProduct from '../../components/ItemProduct'
import SnackBar from 'react-native-snackbar-component'
import FabButton from '../../components/FabButton'

export default function CreateSale(props) {
  const { navigation } = props
  const { user } = useAuth()
  const { cart, setCart } = useCart()

  const [search, setSearch] = useState('')
  const [q] = useDebounce(search, 500)

  const [items, setItems] = useState([])

  const [page, setPage] = useState(1)
  const [isCanLoadMore, setIsCanLoadMore] = useState(true)
  const [isRefresh, setIsRefresh] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)

  const addItem = async (item) => {
    if(+item.stock <= 0) {
      ToastAndroid.show("stok barang tidak tersedia", ToastAndroid.SHORT);
      return 
    }
    const exists = cart.items.find(cartItem => cartItem.id === item.id)
    if(exists) {
      setCart({
        ...cart,
        items: cart.items.map(cartItem => {
          if(cartItem.id === item.id) {
            return {
              ...cartItem,
              quantity: +item.stock >= cartItem.quantity + 1 ? cartItem.quantity + 1 : +item.stock
            }
          }
          return cartItem
        })
      })
    } else {
      setCart({
        ...cart,
        items: cart.items.concat({ ...item, quantity: 1}),
      })
    }
  }

  const totalQuantity = cart.items.reduce((amt, item) => amt + item.quantity, 0)

  const fetch = async (params, refresh = false) => {
    await getProducts(user.accessToken, {...params, withStock: true})
      .then((res) => {
        if (+res.meta.total === items.length) {
          setIsCanLoadMore(false)
        } else {
          setIsCanLoadMore(true)
          setPage(+res.meta.page + 1)
        }
        if (refresh) {
          setItems(res.products)
        } else {
          setItems(items.concat(res.products))
        }
      })
      .catch(err => {
        ToastAndroid.show(err?.message, ToastAndroid.SHORT)
      })
  }

  const handleNextPage = async () => {
    if (isCanLoadMore && !isLoadMore) {
      setIsLoadMore(true)
      await fetch({ page, q })
      setIsLoadMore(false)
    }
  }

  const refresh = async () => {
    setIsRefresh(true)
    setPage(1)
    setIsCanLoadMore(true)
    setItems([])
    await fetch({ page: 1, q }, true)
    setIsRefresh(false)
  }

  useEffect(() => {
    refresh()
    return () => {}
  }, [q])

  return (
    <View flex={1} bgColor="white">
      <VStack space={1} maxHeight={'100%'}>
        <HStack space={1} px={1} pt={1}>
          <Input
            InputLeftElement={
              <Icon
                as={<AntDesign name="search1" />}
                size={5}
                ml="2"
                color="muted.400"
              />
            }
            InputRightElement={
              <Icon
                as={<Entypo name="circle-with-cross"/>}
                size={5}
                mr="2"
                color="muted.400"
                onPress={() => setSearch('')}
              />
            }
            placeholder="cari"
            flex={1}
            value={search}
            onChangeText={(text) => setSearch(text)}
          />
          <IconButton
            variant="outline"
            icon={<Icon as={<MaterialCommunityIcons name="barcode" />} />}
            onPress={() => {
              navigation.navigate('BarcodeScanScreen')
            }}
          />
        </HStack>
        <FlatList
          minHeight="64"
          data={items}
          renderItem={({ item }) => (
            <ItemProduct item={item} onPress={() => addItem(item)} />
          )}
          keyExtractor={(item) => {
            return item.id
          }}
          refreshing={isRefresh}
          onRefresh={() => refresh()}
          onEndReached={() => handleNextPage()}
          onEndReachedThreshold={0.5}
          initialNumToRender={10}
        />
        {isLoadMore && <Spinner />}
      </VStack>
      {totalQuantity > 0 && (
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
      )}
      {/* <SnackBar
        height={'5px'}
        visible={true}
        textMessage="offline"
      /> */}
      {/* offline state */}
    </View>
  )
}