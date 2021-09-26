import React from 'react'
import { Modal, Button, Input, Icon, Center, HStack, IconButton } from 'native-base'
import { AntDesign } from '@expo/vector-icons' 

export default function ModalItem({
  isOpen,
  setOpen,
  item,
  setItem,
  setSelected,
  removeItem,
}) {

  const setQuantity = (quantity) => {
    if(quantity <= 0) {
      return
    }
    setSelected({ ...item, quantity: +item.stock >= +quantity ? +quantity : +item.stock})
  }

  const setItemQuantity = (item) => {
    setItem(item)
  }

  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)} size="lg">
      <Modal.Content>
        <Modal.Header>
          {item?.name}
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Center>
            <HStack>
              <IconButton
                _pressed={{ bg: 'muted.300' }}
                onPress={() => setQuantity(+item?.quantity - 1)}
                icon={<Icon as={<AntDesign name="minussquareo" />} />}
              />
              <Input
                keyboardType="numeric"
                placeholder="quantity"
                textAlign="center"
                value={`${item?.quantity}`}
                onChangeText={(text) => setQuantity(text)}
              />
              <IconButton
                _pressed={{ bg: 'muted.300' }}
                onPress={() => setQuantity(+item?.quantity + 1)}
                icon={<Icon as={<AntDesign name="plussquareo" />} />}
              />
            </HStack>
          </Center>
        </Modal.Body>

        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                removeItem(item)
                setOpen(false)
              }}
            >
              Hapus
            </Button>
            <Button
              onPress={() => {
                setItemQuantity(item)
                setOpen(false)
              }}
            >
              Ok
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}
