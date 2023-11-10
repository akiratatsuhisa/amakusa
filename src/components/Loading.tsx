import { ArrowBackIcon, CloseIcon } from '@chakra-ui/icons';
import {
  CircularProgress,
  Flex,
  IconButton,
  ModalBody,
  ModalContent,
  ModalHeader,
} from '@chakra-ui/react';

import { useBackgroundNavigate } from '../hooks';

export function PageLoading() {
  return (
    <Flex height="100vh" justifyContent="center" alignItems="center">
      <CircularProgress isIndeterminate size="100px" color="teal.400" />
    </Flex>
  );
}

export function ModalLoading() {
  const { isFullSizeModal, onCloseModal } = useBackgroundNavigate();

  return (
    <ModalContent>
      <ModalHeader>Loading</ModalHeader>
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
      <ModalBody padding="0">
        <Flex
          height={isFullSizeModal ? 'calc(100vh - 62px)' : '60'}
          justifyContent="center"
          alignItems="center"
        >
          <CircularProgress isIndeterminate color="teal.400" />
        </Flex>
      </ModalBody>
    </ModalContent>
  );
}
