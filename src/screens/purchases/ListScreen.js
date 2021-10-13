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
  Center,
} from 'native-base'
import DateRangePicker from 'react-native-daterange-picker'
import moment from 'moment'
import { useFocusEffect } from '@react-navigation/native'
import { useDebounce } from 'use-debounce'
import { AntDesign, Entypo, FontAwesome5, Fontisto } from '@expo/vector-icons'

import {
  Linking,
  ToastAndroid,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native'
import { useAuth } from '../../contexts/AppContext'
import { getPurchases } from './Api'

import { formatDate, formatIDR, displayDate } from '../../utils'

export default function ListScreen({ navigation }) {
  const { user } = useAuth()

  const [items, setItems] = useState([])
  const [search, setSearch] = useState('')
  const [dates, setDates] = useState({
    startDate: new Date(),
    endDate: new Date(),
    displayedDate: moment(),
  })

  const setFilterDates = (date) => {
    setDates({
      displayedDate: date.displayedDate
        ? date.displayedDate
        : dates.displayedDate,
      startDate: date.startDate ? date.startDate : dates.startDate,
      endDate: date.endDate ? date.endDate : dates.endDate,
      date: date.date ? date.date : dates.date,
    })
    if (date.endDate) {
      setOpen(false)
    }
  }

  const [q] = useDebounce(search, 500)
  const [page, setPage] = useState(1)
  const [isCanLoadMore, setIsCanLoadMore] = useState(true)
  const [isRefresh, setIsRefresh] = useState(false)
  const [isLoadMore, setIsLoadMore] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const fetch = async (params, refresh = false) => {
    await getPurchases(user.accessToken, {
      ...params,
      startDate: formatDate(dates.startDate),
      endDate: formatDate(dates.endDate),
    })
      .then((res) => {
        console.log(res)
        if (+res.meta.total === items.length) {
          setIsCanLoadMore(false)
        } else {
          setIsCanLoadMore(true)
          setPage(+res.meta.page + 1)
        }
        if (refresh) {
          setItems(res.purchases)
        } else {
          setItems(items.concat(res.purchases))
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
      if (!isOpen) {
        refresh()
      }
    }, [q, isOpen])
  )

  const ItemPurchase = ({ item, onPress }) => {
    return (
      <TouchableHighlight
        onPress={() => {
          onPress(item)
        }}
        activeOpacity={0.6}
        underlayColor="#FFFFFF"
      >
        <Box m={1} p={2} shadow={2} rounded="10" bgColor="white">
          <VStack>
            <Text fontWeight="bold" fontSize={16}>
              {formatIDR(item?.amount)}
            </Text>
            <HStack justifyContent="space-between">
              <HStack>
                <VStack pt={2}>
                  <Text>{formatDate(new Date(item?.date))}</Text>
                  <Text fontSize={10}>{item?.invoice}</Text>
                </VStack>
              </HStack>
              <VStack>
                <Box bg="success.500" p={1} rounded={10} mr={2}>
                  <Center>
                    <Text color="white">Lunas</Text>
                  </Center>
                </Box>
                <Text>{item?.creator}</Text>
              </VStack>
            </HStack>
          </VStack>
        </Box>
      </TouchableHighlight>
    )
  }

  return (
    <View flex={1} bgColor="white">
      <VStack space={1} maxHeight={'100%'} p={1}>
        <DateRangePicker
          open={isOpen}
          onChange={setFilterDates}
          endDate={dates.endDate}
          startDate={dates.startDate}
          displayedDate={dates.displayedDate}
          range={true}
        >
          <TouchableOpacity onPress={() => setOpen(true)}>
            <HStack
              px={2}
              py={3}
              borderWidth={1}
              borderColor="muted.200"
              rounded="5"
            >
              <Icon
                as={<Fontisto name="date" />}
                size="6"
                mr="2"
                color="muted.400"
              />
              <Text color="muted.600" pt={1}>
                {`${displayDate(dates.startDate)} - ${displayDate(
                  dates.endDate
                )}`}
              </Text>
            </HStack>
          </TouchableOpacity>
        </DateRangePicker>
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
            <ItemPurchase item={item} onPress={() => { Linking.openURL('https://kasiraja.ajikamaludin.id') }}/>
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
    </View>
  )
}
