import { ChevronDownIcon, ChevronUpIcon } from '@chakra-ui/icons';
import { Flex, Grid, Icon, IconButton, Image, Text } from '@chakra-ui/react';
import { MdFavorite } from 'react-icons/md';

import { useFavorite, useImage } from '../../hooks';

export interface IPostImageProps {
  media: string;
}

export function PostImage({ media }: IPostImageProps) {
  const imageSrc = useImage({ path: media });

  return <Image width="full" src={imageSrc} />;
}

export interface IPostImagesProps {
  id: string;
  medias: Array<string>;
  isExpandable: boolean;
  isExpand: boolean;
  setIsExpand(value: boolean): void;
}

export function PostImages({
  id,
  medias,
  isExpandable,
  isExpand,
  setIsExpand,
}: IPostImagesProps) {
  const { isFavorite, onToggleFavoritePost, countFavorites } = useFavorite(id);

  const [firstMedia, ...otherMedias] = medias;

  return (
    <>
      <PostImage media={firstMedia} />
      {isExpand &&
        otherMedias.map((media, index) => (
          <PostImage key={index} media={media} />
        ))}
      <Grid
        templateColumns="repeat(3, 1fr)"
        gap="2"
        position="sticky"
        left="0"
        right="0"
        bottom="0"
        backdropFilter="auto"
        backdropContrast="50%"
      >
        <Flex alignItems="center">
          <Icon
            as={MdFavorite}
            padding="1"
            boxSize="10"
            cursor="pointer"
            color={isFavorite ? 'red.400' : 'pink.50'}
            onClick={(event) => {
              event.stopPropagation();
              onToggleFavoritePost();
            }}
          />

          <Text paddingX="2" color="white" fontSize="sm" fontWeight="bold">
            {countFavorites}
          </Text>
        </Flex>

        <Flex justifyContent="center" alignItems="center">
          {isExpandable && (
            <IconButton
              color="white"
              variant="unstyled"
              as={isExpand ? ChevronUpIcon : ChevronDownIcon}
              aria-label=""
              onClick={() => setIsExpand(!isExpand)}
            />
          )}
        </Flex>
      </Grid>
    </>
  );
}
