import React, { useState } from 'react'
import {
  View,
  VStack,
  HStack,
  Input,
  Box,
  Button,
  FormControl,
  WarningOutlineIcon,
} from 'native-base'
import { useAuth } from '../../contexts/AppContext'
import { updateUser, deleteUser, getUser } from './Api'
import { ToastAndroid } from 'react-native'
import ModalLoading from '../../components/ModalLoading'
import ModalConfirm from '../../components/ModalConfirm'

export default function EditScreen({ navigation, route }) {
  const { id, user_name, user_email, isCanDelete = true } = route.params
  const { user } = useAuth()
  const [isOpen, setOpen] = useState('')
  const [loading, setLoading] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [name, setName] = useState(user_name)
  const [email, setEmail] = useState(user_email)
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (name.length <= 0) {
      setIsInvalid(true)
      return
    }
    setLoading(true)
    updateUser(id, { name, email, password }, user.accessToken)
      .then(() => {
        ToastAndroid.show('Pengguna diubah', ToastAndroid.SHORT)
        navigation.goBack()
      })
      .catch((err) => {
        ToastAndroid.show(err?.message, ToastAndroid.SHORT)
      })
      .finally(() => setLoading(false))
  }

  const handleDelete = () => {
    setLoading(true)
    deleteUser(id, user.accessToken)
      .then(() => {
        ToastAndroid.show('Pengguna dihapus', ToastAndroid.SHORT)
        navigation.goBack()
      })
      .catch((err) => {
        ToastAndroid.show(err?.message, ToastAndroid.SHORT)
      })
      .finally(() => setLoading(false))
  }

  return (
    <View flex={1} bgColor="white">
      <ModalLoading loading={loading} />
      <ModalConfirm isOpen={isOpen} setOpen={setOpen} onClose={handleDelete} />
      <VStack space={1} maxHeight={'100%'} p={4}>
        <FormControl isInvalid={isInvalid}>
          <FormControl.Label>Nama</FormControl.Label>
          <Input
            variant="outline"
            placeholder="nama"
            onChangeText={(text) => setName(text)}
            value={name}
          />
          <FormControl.ErrorMessage leftIcon={<WarningOutlineIcon size="xs" />}>
            nama wajib diisi
          </FormControl.ErrorMessage>
        </FormControl>
        <FormControl>
          <FormControl.Label>Email</FormControl.Label>
          <Input
            variant="outline"
            placeholder="email"
            onChangeText={(text) => setEmail(text)}
            value={email}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Password</FormControl.Label>
          <Input
            variant="outline"
            placeholder="password"
            onChangeText={(text) => setPassword(text)}
            value={password}
          />
        </FormControl>
      </VStack>
      <Box
        position="absolute"
        bottom="0"
        right="0"
        bgColor="white"
        p={4}
        width="100%"
        shadow={6}
      >
        <HStack space={1}>
          {isCanDelete && (
            <Button
              w="50%"
              variant="outline"
              _pressed={{ bg: 'muted.200' }}
              onPress={() => setOpen(true)}
            >
              Hapus
            </Button>
          )}
          <Button w={isCanDelete ? "50%" : "100%"} onPress={handleSubmit}>
            Simpan
          </Button>
        </HStack>
      </Box>
    </View>
  )
}
