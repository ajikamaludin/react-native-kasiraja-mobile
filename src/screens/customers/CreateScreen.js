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
import { createCustomer } from './Api'
import { ToastAndroid } from 'react-native'
import ModalLoading from '../../components/ModalLoading'

export default function CreateScreen({ navigation }) {
  const { user } = useAuth()
  const [loading, setLoading] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [name, setName] = useState('')
  const [phone, setPhone] = useState('')
  const [address, setAddress] = useState('')
  const [description, setDescription] = useState('')

  const handleSubmit = () => {
    if (name.length <= 0) {
      setIsInvalid(true)
      return 
    }
    setLoading(true)
    createCustomer({ name, phone, address, description }, user.accessToken)
      .then(() => {
        ToastAndroid.show('Pelanggan ditambahkan', ToastAndroid.SHORT)
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
          <FormControl.Label>No. HP</FormControl.Label>
          <Input
            variant="outline"
            placeholder="no. HP"
            onChangeText={(text) => setPhone(text)}
            value={phone}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Alamat</FormControl.Label>
          <Input
            variant="outline"
            placeholder="alamat"
            onChangeText={(text) => setAddress(text)}
            value={address}
          />
        </FormControl>
        <FormControl>
          <FormControl.Label>Keterangan</FormControl.Label>
          <Input
            variant="outline"
            placeholder="keterangan"
            onChangeText={(text) => setDescription(text)}
            value={description}
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
