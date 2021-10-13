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
  HStack,
} from 'native-base'

import { MaterialCommunityIcons } from '@expo/vector-icons'
import { getProduct, updateProduct, deleteProduct } from './Api'
import { useAuth, useTempStore } from '../../contexts/AppContext'
import { ToastAndroid } from 'react-native'
import ModalLoading from '../../components/ModalLoading'
import BarcodeScanScreen from './BarcodeScanModal'
import { formatIDR } from '../../utils'
import ModalConfirm from '../../components/ModalConfirm'

export default function EditScreen({ navigation, route }) {
  const { id } = route.params
  const { user } = useAuth()
  const { temp } = useTempStore()
  const [loading, setLoading] = useState(false)
  const [isInvalid, setIsInvalid] = useState(false)
  const [isScan, setScanOpen] = useState(false)
  const [isOpen, setOpen] = useState(false)

  const [code, setCode] = useState(`BR${new Date().getTime()}`)
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
    updateProduct(id,
      {
        code,
        name,
        description,
        cost,
        price,
        stock,
        category_id: category ? category.id : '',
      },
      user.accessToken
    )
      .then(() => {
        ToastAndroid.show('Produk diubah', ToastAndroid.SHORT)
        navigation.goBack()
      })
      .catch((err) => {
        ToastAndroid.show(err?.message, ToastAndroid.SHORT)
      })
      .finally(() => setLoading(false))
  }

  const handleDelete = () => {
    setLoading(true)
    deleteProduct(id, user.accessToken)
      .then(() => {
        ToastAndroid.show('product dihapus', ToastAndroid.SHORT)
      })
      .catch((err) => {
        ToastAndroid.show(err?.message, ToastAndroid.SHORT)
      })
      .finally(() => {
        setLoading(false)
        navigation.goBack()
      })
  }

  useEffect(() => {
    setCategory(temp?.category)
  }, [temp])

  useEffect(() => {
    setLoading(true)
    getProduct(id, user.accessToken).then((res) => {
      const product = res.product
      setName(product.name)
      setCode(product.code)
      setCost(product.cost)
      setPrice(product.price)
      setDescription(product.description)
      setStock(product.stock)
      setCategory({name: product.category_name, id: product.category_id})
    }).catch(err => {
      ToastAndroid.show(err?.message, ToastAndroid.SHORT)
      navigation.goBack()
    }).finally(() => setLoading(false))
  }, [id])

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
                  icon={<MaterialCommunityIcons name="barcode" size={24} color="black"/>}
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
              value={formatIDR(cost)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Harga Jual</FormControl.Label>
            <Input
              variant="outline"
              placeholder="Harga jual"
              keyboardType="number-pad"
              onChangeText={(text) => setPrice(text)}
              value={formatIDR(price)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label>Stok</FormControl.Label>
            <Input
              variant="outline"
              placeholder="stok"
              keyboardType="number-pad"
              onChangeText={(text) => setStock(text)}
              value={formatIDR(stock)}
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
      <ModalConfirm isOpen={isOpen} setOpen={setOpen} onClose={handleDelete} />
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
