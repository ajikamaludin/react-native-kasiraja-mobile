import React, { useState } from 'react'
import { View, Text, Button, Avatar, Box, HStack, VStack, Center, Modal } from 'native-base'
import { useAuth } from '../../contexts/AppContext'

export default function ProfileScreen({ navigation }) {
  const [modalVisible, setModalVisible] = useState(false)
  const { user, logout } = useAuth()

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
              <Text color="black" fontWeight="bold">{user?.name}</Text>
              <Text color="black">{user?.email}</Text>
            </VStack>
          </HStack>

          <Button onPress={() => {
            navigation.navigate('EditUserScreen', {
              id: user.id,
              user_name: user.name,
              user_email: user.email,
              isCanDelete: false,
            })
          }}>Atur Akun</Button>
        </HStack>
      </Box>
      <Center mt="5">
        <Text fontWeight="bold">kasirAja POS version 1.0.0</Text>
        <Button
          onPress={() => {
            setModalVisible(true)
          }}
          mt="5"
          _pressed={{bg: "muted.200"}}
          variant="outline"
        >
          Logout
        </Button>
      </Center>
      <Modal
        isOpen={modalVisible}
        onClose={() => setModalVisible(false)}
      >
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
    </View>
  )
}