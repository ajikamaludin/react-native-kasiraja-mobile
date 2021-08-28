import React from 'react'
import {
  Button,
  Text,
  Heading,
  VStack,
  FormControl,
  HStack,
  Input,
  Link,
} from 'native-base'
import Card from '../../components/Card'
export default function RegisterScreen(props) {
  const { navigation } = props
  return (
    <Card safeArea w="90%" mx="auto">
      <Heading size="lg" color="primary.500">
        kasirAja
      </Heading>
      <Heading color="muted.400" size="xs">
        selamat datang masuk untuk lanjut
      </Heading>

      <VStack space={2} mt={5}>
        <FormControl>
          <FormControl.Label
            _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
          >
            nama toko
          </FormControl.Label>
          <Input />
        </FormControl>
        <FormControl>
          <FormControl.Label
            _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
          >
            email
          </FormControl.Label>
          <Input />
        </FormControl>
        <FormControl mb={5}>
          <FormControl.Label
            _text={{ color: 'muted.700', fontSize: 'sm', fontWeight: 600 }}
          >
            password
          </FormControl.Label>
          <Input type="password" />
        </FormControl>
        <VStack space={2}>
          <Button colorScheme="primary" _text={{ color: 'white' }}>
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
  )
}
