import React from "react"
import { Modal, Button, Text } from "native-base"

export default function ModalConfirm({ isOpen, setOpen, onClose }) {
  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <Modal.Content>
        <Modal.Header>
          <Text>Yakin ingin hapus ?</Text>
        </Modal.Header>

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
                onClose()
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