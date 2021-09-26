import React from 'react'
import { Modal, Button, Input } from 'native-base'

export default function ModalDiscount({ isOpen, setOpen, discount, setDiscount }) {
  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)} size="lg">
      <Modal.Content>
        <Modal.Header>
          Diskon
          <Modal.CloseButton />
        </Modal.Header>
        <Modal.Body>
          <Input
            keyboardType="numeric"
            placeholder="Diskon"
            flex={1}
            value={`${discount}`}
            onChangeText={(text) => setDiscount(text)}
            autoFocus={true}
          />
        </Modal.Body>

        <Modal.Footer>
          <Button.Group space={2}>
            <Button
              variant="ghost"
              colorScheme="blueGray"
              onPress={() => {
                setOpen(false)
              }}
            >
              Batal
            </Button>
            <Button
              onPress={() => {
                setOpen(false)
              }}
            >
              Ya
            </Button>
          </Button.Group>
        </Modal.Footer>
      </Modal.Content>
    </Modal>
  )
}