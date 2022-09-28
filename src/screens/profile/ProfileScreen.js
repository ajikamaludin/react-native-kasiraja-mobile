import React, { useState } from 'react'
import { View, Text, Button, Avatar, Box, HStack, VStack, Center, Modal } from 'native-base'
import { TouchableWithoutFeedback } from 'react-native'

import { useAuth } from '../../contexts/AppContext'
import BluetoothModal from '../setting/BluetoothModal'

export default function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  const [blueModalVisible, setBlueModalVisible] = useState(false)
  const { user, logout } = useAuth()
  const [counter, setCounter] = useState(0)

  const handleBluetoothOpen = () => {
     
  }

  return (
    <View flex={1} p={2} backgroundColor="white">
      <Box p="2" mb="2" rounded="5" backgroundColor="white" shadow="1">
        <HStack justifyContent="space-between" my="2">
          <HStack>
            <Avatar name={user?.name} mr="2">
              {user?.name
                .split(' ', 2)
                .map((n) => n[0])
                .join('')
                .toUpperCase()}
            </Avatar>
            <VStack>
              <Text color="black" fontWeight="bold">
                {user?.name}
              </Text>
              <Text color="black">{user?.email}</Text>
            </VStack>
          </HStack>

          <Button
            onPress={() => {
              navigation.navigate('EditUserScreen', {
                id: user.id,
                user_name: user.name,
                user_email: user.email,
                isCanDelete: false,
              })
            }}
          >
            Atur Akun
          </Button>
        </HStack>
      </Box>
      <Box p="2" mb="2" rounded="5" backgroundColor="white" shadow="1">
        <HStack justifyContent="space-between" my="2">
          <HStack justifyItems={'center'}>
            <VStack justifyContent={'center'} ml="2">
              <Text color="black">
                Bluetooth Printer
              </Text>
            </VStack>
          </HStack>

          <Button
            onPress={handleBluetoothOpen}
            variant="subtle"
          >
            Buka
          </Button>
          <Button
            onPress={() => {}}
            variant="subtle"
          >
            Buka
          </Button>
        </HStack>
      </Box>
      <Center mt="5">
        <Text fontWeight="bold">kasirAja POS version 1.1.0</Text>
        <Button
          onPress={() => {
            setModalVisible(true)
          }}
          mt="5"
          _pressed={{ bg: 'muted.200' }}
          variant="outline"
        >
          Logout
        </Button>
      </Center>
      <TouchableWithoutFeedback
        onPress={() => {
          setCounter(counter > 15 ? 0 : counter + 1)
        }}
      >
        <Box flex={1} bg={counter >= 10 ? "muted.200" : "transparent"} w="100%" pt="10">
          {counter >= 10 && (
            <VStack>
              <Text fontWeight="bold" fontSize={48}>
                Author: {'Aji Kamaludin'}
              </Text>
              <Text fontWeight="bold" fontSize={48}>
                {'<aji19kamaludin @gmail.com>'}
              </Text>
            </VStack>
          )}
        </Box>
      </TouchableWithoutFeedback>
      <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
        <Modal.Content>
          <Modal.Header>
            <Text>Yakin ingin keluar ?</Text>
          </Modal.Header>

          <Modal.Footer>
            <Button.Group space={2}>
              <Button
                variant="ghost"
                colorScheme="blueGray"
                onPress={() => {
                  setModalVisible(false)
                }}
              >
                Batal
              </Button>
              <Button
                onPress={() => {
                  setModalVisible(false)
                  logout()
                }}
              >
                Ya
              </Button>
            </Button.Group>
          </Modal.Footer>
        </Modal.Content>
      </Modal>
      <BluetoothModal
        isOpen={blueModalVisible}
        setOpen={setBlueModalVisible}
      />
    </View>
  )
}