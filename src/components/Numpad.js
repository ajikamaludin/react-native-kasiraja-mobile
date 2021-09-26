import React from 'react'
import { Box, Button, VStack, HStack, IconButton } from 'native-base'
import { Feather } from '@expo/vector-icons' 

export default function Numpad() {
  return (
    <Box position="absolute" bottom="0" left="0" right="0">
      <HStack justifyContent="space-between">
        <VStack>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: "bold" }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
          >
            1
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: "bold" }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
          >
            4
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: "bold" }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
          >
            7
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: "bold" }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
          >
            C
          </Button>
        </VStack>
        <VStack>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: "bold" }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
          >
            2
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: "bold" }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
          >
            5
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: "bold" }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
          >
            8
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: "bold" }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
          >
            0
          </Button>
        </VStack>
        <VStack>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: "bold" }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
          >
            3
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: "bold" }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
          >
            6
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: "bold" }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
          >
            9
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: "bold" }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
          >
            000
          </Button>
        </VStack>
        <VStack>
          <IconButton
            px={9}
            py={12}
            rounded="0"
            bgColor="white"
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
            icon={<Feather name="delete" size={24} color="#e5e5e5" />}
          />
          <Button
            px={9}
            py={'53px'}
            rounded="0"
            bgColor="muted.200"
            _text={{ color: 'black', fontWeight: "bold" }}
            borderWidth="1"
            borderColor="muted.100"
          >
            Lanjut
          </Button>
        </VStack>
      </HStack>
    </Box>
  )
}