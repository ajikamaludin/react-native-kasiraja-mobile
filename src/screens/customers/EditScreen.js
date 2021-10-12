import React, { useCallback, useState } from 'react'
import {
  View,
  VStack,
  Input,
  Box,
  HStack,
  Button,
  FormControl,
  WarningOutlineIcon,
} from 'native-base'
import { useAuth } from '../../contexts/AppContext'
import { updateCustomer, deleteCustomer, getCustomer } from './Api'
import { useFocusEffect } from '@react-navigation/native'
import { ToastAndroid } from 'react-native'
import ModalLoading from '../../components/ModalLoading'
import ModalConfirm from '../../components/ModalConfirm'


export default function EditScreen({ navigation, route }) {
  const { id } = route.params
  const { user } = useAuth()
  const [isOpen, setOpen] = useState(false)
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
    updateCustomer(id, { name, phone, address, description }, user.accessToken)
      .then(() => {
        ToastAndroid.show('Pelanggan diubah', ToastAndroid.SHORT)
        navigation.goBack()
      })
      .catch((err) => {
        ToastAndroid.show(err?.message, ToastAndroid.SHORT)
      })
      .finally(() => setLoading(false))
  }

  const handleDelete = () => {
    setLoading(true)
    deleteCustomer(id, user.accessToken)
      .then(() => {
        ToastAndroid.show('Pelanggan dihapus', ToastAndroid.SHORT)
        navigation.goBack()
      })
      .catch((err) => {
        ToastAndroid.show(err?.message, ToastAndroid.SHORT)
      })
      .finally(() => setLoading(false))
  }

  useFocusEffect(useCallback(() => {
    setLoading(true)
    getCustomer(id, user.accessToken)
    .then(res => {
      const customer = res.customer
      setName(customer.name)
      setPhone(customer.phone)
      setAddress(customer.address)
      setDescription(customer.description)
    })
    .catch((err) => {
      ToastAndroid.show(err?.message, ToastAndroid.SHORT)
      navigation.goBack()
    })
    .finally(() => setLoading(false))
  }, [id]))

  return (
    <View flex={1} bgColor="white">
      <ModalLoading loading={loading} />
      <ModalConfirm isOpen={isOpen} setOpen={setOpen} onClose={handleDelete}/>
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
        <HStack space={1}>
          <Button
            w="50%"
            variant="outline"
            _pressed={{ bg: 'muted.200' }}
            onPress={() => setOpen(true)}
          >
            Hapus
          </Button>
          <Button w="50%" onPress={handleSubmit}>
            Simpan
          </Button>
        </HStack>
      </Box>
    </View>
  )
}
