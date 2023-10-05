import { ArrowBackIcon, CloseIcon } from '@chakra-ui/icons';
import {
  IconButton,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';

import { useBackgroundNavigate } from '../../hooks';

export function Modal() {
  const { isFullSizeModal, onCloseModal } = useBackgroundNavigate();

  return (
    <ModalContent>
      <ModalHeader>User</ModalHeader>
      <IconButton
        icon={isFullSizeModal ? <ArrowBackIcon /> : <CloseIcon />}
        variant="unstyled"
        aria-label={''}
        position="absolute"
        size="sm"
        top="2"
        right="3.5"
        onClick={() => onCloseModal()}
      />

      <ModalBody></ModalBody>
    </ModalContent>
  );
}
