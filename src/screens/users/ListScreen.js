import React, { useState, useCallback } from 'react'
import {
  View,
  VStack,
  Icon,
  FlatList,
  Input,
  Text,
  Spinner,
  Avatar,
  Box,
  Flex,
  HStack,
} from 'native-base'
import { useFocusEffect } from '@react-navigation/native'
import { useDebounce } from 'use-debounce'
import { AntDesign, Entypo } from '@expo/vector-icons'

import { ToastAndroid, TouchableHighlight } from 'react-native'
import { useAuth } from '../../contexts/AppContext'
import { getUsers } from './Api'

import FabButton from '../../components/FabButton'

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
    await getUsers(user.accessToken, { ...params })
      .then((res) => {
        if (+res.meta.total === items.length) {
          setIsCanLoadMore(false)
        } else {
          setIsCanLoadMore(true)
          setPage(+res.meta.page + 1)
        }
        if (refresh) {
          setItems(res.users.filter(user => user.role !== 'admin'))
        } else {
          setItems(items.concat(res.users.filter((user) => user.role !== 'admin')))
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

  const ItemUser = ({ item, onPress }) => {
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
            <HStack>
              <Avatar mr={2}>
                {item?.name
                  .split(' ', 2)
                  .map((n) => n[0])
                  .join('')
                  .toUpperCase()}
              </Avatar>
              <VStack>
                <Text>{item?.name}</Text>
                <Text>{item?.email}</Text>
              </VStack>
            </HStack>
            <Text>{item.role}</Text>
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
            <ItemUser
              item={item}
              onPress={() => {
                navigation.navigate('EditUserScreen', {
                  id: item.id,
                  user_name: item.name,
                  user_email: item.email,
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
        onPress={() => navigation.navigate('CreateUserScreen')}
        h={10}
        label="baru"
      />
    </View>
  )
}
