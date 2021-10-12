import React, { useState, useEffect } from 'react'
import {
  View,
  VStack,
  Input,
  Box,
  Button,
  FormControl,
  WarningOutlineIcon,
  IconButton,
  ScrollView,
} from 'native-base'

import { MaterialCommunityIcons } from '@expo/vector-icons' 
import { createProduct } from './Api'
import { useAuth, useTempStore } from '../../contexts/AppContext'
import { ToastAndroid } from 'react-native'
import ModalLoading from '../../components/ModalLoading'
import BarcodeScanScreen from './BarcodeScanModal'

export default function CreateScreen({ navigation }) {
  const { user } = useAuth()
  const { temp } = useTempStore()
  const [loading, setLoading] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isScan, setScanOpen] = useState(false)

  const [code, setCode] = useState(`BR${(new Date().getTime())}`)
  const [name, setName] = useState('')
  const [description, setDescription] = useState('')
  const [cost, setCost] = useState(0)
  const [price, setPrice] = useState(0)
  const [stock, setStock] = useState(0)
  const [category, setCategory] = useState(null)

  const handleSubmit = () => {
    if (name.length <= 0) {
      setIsInvalid(true)
      return 
    }
    setLoading(true)
    createProduct({
      code,
      name,
      description,
      cost,
      price,
      stock,
      category_id: category ? category.id : '',
    }, user.accessToken)
      .then(() => {
        ToastAndroid.show('Produk ditambahkan', ToastAndroid.SHORT)
        navigation.goBack()
      })
      .catch((err) => {
        ToastAndroid.show(err?.message, ToastAndroid.SHORT)
      })
      .finally(() => setLoading(false))
  }

  useEffect(() => {
    setCategory(temp?.category)
  }, [temp])

  return (
    <View flex={1} bgColor="white">
      <ScrollView>
        <VStack space={1} maxHeight={'100%'} p={4} mb={32}>
          <FormControl>
            <FormControl.Label>Kode</FormControl.Label>
            <Input
              variant="outline"
              placeholder="Kode"
              onChangeText={(text) => setCode(text)}
              value={code}
              InputRightElement={
                <IconButton
                  variant="outline"
                  borderColor="muted.100"
                  _pressed={{ bg: 'muted.200' }}
                  icon={<MaterialCommunityIcons name="barcode" size={24} />}
                  onPress={() => setScanOpen(true)}
                />
              }
            />
          </FormControl>
          <FormControl isInvalid={isInvalid}>
            <FormControl.Label>Nama</FormControl.Label>
            <Input
              variant="outline"
              placeholder="nama"
              onChangeText={(text) => setName(text)}
              value={name}
            />
            <FormControl.ErrorMessage
              leftIcon={<WarningOutlineIcon size="xs" />}
            >
              nama wajib diisi
            </FormControl.ErrorMessage>
          </FormControl>
          <FormControl>
            <FormControl.Label>Deskripsi</FormControl.Label>
            <Input
              variant="outline"
              placeholder="Deskripsi"
              onChangeText={(text) => setDescription(text)}
              value={description}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Harga Beli</FormControl.Label>
            <Input
              variant="outline"
              placeholder="Harga beli"
              keyboardType="number-pad"
              onChangeText={(text) => setCost(text)}
              value={cost}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Harga Jual</FormControl.Label>
            <Input
              variant="outline"
              placeholder="Harga jual"
              keyboardType="number-pad"
              onChangeText={(text) => setPrice(text)}
              value={price}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Stok</FormControl.Label>
            <Input
              variant="outline"
              placeholder="stok"
              keyboardType="number-pad"
              onChangeText={(text) => setStock(text)}
              value={stock}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Kategori</FormControl.Label>
            <Input
              variant="outline"
              placeholder="Kategori"
              value={category?.name}
              onFocus={() => {
                navigation.navigate('SelectionCategoryScreen')
              }}
            />
          </FormControl>
        </VStack>
      </ScrollView>
      <ModalLoading loading={loading} />
      <BarcodeScanScreen
        isOpen={isScan}
        setOpen={setScanOpen}
        onScanned={setCode}
      />
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
