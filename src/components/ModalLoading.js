import React from "react"
import { Modal, Spinner } from "native-base"

export default function ModalLoading({ loading }) {
  return (
    <Modal isOpen={loading}>
      <Modal.Content rounded={0} w="60px" h="60px">
        <Modal.Body>
          <Spinner flex={1} size="lg" />
        </Modal.Body>
      </Modal.Content>
    </Modal>
  )
}