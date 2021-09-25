import React, { useState } from 'react'
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
} from 'native-base'
import Card from '../../components/Card'
import { login } from './Api'
import { useAuth } from '../../contexts/AppContext'
import { Keyboard } from 'react-native'

export default function LoginScreen(props) {
  const { navigation } = props

  const { persistUser } = useAuth()

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [error, setError] = useState(null)
  const [submit, setSubmit] = useState(false)

  const handleSubmit = () => {
    Keyboard.dismiss()
    if (email === '' || password === '') {
      setError({message: 'email dan password tidak boleh kosong'})
      return
    }
    if (submit) {
      return
    }
    setError(null)
    setSubmit(true)
    login({email, password})
    .then((res) => {
      const { data } = res
      persistUser({
        ...data.user,
        accessToken: data.accessToken,
        refreshToken: data.refreshToken,
      })
    })
    .catch(errors => {
      setError(errors)
    })
    .finally(() => {
      setSubmit(false)
    })
  }

  return (
    <Card safeArea w="90%" mx="auto">
      <Heading size="lg" color="primary.500">
        kasirAja
      </Heading>
      <Heading color="muted.400" size="xs">
        selamat datang masuk untuk lanjut
      </Heading>

      <VStack space={2} mt={5}>
        {error && (
          <Alert w="100%" status="warning">
            <HStack space={2} flexShrink={1} alignItems="center">
              <Alert.Icon />
              <Text>{error?.message}</Text>
            </HStack>
          </Alert>
        )}
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
            color="black"
            type="password"
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
            login
          </Button>
        </VStack>
        <HStack justifyContent="center" mt={5}>
          <Text fontSize="sm" color="muted.700" fontWeight={400}>
            ingin mencoba,{' '}
          </Text>
          <Link
            variant="link"
            _text={{ color: 'primary.500', bold: true, fontSize: 'sm' }}
            onPress={() => {
              navigation.navigate('Register')
            }}
          >
            daftar ?
          </Link>
        </HStack>
      </VStack>
    </Card>
  )
}