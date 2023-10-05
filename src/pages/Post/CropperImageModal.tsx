import 'react-mobile-cropper/dist/style.css';
import './CropperImageModal.css';

import { CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  IconButton,
  Modal,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from '@chakra-ui/react';
import { useEffect, useRef, useState } from 'react';
import { Cropper, CropperRef } from 'react-mobile-cropper';

import { IMedia } from './interfaces';

export interface ICropperImageModalProps {
  selectedImage?: { id: string; blob: Blob };
  onClose(): void;
  onUpdateMedia(media: IMedia): void;
}

export function CropperImageModal({
  selectedImage,
  onClose,
  onUpdateMedia,
}: ICropperImageModalProps) {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [src, setSrc] = useState<string>();

  useEffect(() => {
    if (!selectedImage) {
      return;
    }
    const url = URL.createObjectURL(selectedImage.blob);
    setSrc(url);

    return () => {
      URL.revokeObjectURL(url);
      setSrc(undefined);
    };
  }, [selectedImage]);

  const cropperRef = useRef<CropperRef | null>(null);

  async function onSubmit() {
    try {
      setIsLoading(true);
      if (isLoading || !selectedImage || !cropperRef.current) {
        return;
      }

      const blob = await new Promise<Blob>(
        (resolve) =>
          cropperRef.current
            ?.getCanvas()
            ?.toBlob((blob) => resolve(blob!), 'image.png') ??
          selectedImage.blob,
      );

      onUpdateMedia({
        id: selectedImage.id,
        blob,
      });
      onClose();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Modal size="full" isOpen={selectedImage !== undefined} onClose={onClose}>
      <ModalOverlay />

      <ModalContent>
        <ModalHeader>Edit image</ModalHeader>
        <IconButton
          icon={<CloseIcon />}
          variant="unstyled"
          aria-label={''}
          position="absolute"
          size="sm"
          top="2"
          right="3.5"
          onClick={onClose}
        />

        <Box height="calc(100vh - 134px)">
          {src && <Cropper ref={cropperRef} src={src} className={'cropper'} />}
        </Box>
        <ModalFooter gap="2">
          <Button
            isLoading={isLoading}
            backgroundColor="green.500"
            _hover={{ backgroundColor: 'green.600' }}
            onClick={onClose}
          >
            No Change
          </Button>
          <Button
            isLoading={isLoading}
            backgroundColor="blue.500"
            _hover={{ backgroundColor: 'blue.600' }}
            onClick={onSubmit}
          >
            Edit Image
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
}
