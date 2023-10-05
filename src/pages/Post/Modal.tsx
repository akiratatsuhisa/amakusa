import { CloseIcon, Icon } from '@chakra-ui/icons';
import {
  Box,
  Button,
  Flex,
  IconButton,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  Text,
  Textarea,
} from '@chakra-ui/react';
import { doc, serverTimestamp, setDoc } from 'firebase/firestore';
import { ref, uploadBytes } from 'firebase/storage';
import { useEffect, useState } from 'react';
import { MdOutlineBrokenImage } from 'react-icons/md';
import { v4 as uuidv4 } from 'uuid';

import { useAuth } from '../../contexts';
import { firestore, storage } from '../../firebase';
import { useBackgroundNavigate, useFileDialog } from '../../hooks';
import { CropperImageModal } from './CropperImageModal';
import { IMedia } from './interfaces';
import { Media, MediaInput } from './Media';

export function Modal() {
  const { onCloseModal } = useBackgroundNavigate();
  const [medias, setMedias] = useState<Array<IMedia>>([]);

  function addMedia(blob: Blob) {
    const media = { id: uuidv4(), blob };
    setMedias((prev) => [...prev, media]);
    return media;
  }

  function onRemoveMedia(id: string) {
    setMedias((prev) => prev.filter((media) => media.id !== id));
  }

  function onUpdateMedia(updateMedia: IMedia) {
    setMedias((prev) =>
      prev.map((media) =>
        media.id !== updateMedia.id ? media : { ...updateMedia },
      ),
    );
  }

  const [selectedMedia, setSelectedMedia] = useState<IMedia>();

  function onOpenCropperModal(media: IMedia) {
    setSelectedMedia(media);
  }

  function onCloseCropperModal() {
    setSelectedMedia(undefined);
  }

  const { files, open } = useFileDialog({
    accept: 'image/png, image/jpeg',
  });
  useEffect(() => {
    const file = files?.[0];
    if (!file || !/image\/(png|jpe?g)/.test(file.type)) {
      return;
    }

    const media = addMedia(file);
    onOpenCropperModal(media);
  }, [files]);

  const { currentUser } = useAuth();
  const [description, setDescription] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  async function onSubmit() {
    if (!medias.length || isLoading) {
      return;
    }
    setIsLoading(true);

    try {
      const mediaPaths = await Promise.all(
        medias.map(async (media) => {
          const path = `images/${media.id}.jpg`;
          const imageRef = ref(storage, path);
          await uploadBytes(imageRef, media.blob);
          return path;
        }),
      );

      const postDoc = doc(firestore, 'posts', uuidv4());
      await setDoc(postDoc, {
        description: description.trim(),
        ownerRef: doc(firestore, 'users', currentUser!.uid),
        medias: mediaPaths,
        publishedAt: serverTimestamp(),
      });

      onCloseModal();
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <>
      <ModalContent>
        <ModalHeader>Create a Post</ModalHeader>
        <IconButton
          icon={<CloseIcon />}
          variant="unstyled"
          aria-label={''}
          position="absolute"
          size="sm"
          top="2"
          right="3.5"
          onClick={() => onCloseModal()}
        />

        <ModalBody>
          <Button
            leftIcon={<Icon as={MdOutlineBrokenImage} />}
            backgroundColor="teal.500"
            _hover={{ backgroundColor: isLoading ? 'teal.500' : 'teal.600' }}
            isLoading={isLoading}
            onClick={() => open()}
          >
            Select File
          </Button>
          <Box overflowX="auto">
            <Flex gap="3" paddingY="3">
              <MediaInput
                isLoading={isLoading}
                onSubmit={(blob) => {
                  const media = addMedia(blob);
                  onOpenCropperModal(media);
                }}
              />
              {medias.map((media) => (
                <Media
                  key={media.id}
                  isLoading={isLoading}
                  media={media}
                  onSelectMedia={setSelectedMedia}
                  onRemoveMedia={onRemoveMedia}
                />
              ))}
            </Flex>
          </Box>

          <Box marginY="3">
            <Text marginBottom="2">Description</Text>
            <Textarea
              isDisabled={isLoading}
              placeholder="Write a story here..."
              value={description}
              onInput={(event) =>
                setDescription((event.target as HTMLTextAreaElement).value)
              }
            />
          </Box>
        </ModalBody>

        <ModalFooter>
          <Button isLoading={isLoading} onClick={onSubmit}>
            Post
          </Button>
        </ModalFooter>
      </ModalContent>

      <CropperImageModal
        selectedImage={selectedMedia}
        onClose={onCloseCropperModal}
        onUpdateMedia={onUpdateMedia}
      />
    </>
  );
}
