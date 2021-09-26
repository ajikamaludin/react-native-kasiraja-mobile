import React from 'react'
import { Modal, Text, Button }  from 'native-base'

export default function ModalDelete({isOpen, setOpen, handleDelete}) {
  return (
    <Modal isOpen={isOpen} onClose={() => setOpen(false)}>
      <Modal.Content>
        <Modal.Header>
          <Text>Yakin hapus pesanan ?</Text>
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
                handleDelete()
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