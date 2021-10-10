import React from 'react'
import { Box, Button, VStack, HStack, IconButton } from 'native-base'
import { Feather } from '@expo/vector-icons' 

export default function Numpad({ amount, setAmount, total, onNext }) {

  const onPressButton = (val, opt = null) => {
    if(typeof(opt) != "string") {
      setAmount(`${amount}${val}`)
    }else{
      if(opt === 'c') {
        setAmount(0)
      }
      if(opt === 'remove') {
        setAmount(amount.slice(0, -1))
      }
    }
  }

  const canNext = total <= amount

  return (
    <Box mt={'48'}>
      <HStack justifyContent="space-between">
        <VStack>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: 'bold' }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
            onPress={() => onPressButton(1)}
          >
            1
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: 'bold' }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
            onPress={() => onPressButton(4)}
          >
            4
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: 'bold' }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
            onPress={() => onPressButton(7)}
          >
            7
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: 'bold' }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
            onPress={() => onPressButton(0, 'c')}
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
            _text={{ color: 'black', fontWeight: 'bold' }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
            onPress={() => onPressButton(2)}
          >
            2
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: 'bold' }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
            onPress={() => onPressButton(5)}
          >
            5
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: 'bold' }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
            onPress={() => onPressButton(8)}
          >
            8
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: 'bold' }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
            onPress={() => onPressButton(0)}
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
            _text={{ color: 'black', fontWeight: 'bold' }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
            onPress={() => onPressButton(3)}
          >
            3
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: 'bold' }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
            onPress={() => onPressButton(6)}
          >
            6
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: 'bold' }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
            onPress={() => onPressButton(9)}
          >
            9
          </Button>
          <Button
            px={10}
            py={5}
            rounded="0"
            bgColor="white"
            _text={{ color: 'black', fontWeight: 'bold' }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.100' }}
            onPress={() => onPressButton('000')}
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
            onPress={() => onPressButton(0, 'remove')}
            icon={<Feather name="delete" size={24} color="#e5e5e5" />}
          />
          <Button
            px={9}
            py={'53px'}
            rounded="0"
            bgColor={canNext ? 'primary.500' : 'muted.200'}
            _text={{ color: 'white', fontWeight: 'bold' }}
            borderWidth="1"
            borderColor="muted.100"
            _pressed={{ bgColor: 'muted.300' }}
            disabled={!canNext}
            onPress={onNext}
          >
            Lanjut
          </Button>
        </VStack>
      </HStack>
    </Box>
  )
}