import { ArrowBackIcon, CloseIcon } from '@chakra-ui/icons';
import {
  Box,
  Divider,
  Heading,
  IconButton,
  ModalBody,
  ModalContent,
  ModalHeader,
  Tag,
  Text,
} from '@chakra-ui/react';
import { useNavigate, useParams } from 'react-router-dom';

import { DisplayUser } from '../../components/DisplayUser';
import { ModalLoading } from '../../components/Loading';
import { useBackgroundNavigate, usePost } from '../../hooks';
import { formatDateTime } from '../../utils';
import { ModalFeedPosts } from './Feed';
import { PostImages } from './Media';

export function Modal() {
  const { isFullSizeModal, onCloseModal } = useBackgroundNavigate();

  const navigate = useNavigate();
  const params = useParams();
  const { post, isLoading, error, isExpandable, isExpand, setIsExpand } =
    usePost(params.id!);

  if (isLoading) {
    return <ModalLoading />;
  }

  if (error || !post) {
    navigate(-1);
    return <></>;
  }

  return (
    <ModalContent>
      <ModalHeader>
        Post{' '}
        <Tag size="lg">
          {post.medias.length} {post.medias.length === 1 ? 'Image' : 'Images'}
        </Tag>
      </ModalHeader>
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
        <Box marginBottom="3">
          <PostImages
            id={params.id!}
            medias={post.medias}
            isExpandable={isExpandable}
            isExpand={isExpand}
            setIsExpand={setIsExpand}
          />
        </Box>

        <Box marginY="3" paddingX="3">
          <Heading
            marginY="2"
            as="p"
            fontSize="md"
            fontWeight="hairline"
            textAlign="right"
            cursor="pointer"
            _hover={{ textDecoration: 'underline' }}
            onClick={() => navigate(`/posts/${post.id}`)}
          >
            {formatDateTime(post.publishedAt, {
              locales: 'en',
              dateStyle: 'long',
              timeStyle: 'long',
            })}
          </Heading>
        </Box>

        {post.owner && (
          <Box marginY="3" paddingX="3">
            <DisplayUser data={post.owner} />
          </Box>
        )}

        <Box marginY="3" paddingX="3">
          <Heading as="h2" size="md" fontWeight="medium">
            Description
          </Heading>
          <Divider marginY="3" />
          <Text>{post.description}</Text>
        </Box>

        {post.owner && (
          <Box paddingX="3" marginTop="3">
            <Heading as="h4" size="md" fontWeight="medium">
              Others
            </Heading>
            <Divider marginY="3" />
            <Box overflow="auto">
              <ModalFeedPosts userId={post.owner.id} />
            </Box>
          </Box>
        )}
      </ModalBody>
    </ModalContent>
  );
}
