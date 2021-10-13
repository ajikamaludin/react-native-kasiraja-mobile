import React, { useState, useCallback } from 'react'
import {
  View,
  VStack,
  Icon,
  FlatList,
  Input,
  Text,
  Spinner,
  Box,
  HStack,
} from 'native-base'
import { useFocusEffect } from '@react-navigation/native'
import { useDebounce } from 'use-debounce'
import { AntDesign, Entypo } from '@expo/vector-icons'

import { ToastAndroid, TouchableHighlight } from 'react-native'
import { useAuth } from '../../contexts/AppContext'
import { getProducts } from './Api'

import FabButton from '../../components/FabButton'
import { formatIDR } from '../../utils'

export default function ListScreen({ navigation }) {
  const { user } = useAuth()

  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [q] = useDebounce(search, 500)
  const [page, setPage] = useState(1)
  const [isCanLoadMore, setIsCanLoadMore] = useState(true)
  const [isRefresh, setIsRefresh] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)

  const fetch = async (params, refresh = false) => {
    await getProducts(user.accessToken, { ...params, withStock: true })
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
      .catch((err) => {
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
    setIsCanLoadMore(true)
    setPage(1)
    setItems([])
    await fetch({ page: 1, q }, true)
    setIsRefresh(false)
  }

  useFocusEffect(
    useCallback(() => {
      refresh()
    }, [q])
  )

  const ItemProduct = ({ item, onPress }) => {
    return (
      <TouchableHighlight
        onPress={() => {
          onPress(item)
        }}
        activeOpacity={0.6}
        underlayColor="#FFFFFF"
      >
        <Box m={1} p={2} shadow={2} rounded="10" bgColor="white">
          <HStack justifyContent="space-between">
            <VStack>
              <Text fontWeight="bold" fontSize={16}>
                {item?.name}
              </Text>
              <Text pb={1}>persediaan: {formatIDR(item?.stock)}</Text>
            </VStack>
            <Text>{item.code}</Text>
          </HStack>
        </Box>
      </TouchableHighlight>
    )
  }

  return (
    <View flex={1} bgColor="white">
      <VStack space={1} maxHeight={'100%'} p={1}>
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
              as={<Entypo name="circle-with-cross" />}
              size={5}
              mr="2"
              color="muted.400"
              onPress={() => setSearch('')}
            />
          }
          placeholder="cari"
          value={search}
          onChangeText={(text) => setSearch(text)}
        />
        <FlatList
          minHeight="64"
          data={items}
          renderItem={({ item }) => (
            <ItemProduct
              item={item}
              onPress={() => {
                navigation.navigate('EditProductScreen', {
                  id: item.id,
                })
              }}
            />
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
      <FabButton
        icon={<Icon color="white" as={<AntDesign name="plus" />} size="sm" />}
        onPress={() => navigation.navigate('CreateProductScreen')}
        h={10}
        label="baru"
      />
    </View>
  )
}
