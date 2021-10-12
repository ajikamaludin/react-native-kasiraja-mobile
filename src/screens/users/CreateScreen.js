import React, { useState } from 'react'
import {
  View,
  VStack,
  Input,
  Box,
  Button,
  FormControl,
  WarningOutlineIcon,
} from 'native-base'
import { useAuth } from '../../contexts/AppContext'
import { createUser } from './Api'
import { ToastAndroid } from 'react-native'
import ModalLoading from '../../components/ModalLoading'

export default function CreateScreen({ navigation }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSubmit = () => {
    if (name.length <= 0) {
      setIsInvalid(true)
      return
    }
    setLoading(true)
    createUser({ name, email, password }, user.accessToken)
      .then(() => {
        ToastAndroid.show('Pengguna ditambahkan', ToastAndroid.SHORT)
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
        <Button onPress={handleSubmit}>Simpan</Button>
      </Box>
    </View>
  )
}
