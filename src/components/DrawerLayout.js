import { ScrollView, VStack, Box, Text, Divider, Pressable,HStack, Badge } from 'native-base'
import React from 'react'
import { FontAwesome5 } from '@expo/vector-icons'
import { useAuth } from '../contexts/AppContext'

export default function DrawerLayout(props) {
  const { drawer, navigation } = props
  const { user } = useAuth()

  const menus = [
    {
      name: 'kasir',
      icon: 'cash-register',
      screen: 'CreateSaleScreen',
    },
    {
      name: 'transaksi penjualan',
      icon: 'list-alt',
      screen: 'ListSaleScreen',
    },
    {
      name: 'transaksi pembelian',
      icon: 'list-alt',
      screen: 'ListPurchaseScreen',
    },
    {
      name: 'pengguna',
      icon: 'user-friends',
      screen: 'ListUserScreen',
    },

    {
      name: 'pelanggan',
      icon: 'user-tag',
      screen: 'ListCustomerScreen',
    },
    {
      name: 'ketegori',
      icon: 'tag',
      screen: 'ListCategoryScreen',
    },
    {
      name: 'produk',
      icon: 'list-alt',
      screen: 'ListProductScreen',
    }
  ]

  return (
    <ScrollView {...props} safeArea flex={1}>
      <VStack space={4} my={2} mx={1}>
        <Pressable 
          onPress={() => {
            navigation.navigate('ProfileScreen', { name: 'screen' })
            drawer.current.closeDrawer()
          }}>
          <Box px={4} my={6}>
            <Text bold color="gray.700">
              {user?.name}
            </Text>
            <HStack>
              <Text fontSize={14} mt={1} color="gray.500" fontWeight={500}>
                {user?.email}
              </Text>
              <Badge mx="1" my="1">
                {user?.role}
              </Badge>
            </HStack>
            <Text color="gray.700">{user?.company_name}</Text>
          </Box>
        </Pressable>
        <Divider width="100%"/>
        <VStack space={1}>
          {menus.map((menu, index) => (
            <Pressable
              px={5}
              py={3}
              bg={false ? 'primary.100' : 'transparent'}
              key={index}
              onPress={() => {
                navigation.navigate(menu.screen, { name: menu.name })
                drawer.current.closeDrawer()
              }}
            >
              <HStack space={4} alignItems="center">
                <FontAwesome5 name={menu.icon} size={20} />
                <Text color="gray.700" fontWeight={500}>
                  {menu.name}
                </Text>
              </HStack>
            </Pressable>
          ))}
        </VStack>
      </VStack>
    </ScrollView>
  )
}