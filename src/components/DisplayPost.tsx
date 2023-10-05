import {
  AspectRatio,
  Box,
  Flex,
  Heading,
  Icon,
  Image,
  Tag,
  Text,
} from '@chakra-ui/react';
import { MdFavorite } from 'react-icons/md';
import { useNavigate } from 'react-router-dom';

import { useBackgroundNavigate, useFavorite, useImage } from '../hooks';
import { IPost } from '../interfaces';
import { formatDateTime } from '../utils';
import { DisplayUser } from './DisplayUser';

export interface IDisplayPostProps {
  data: IPost;
}

export function DisplayPost({ data }: IDisplayPostProps) {
  const navigate = useNavigate();
  const { navigateModal } = useBackgroundNavigate();

  const mediaSrc = useImage({ path: data.medias[0] });

  const { isFavorite, onToggleFavoritePost, countFavorites } = useFavorite(
    data.id,
  );

  return (
    <Box>
      <Box
        position="relative"
        cursor="pointer"
        onClick={() => navigateModal(`/posts/${data.id}`)}
      >
        <AspectRatio ratio={1}>
          <Image borderRadius="lg" objectFit="cover" src={mediaSrc} />
        </AspectRatio>

        <Tag position="absolute" top="2" right="2">
          {data.medias.length} {data.medias.length === 1 ? 'Image' : 'Images'}
        </Tag>

        <Flex
          borderBottomRadius="lg"
          position="absolute"
          left="0"
          right="0"
          bottom="0"
          alignItems="center"
          justifyContent="space-between"
          backdropFilter="auto"
          backdropContrast="70%"
        >
          <Text paddingX="2" color="white" fontSize="sm" fontWeight="bold">
            {countFavorites}
          </Text>

          <Icon
            as={MdFavorite}
            padding="1"
            boxSize="10"
            color={isFavorite ? 'red.400' : 'pink.50'}
            onClick={(event) => {
              event.stopPropagation();
              onToggleFavoritePost();
            }}
          />
        </Flex>
      </Box>

      <Heading
        marginY="2"
        noOfLines={1}
        as="h4"
        fontSize="sm"
        fontWeight="light"
        textAlign="right"
        cursor="pointer"
        _hover={{ textDecoration: 'underline' }}
        onClick={() => navigate(`/posts/${data.id}`)}
      >
        {formatDateTime(data.publishedAt, {
          locales: 'en',
          dateStyle: 'medium',
          timeStyle: 'medium',
        })}
      </Heading>

      {data.owner && <DisplayUser data={data.owner} />}
    </Box>
  );
}
