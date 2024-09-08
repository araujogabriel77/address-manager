import { Modal, ModalHeader, ModalBody, ModalFooter, Button, ModalContent } from '@nextui-org/react';

interface ConfirmationModalProps {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
}

export default function ConfirmationModal({ visible, onClose, onConfirm, title, message }: ConfirmationModalProps) {
  return (
    <Modal
      backdrop="blur"
      isOpen={visible}
      onClose={onClose}
      aria-labelledby="confirmation-modal-title"
    >
      <ModalContent>
        <ModalHeader>
          <h2 id="confirmation-modal-title">{title}</h2>
        </ModalHeader>
        <ModalBody>
          <p>{message}</p>
        </ModalBody>
        <ModalFooter>
          <Button color="danger" onClick={onConfirm}>
            Sim
          </Button>
          <Button color="default" onClick={onClose}>
            Não
          </Button>
        </ModalFooter>
       </ModalContent>
    </Modal>
  );
};