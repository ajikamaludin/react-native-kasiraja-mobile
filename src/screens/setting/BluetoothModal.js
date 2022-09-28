import React from 'react'
import { Modal, Button, Center, HStack } from 'native-base'

export default function BluetoothModal({
  isOpen,
  setOpen,
}) {


  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)} size="lg">
      <Modal.Content>
        <Modal.Header>
          "Name"
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Center>
            <HStack>
              {/*  */}
            </HStack>
          </Center>
        </Modal.Body>

        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              onPress={() => {
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
