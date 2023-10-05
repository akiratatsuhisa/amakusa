import { EditIcon, Icon, SmallCloseIcon } from '@chakra-ui/icons';
import {
  AspectRatio,
  Box,
  Flex,
  IconButton,
  Image,
  Text,
} from '@chakra-ui/react';
import { useEffect, useState } from 'react';
import { MdOutlineBrokenImage } from 'react-icons/md';

import { IMedia } from './interfaces';

export interface IMediaInputProps {
  isLoading?: boolean;
  onSubmit(blob: Blob): void;
}

export function MediaInput({ isLoading, onSubmit }: IMediaInputProps) {
  const [isDropOver, setIsDropOver] = useState(false);

  function handleDrop(event: React.DragEvent<HTMLDivElement>): void {
    event.preventDefault();
    setIsDropOver(false);
    const file = event.dataTransfer.files?.[0];

    if (!file || !/image\/(png|jpe?g)/.test(file.type)) {
      return;
    }

    onSubmit(file);
  }

  if (isLoading) {
    return (
      <AspectRatio ratio={1} width="36" flexShrink="0">
        <Flex
          borderRadius="2xl"
          borderStyle="dashed"
          borderWidth="medium"
          borderColor="teal.700"
          alignItems="center"
          justifyContent="center"
        >
          <Icon as={MdOutlineBrokenImage} fontSize="3xl" color="teal.700" />
        </Flex>
      </AspectRatio>
    );
  }

  return (
    <Box
      onDragEnter={() => setIsDropOver(true)}
      onDragLeave={() => setIsDropOver(false)}
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
    >
      <AspectRatio ratio={1} width="36" flexShrink="0">
        <Flex
          borderRadius="2xl"
          borderStyle="dashed"
          borderWidth="medium"
          borderColor="teal.400"
          alignItems="center"
          justifyContent="center"
          backdropFilter={isDropOver ? 'auto' : undefined}
          backdropContrast={isDropOver ? '80%' : undefined}
        >
          {isDropOver ? (
            <Text color="teal.500" fontWeight="medium">
              Drop Here
            </Text>
          ) : (
            <Icon as={MdOutlineBrokenImage} fontSize="3xl" color="teal.400" />
          )}
        </Flex>
      </AspectRatio>
    </Box>
  );
}

export interface IMediaProps {
  isLoading?: boolean;
  media: IMedia;
  onSelectMedia(media: IMedia): void;
  onRemoveMedia(id: string): void;
}

export function Media({
  isLoading,
  media,
  onSelectMedia,
  onRemoveMedia,
}: IMediaProps) {
  const [isHovering, setIsHovering] = useState(false);
  const [src, setSrc] = useState<string>('');

  useEffect(() => {
    const url = URL.createObjectURL(media.blob);
    setSrc(url);

    return () => URL.revokeObjectURL(url);
  }, [media]);

  function handleEnter() {
    setIsHovering(true);
  }

  function handleLeave() {
    setIsHovering(false);
  }

  return (
    <Box
      position="relative"
      onMouseEnter={handleEnter}
      onMouseLeave={handleLeave}
      onTouchStart={handleEnter}
      onTouchCancel={handleLeave}
    >
      <AspectRatio ratio={1} width="36" flexShrink="0">
        <Image borderRadius="2xl" objectFit="cover" src={src} />
      </AspectRatio>
      {!isLoading && isHovering && (
        <Flex
          borderRadius="2xl"
          position="absolute"
          top="0"
          bottom="0"
          left="0"
          right="0"
          justifyContent="center"
          alignItems="center"
          backdropFilter="auto"
          backdropContrast="50%"
        >
          <IconButton
            backgroundColor="teal.500"
            _hover={{ backgroundColor: 'teal.600' }}
            icon={<EditIcon />}
            aria-label=""
            onClick={() => onSelectMedia(media)}
          />
        </Flex>
      )}
      {isLoading ? (
        <IconButton
          as={SmallCloseIcon}
          backgroundColor="teal.800"
          _hover={{ backgroundColor: 'teal.800' }}
          size="xs"
          position="absolute"
          top="-8px"
          right="-8px"
          aria-label=""
        />
      ) : (
        <IconButton
          as={SmallCloseIcon}
          backgroundColor="teal.500"
          _hover={{ backgroundColor: 'teal.600' }}
          size="xs"
          position="absolute"
          top="-8px"
          right="-8px"
          aria-label=""
          onClick={() => onRemoveMedia(media.id)}
        />
      )}
    </Box>
  );
}
