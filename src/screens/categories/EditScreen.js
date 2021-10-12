import React, { useState } from 'react'
import {
  View,
  VStack,
  Input,
  Box,
  Button,
  FormControl,
  WarningOutlineIcon,
  HStack,
} from 'native-base'
import { useAuth } from '../../contexts/AppContext'
import { deleteCategory, updateCategory } from './Api'
import { ToastAndroid } from 'react-native'
import ModalLoading from '../../components/ModalLoading'
import ModalConfirm from '../../components/ModalConfirm'

export default function EditScreen({ navigation, route }) {
  const { id, value } = route.params
  const { user } = useAuth()
  const [isOpen, setOpen] = useState(false)
  const [loading, setLoading] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [name, setName] = useState(value)

  const handleSubmit = () => {
    if (name.length <= 0) {
      setIsInvalid(true)
      return
    }
    setLoading(true)
    updateCategory(id, { name }, user.accessToken)
      .then(() => {
        ToastAndroid.show('Kategori diubah', ToastAndroid.SHORT)
        navigation.goBack()
      })
      .catch((err) => {
        ToastAndroid.show(err?.message, ToastAndroid.SHORT)
      })
      .finally(() => setLoading(false))
  }

  const handleDelete = () => {
    setLoading(true)
    deleteCategory(id, user.accessToken)
      .then(() => {
        ToastAndroid.show('Kategori dihapus', ToastAndroid.SHORT)
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
          <Button w="50%" variant="outline" _pressed={{ bg: "muted.200" }} onPress={() => setOpen(true)}>Hapus</Button>
          <Button w="50%" onPress={handleSubmit}>Simpan</Button>
        </HStack>
      </Box>
    </View>
  )
}
