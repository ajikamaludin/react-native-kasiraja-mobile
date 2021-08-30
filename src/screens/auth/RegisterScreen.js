import React, { useState, useEffect } from 'react'
import {
  Button,
  Text,
  Heading,
  VStack,
  FormControl,
  HStack,
  Input,
  Link,
  Alert,
  View,
} from 'native-base'
import Card from '../../components/Card'
import { useAuth } from '../../contexts/AppContext'
import { register } from './Api'
import { Keyboard } from 'react-native'
import SnackBar from 'react-native-snackbar-component'

export default function RegisterScreen(props) {
  const { navigation } = props

  const { user, isLoggedIn, persistUser } = useAuth()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)
  const [submit, setSubmit] = useState(false)
  const [status, setStatus] = useState(false)

  const handleSubmit = () => {
    Keyboard.dismiss()
    if (email === '' || password === '' || name === '') {
      setError({ message: 'nama, email dan password tidak boleh kosong' })
      return
    }
    if(submit) {
      return
    }
    setError(null)
    setSubmit(true)
    register({ name, email, password })
      .then((res) => {
        setStatus(true)
      })
      .catch((errors) => {
        setError(errors)
      })
      .finally(() => {
        setSubmit(false)
      })
  }

  useEffect(() => {
    if (isLoggedIn()) {
      navigation.navigate('Main')
    }
  }, [user])

  return (
    <View safeArea flex={1}>
      <Card w="90%" mx="auto">
        <Heading size="lg" color="primary.500">
          kasirAja
        </Heading>
        <Heading color="muted.400" size="xs">
          selamat datang daftar untuk mencoba
        </Heading>

        <VStack space={2} mt={5}>
          {error && (
            <Alert w="100%" status="warning">
              <Alert.Icon />
              <Alert.Description>{error.message}</Alert.Description>
            </Alert>
          )}
          <FormControl>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
            >
              nama toko
            </FormControl.Label>
            <Input
              color="black"
              value={name}
              onChangeText={(text) => setName(text)}
            />
          </FormControl>
          <FormControl>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
            >
              email
            </FormControl.Label>
            <Input
              color="black"
              value={email}
              onChangeText={(text) => setEmail(text)}
            />
          </FormControl>
          <FormControl mb={5}>
            <FormControl.Label
              _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
            >
              password
            </FormControl.Label>
            <Input
              type="password"
              color="black"
              value={password}
              onChangeText={(text) => setPassword(text)}
            />
          </FormControl>
          <VStack space={2}>
            <Button
              colorScheme="primary"
              _text={{ color: 'white' }}
              onPress={() => handleSubmit()}
              isLoading={submit}
            >
              daftar
            </Button>
          </VStack>
          <HStack justifyContent="center" mt={5}>
            <Text fontSize="sm" color="muted.700" fontWeight={400}>
              sudah punya akun,{' '}
            </Text>
            <Link
              variant="link"
              _text={{ color: 'primary.500', bold: true, fontSize: 'sm' }}
              onPress={() => {
                navigation.navigate('Login')
              }}
            >
              login ?
            </Link>
          </HStack>
        </VStack>
      </Card>
      <SnackBar
        visible={status}
        textMessage="pendaftaran berhasil silahkan login"
        actionHandler={() => {
          navigation.navigate('Login')
        }}
        actionText="login"
      />
    </View>
  )
}
